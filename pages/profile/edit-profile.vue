<template>
  <div class="dashboard-wrapper-light full">
    <div class="center vertical">
      <h1>Edit Profile</h1>
      <div class="settings-form-wrapper w-form">
        <form
          id="email-form-3"
          name="email-form-3"
          data-name="Email Form 3"
          class="settings-wrapper-main"
        >
          <div class="module-wrapper formsettings">
            <div class="module-content text-left">
              <div class="upload-item">
                <a-spinner :css="spinnerStyles" v-if="isImageLoading"/>
                <img
                  v-show="!isImageLoading"
                  ref="profileImage"
                  src="@/static/images/profileimg.jpg"
                  alt
                  class="upload-icon"
                >
                <input @change="selectedImage" ref="profileInput" type="file" size="24" hidden>
                <a-button
                  @click="uploadImage"
                  color="orange"
                  class="btn small w-button"
                >Choose profile picture</a-button>
              </div>
              <label for="first-name">Full Name</label>
              <input
                v-model="firstName"
                type="text"
                class="field settings w-input"
                placeholder="Full Name"
              >
              <label for="username">Username</label>
              <input
                v-model="$v.login.$model"
                :class="{ 'invalid-input': $v.login.custom}"
                type="text"
                class="field settings w-input"
                placeholder="Username"
              >
              <label for="password">Change Password</label>
              <input
                v-model="$v.password.$model"
                :class="{ 'invalid-input': $v.password.custom}"
                type="password"
                autocomplete="password"
                class="field settings w-input"
                placeholder="Change Password"
              >
              <label for="change-password">Confirm Password</label>
              <input
                v-model="confirmPassword"
                :class="{ 'invalid-input': $v.password.custom}"
                type="password"
                autocomplete="password"
                class="field settings w-input"
                placeholder="Confirm Password"
              >
              <label for="email">Email</label>
              <input
                v-model="$v.email.$model"
                :class="{ 'invalid-input': $v.email.custom}"
                type="text"
                class="field settings w-input"
                placeholder="Email"
              >
              <label for="confirm-email">Confirm Email</label>
              <input
                v-model="confirmEmail"
                :class="{ 'invalid-input': $v.email.custom}"
                type="text"
                class="field settings w-input"
                placeholder="Confirm Email"
              >

              <div class="button-wrapper-settings">
                <button v-promise-btn @click.prevent="saveSettings" class="btn green w-button">Save</button>
              </div>
            </div>
            <ui-alert
              @dismiss="error.showError = false"
              type="error"
              v-show="error.showError"
            >{{ error.message }}</ui-alert>
          </div>
          <div class="right-settings">
            <div class="module-wrapper settings right">
              <div class="module-header r-settings">
                <img src="@/static/images/006-envelope.svg" alt class="icon-r-settings">
                <div class="module-title">Email Notification Settings</div>
              </div>
              <div class="module-text settings-switch">
                <p class="paragraph-small right">Notify On Login Account</p>
                <ul class="tg-list">
                  <li class="tg-list-item">
                    <input
                      v-model="notifyOnLoginAccount"
                      @change="changeAppProfile('notifyOnLoginAccount')"
                      class="tgl tgl-prfl"
                      id="notifyOnLoginAccount"
                      type="checkbox"
                    >
                    <label class="tgl-btn" for="notifyOnLoginAccount"></label>
                  </li>
                </ul>
              </div>
              <div class="module-text settings-switch">
                <p class="paragraph-small right">Notify On Deposit</p>
                <ul class="tg-list">
                  <li class="tg-list-item">
                    <input
                      v-model="notifyOnDeposit"
                      @change="changeAppProfile('notifyOnDeposit')"
                      class="tgl tgl-prfl"
                      id="notifyOnDeposit"
                      type="checkbox"
                    >
                    <label class="tgl-btn" for="notifyOnDeposit"></label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
import { get } from "lodash";

export default {
  middleware: "authentication",
  layout: "profile",
  head() {
    return {
      title: "Edit Profile | Folex"
    };
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      login: "",
      password: "",
      confirmPassword: "",
      email: "",
      confirmEmail: "",
      timeZone: 0,
      local: 0,
      kycProcess: 0,
      maximumFollowerBTC: 0,
      mode: 0,
      notifyOnLoginAccount: false,
      notifyOnDeposit: false,
      notifyOnTrade: false,
      notifyOnTradeError: false,
      notifyOnCancelledOrder: false,
      notifyOnSubscriptionExpiration: false,
      getNewsletter: false,
      colorSelection: 0,
      profileImage: "",
      isImageLoading: false,
      error: {
        showError: false,
        message: ""
      }
    };
  },
  mounted() {
    this.loadData();
    this.loadUserAvatar();
  },
  computed: {
    isAllRequiredFilled() {
      return (
        this.$v.login.custom === false &&
        this.$v.password.custom === false &&
        this.$v.email.custom === false
      );
    },
    spinnerStyles() {
      return { width: "75px", height: "90px" };
    }
  },
  methods: {
    ...mapActions("profile", ["loadProfileData", "loadAvatar"]),
    ...mapMutations("profile", ["saveAvatar", "saveUserName"]),
    async loadData() {
      try {
        const profileData = await this.loadProfileData();
        this.firstName = get(profileData, "firstName") || "";
        this.lastName = get(profileData, "lastName") || "";
        this.login = get(profileData, "login") || "";
        // this.password = get(profileData, "password") || "";
        this.email = get(profileData, "email") || "";
        this.confirmEmail = get(profileData, "email") || "";
        this.notifyOnLoginAccount =
          get(profileData, "appProfile.notifyOnLoginAccount") || false;
        this.notifyOnDeposit =
          get(profileData, "appProfile.notifyOnDeposit") || false;
      } catch (e) {
        console.log("Loading local profile data error", e);
      }
    },
    changeAppProfile(type) {
      let data = {
        [type]: this[type]
      };
      let headers = {
        "Content-Type": "application/json-patch+json",
        accept: "application/json"
      };
      this.$axios
        .$put("/profile/appUserProfile", JSON.stringify(data), { headers })
        .then(() => this.notifySuccess())
        .catch(console.log);
    },
    saveSettings() {
      if (!this.isAllRequiredFilled) {
        this.displayError("Fill all required fields", this.error);
        return;
      }

      this.error.showError = false;

      return this.saveRequest();
    },
    saveRequest() {
      const data = {
        login: this.login,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        email: this.email
      };
      return this.$axios
        .$put("/profile/userProfile", data)
        .then(res => {
          this.saveUserName(this.login);
          this.notifySuccess();
        })
        .catch(({ error }) => {
          if (error) return this.notifyError(error);

          this.notifyError(
            `Something went wrong. <br /> Check your data and try again.`
          );
        });
    },
    uploadImage() {
      this.$refs.profileInput.click();
    },
    selectedImage(event) {
      const filesAmount = event.target.files.length;

      if (!filesAmount) return;

      const file = event.target.files[filesAmount - 1];
      const fd = new FormData();
      fd.append("uploadedFile", file, file.name);
      this.isImageLoading = true;
      this.$axios
        .$put(`/profile/kycImage?imageType=5`, fd)
        .then(res => {
          this.readImageURL(file);
          this.notifySuccess(`Picture loaded successfully`);
        })
        .catch(console.log)
        .finally(() => (this.isImageLoading = false));
    },
    readImageURL(file) {
      const reader = new FileReader();

      reader.onload = e => {
        this.saveAvatar(e.target.result);
        this.$refs.profileImage.src = e.target.result;
      };

      reader.readAsDataURL(file);
    },
    async loadUserAvatar() {
      try {
        this.isImageLoading = false;
        const avatar = await this.loadAvatar();
        if (!avatar) return;
        this.$refs.profileImage.src = avatar;
      } catch (e) {
        console.log(e);
      } finally {
        this.isImageLoading = false;
      }
    }
  },
  validations: {
    login: {
      custom: value => !value
    },
    password: {
      custom(value) {
        return !value || value !== this.confirmPassword;
      }
    },
    email: {
      custom(value) {
        return !value || value !== this.confirmEmail;
      }
    }
  }
};
</script>

<style scoped>
.done {
  display: block;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.tg-list {
  text-align: center;
  display: flex;
  align-items: center;
}

.tg-list-item {
  margin: 0 2em;
}
.tgl {
  display: none;
}
.tgl,
.tgl:after,
.tgl:before,
.tgl *,
.tgl *:after,
.tgl *:before,
.tgl + .tgl-btn {
  box-sizing: border-box;
}
.tgl::-moz-selection,
.tgl:after::-moz-selection,
.tgl:before::-moz-selection,
.tgl *::-moz-selection,
.tgl *:after::-moz-selection,
.tgl *:before::-moz-selection,
.tgl + .tgl-btn::-moz-selection {
  background: none;
}
.tgl::selection,
.tgl:after::selection,
.tgl:before::selection,
.tgl *::selection,
.tgl *:after::selection,
.tgl *:before::selection,
.tgl + .tgl-btn::selection {
  background: none;
}
.tgl + .tgl-btn {
  outline: 0;
  display: block;
  width: 57px;
  height: 30px;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.tgl + .tgl-btn:after,
.tgl + .tgl-btn:before {
  position: relative;
  display: block;
  content: "";
  width: 50%;
  height: 100%;
}
.tgl + .tgl-btn:after {
  left: 0;
}
.tgl + .tgl-btn:before {
  display: none;
}
.tgl:checked + .tgl-btn:after {
  left: 50%;
}

.tgl-prfl + .tgl-btn {
  background: #e8eae9;
  border-radius: 2em;
  padding: 2px;
  transition: all 0.4s ease;
  border: 1px solid #e8eae9;
}
.tgl-prfl + .tgl-btn:after {
  border-radius: 2em;
  background: #fbfbfb;
  transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    padding 0.3s ease, margin 0.3s ease;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 0 rgba(0, 0, 0, 0.08);
}
.tgl-prfl + .tgl-btn:hover:after {
  will-change: padding;
}
.tgl-prfl + .tgl-btn:active {
  box-shadow: inset 0 0 0 2em #e8eae9;
}
.tgl-prfl + .tgl-btn:active:after {
  padding-right: 0.8em;
}
.tgl-prfl:checked + .tgl-btn {
  background: #86d993;
}
.tgl-prfl:checked + .tgl-btn:active {
  box-shadow: none;
}
.tgl-prfl:checked + .tgl-btn:active:after {
  margin-left: -0.8em;
}
</style>