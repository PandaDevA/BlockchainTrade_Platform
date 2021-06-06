<template>
  <div class="dashboard-wrapper-light full">
    <div class="center vertical">
      <h1>Account Verification</h1>
      <div class="settings-form-wrapper w-form">
        <div class="settings-wrapper-main">
          <div class="module-wrapper-kyc formsettings overflow-initial">
            <transition name="flipX" mode="out-in">
              <div v-if="showTerms" key="1" class="pt-4 px-2">
                <div class="module-content overflow-initial">
                  <p style="text-align: justify;">
                    <span
                      class="s1"
                    >Please read these instructions carefully to be prepared for the following KYC/AML process.</span>
                  </p>
                  <p style="text-align: justify;">
                    <span class="s1">
                      For the success of the KYC process it is very important to upload high quality images. It is the
                      best to use a high-resolution camera to take the pictures of your documents or to scan
                      them.
                    </span>
                  </p>
                  <ol>
                    <li class="p2" style="text-align: justify;">
                      <span class="s1">Fill in all required fields on the following site.</span>
                    </li>
                    <li class="p2" style="text-align: justify;">
                      <span
                        class="s1"
                      >Upload the full cover of the passport or ID card (nothing covered).</span>
                    </li>
                    <li class="p2" style="text-align: justify;">
                      <span class="s1">
                        <strong>When you uploaded ID card at step 2:</strong> Upload the full back of the ID card (nothing
                        covered).
                      </span>
                    </li>
                    <li class="p2" style="text-align: justify;">
                      <span class="s1">Write on a piece of paper:</span>
                    </li>
                    <ul class="ul1" style="text-align: justify;">
                      <li class="li1">
                        <span class="s1">“folex”</span>
                      </li>
                      <li class="li1">
                        <span class="s1">current date</span>
                      </li>
                    </ul>
                    <p style="text-align: left;">
                      Take a selfie with the piece of paper and upload it.
                      <br>
                      <strong>Note:</strong> Do
                      <strong>not</strong> wear glasses, headphones or any other accessory when taking the
                      selfie.
                    </p>
                    <li class="p2" style="text-align: justify;">
                      <span class="s1">
                        Upload a document like statement of account, electricity bill or any other bill that is
                        evidence of your current residence. Please take a close look at the criteria that the
                        document must fulfill:
                      </span>
                    </li>
                    <ul class="ul1" style="text-align: justify;">
                      <li class="li1">
                        <span class="s1">complete address</span>
                      </li>
                      <li class="li1">
                        <span class="s1">same full name in all provided documents</span>
                      </li>
                      <li class="li1">
                        <span class="s1">max. 3 months old</span>
                      </li>
                    </ul>
                    <li class="p2" style="text-align: justify;">
                      <span class="s1">Click on save.</span>
                    </li>
                  </ol>
                  <p style="text-align: left;">
                    If you do not pass the KYC process, please contact
                    <a
                      href="mailto:support@folex.io"
                    >support@folex.io</a>
                  </p>
                </div>
                <button @click="hideTerms" class="btn green w-button">Accept</button>
              </div>
              <div v-else key="2">
                <div class="module-header">
                  <div class="module-title">Personal Details</div>
                </div>
                <div class="module-content overflow-initial text-left">
                  <label for="first-name">First Name</label>
                  <input
                    v-model="$v.firstName.$model"
                    :class="{ 'invalid-input': $v.firstName.custom}"
                    type="text"
                    class="field settings w-input"
                    placeholder="First Name"
                  >
                  <label for="middle-name">Middle Name</label>
                  <input
                    v-model="middleName"
                    type="text"
                    class="field settings w-input"
                    placeholder="Middle Name"
                  >
                  <label for="last-name">Last Name</label>
                  <input
                    v-model="$v.lastName.$model"
                    :class="{ 'invalid-input': $v.lastName.custom}"
                    type="text"
                    class="field settings w-input"
                    placeholder="Last Name"
                  >
                  <label for="address1">Address 1</label>
                  <input
                    v-model="$v.address1.$model"
                    :class="{ 'invalid-input': $v.address1.custom}"
                    type="text"
                    class="field settings w-input"
                    placeholder="Address 1"
                  >
                  <label for="address2">Address 2</label>
                  <input
                    v-model="address2"
                    type="text"
                    class="field settings w-input"
                    placeholder="Address 2"
                  >
                  <label for="zip-code">Zip code</label>
                  <input
                    v-model="$v.zipCode.$model"
                    :class="{ 'invalid-input': $v.zipCode.custom}"
                    type="text"
                    class="field settings w-input"
                    placeholder="Zip code"
                  >
                  <label for="city">City</label>
                  <input
                    v-model="$v.city.$model"
                    :class="{ 'invalid-input': $v.city.custom}"
                    type="text"
                    class="field settings w-input"
                    placeholder="City"
                  >
                  <label for="region">Region</label>
                  <input
                    v-model="$v.region.$model"
                    :class="{ 'invalid-input': $v.region.custom}"
                    type="text"
                    class="field settings w-input"
                    placeholder="Region"
                  >
                  <label for="country">Country</label>
                  <input
                    v-model="$v.country.$model"
                    :class="{ 'invalid-input': $v.country.custom}"
                    type="text"
                    class="field settings w-input"
                    placeholder="Country"
                  >

                  <label for="date-of-birth">Date of birth</label>
                  <datepicker
                    v-model="dateOfBirth"
                    format="yyyy-MM-dd"
                    type="text"
                    class="field settings w-input"
                    placeholder="Date of birth"
                  ></datepicker>
                  <label for="passport-id">Passport id</label>
                  <input
                    v-model="$v.passportId.$model"
                    :class="{ 'invalid-input': $v.passportId.custom}"
                    type="text"
                    class="field settings w-input"
                    placeholder="Passport id"
                  >
                  <label for="date-of-issue">Date of issue</label>
                  <datepicker
                    v-model="dateOfIssue"
                    format="yyyy-MM-dd"
                    type="text"
                    class="field settings w-input"
                    placeholder="Date of issue"
                  ></datepicker>
                  <label for="expiring-date">Expiring Date</label>
                  <datepicker
                    v-model="expiringDate"
                    format="yyyy-MM-dd"
                    class="field settings w-input"
                    type="text"
                    placeholder="Expiring Date"
                  ></datepicker>
                </div>
                <div class="module-content">
                  <div class="upload-wrapper">
                    <div class="upload-item">
                      <a-spinner :css="spinnerStyles" v-if="loadingImages.first"/>
                      <img
                        v-show="!loadingImages.first"
                        ref="firstImage"
                        :src="images.first"
                        alt
                        class="upload-icon"
                      >
                      <input
                        @change="selectedImage($event, 'first')"
                        ref="first"
                        type="file"
                        size="24"
                        hidden
                      >
                      <a-button
                        @click="uploadImages('first')"
                        color="orange"
                        class="btn small w-button"
                      >Passport / ID Front</a-button>
                    </div>
                    <div class="upload-item">
                      <a-spinner :css="spinnerStyles" v-if="loadingImages.second"/>
                      <img
                        v-show="!loadingImages.second"
                        ref="secondImage"
                        :src="images.second"
                        alt
                        class="upload-icon"
                      >
                      <input
                        @change="selectedImage($event, 'second')"
                        ref="second"
                        type="file"
                        size="24"
                        hidden
                      >
                      <a-button
                        @click="uploadImages('second')"
                        color="orange"
                        class="btn small w-button"
                      >ID Back</a-button>
                    </div>
                    <div class="upload-item">
                      <a-spinner :css="spinnerStyles" v-if="loadingImages.third"/>
                      <img
                        v-show="!loadingImages.third"
                        ref="thirdImage"
                        :src="images.third"
                        alt
                        class="upload-icon"
                      >
                      <input
                        @change="selectedImage($event, 'third')"
                        ref="third"
                        type="file"
                        size="24"
                        hidden
                      >
                      <a-button
                        @click="uploadImages('third')"
                        color="orange"
                        class="btn small w-button"
                      >Selfie with Document</a-button>
                    </div>
                    <div class="upload-item">
                      <a-spinner :css="spinnerStyles" v-if="loadingImages.fourth"/>
                      <img
                        v-show="!loadingImages.fourth"
                        ref="fourthImage"
                        :src="images.fourth"
                        alt
                        class="upload-icon"
                      >
                      <input
                        @change="selectedImage($event, 'fourth')"
                        ref="fourth"
                        type="file"
                        size="24"
                        hidden
                      >
                      <a-button
                        @click="uploadImages('fourth')"
                        color="orange"
                        class="btn small w-button"
                      >Document with Address</a-button>
                    </div>
                  </div>
                  <div class="button-wrapper-settings">
                    <button
                      v-promise-btn
                      @click.prevent="saveSettings"
                      class="btn green w-button"
                    >Save</button>
                  </div>
                </div>
                <ui-alert
                  @dismiss="error.showError = false"
                  type="error"
                  v-show="error.showError"
                >{{ error.message }}</ui-alert>
              </div>
            </transition>
          </div>
          <div class="right-settings">
            <div class="module-wrapper settings right">
              <div class="module-header r-settings">
                <img src="@/static/images/003-statistics.svg" alt class="icon-r-settings">
                <div class="d-flex f-nowrap d-flex-full-center my-4">
                  <div class="module-title w-100">KYC Process Status:</div>
                  <div class="status">
                    <h3 class="m-none">
                      <strong>{{ kycStatus }}</strong>
                    </h3>
                  </div>
                </div>
              </div>
              <div
                v-if="declineReasons && declineReasons.length"
                class="decline px-2 pt-2 text-left"
              >
                <p class="mb-1">Please, fix:</p>
                <ul class="text-red">
                  <li v-for="reason in declineReasons" :key="reason">{{ reason }}</li>
                </ul>
              </div>
            </div>
            <div class="module-wrapper settings right">
              <div class="module-header r-settings">
                <div class="d-flex f-nowrap d-flex-full-center my-4">
                  <p class="p-none m-none text-left">
                    FoLex offers security for every customer in compliance with the international AML/KYC rules.
                    Please perform the necessary verification steps to unlock the Withdrawal feature.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { get, isEmpty } from "lodash";
import Datepicker from "vuejs-datepicker";
import moment from "moment";

export default {
  middleware: "authentication",
  layout: "profile",
  components: { Datepicker },
  data() {
    return {
      showTerms: true,
      kycStatus: "Loading...",
      firstName: "",
      middleName: "",
      lastName: "",
      address1: "",
      address2: "",
      zipCode: "",
      city: "",
      region: "",
      country: "",
      passportId: "",
      dateOfIssue: "",
      dateOfBirth: "",
      expiringDate: "",
      declineReasons: [],
      loadingImages: {
        first: false,
        second: false,
        third: false,
        fourth: false
      },
      images: {
        first: "/images/pass_front.svg",
        second: "/images/pass_back.svg",
        third: "/images/selfie.svg",
        fourth: "/images/kyc-address.svg"
      },
      error: {
        showError: false,
        message: ""
      }
    };
  },
  mounted() {
    this.loadData();
  },
  computed: {
    isAllRequiredFilled() {
      return (
        isEmpty(this.firstName) === false &&
        // isEmpty(this.middleName) === false &&
        isEmpty(this.lastName) === false &&
        isEmpty(this.address1) === false &&
        // isEmpty(this.address2) === false &&
        isEmpty(this.zipCode) === false &&
        isEmpty(this.city) === false &&
        isEmpty(this.region) === false &&
        isEmpty(this.country) === false &&
        isEmpty(this.passportId) === false
      );
    },
    spinnerStyles() {
      return { width: "75px", height: "90px" };
    }
  },
  methods: {
    ...mapActions("profile", ["loadKycProcess"]),
    async loadData() {
      try {
        const kycData = await this.loadKycProcess();
        this.firstName = get(kycData, "firstName") || "";
        this.middleName = get(kycData, "middleName") || "";
        this.lastName = get(kycData, "lastName") || "";
        this.address1 = get(kycData, "address1") || "";
        this.address2 = get(kycData, "address2") || "";
        this.zipCode = get(kycData, "zipCode") || "";
        this.city = get(kycData, "city") || "";
        this.region = get(kycData, "region") || "";
        this.country = get(kycData, "country") || "";
        this.passportId = get(kycData, "passportId") || "";
        this.dateOfIssue = this.checkDate(get(kycData, "dateOfIssue"));
        this.dateOfBirth = this.checkDate(get(kycData, "dateOfBirth"));
        this.expiringDate = this.checkDate(get(kycData, "expiringDate"));
        this.kycStatus = get(kycData, "status");
        this.declineReasons = get(kycData, "declineReasons");
      } catch (e) {
        console.log("Loading local kyc data error", e);
      }
    },
    checkDate(date) {
      return moment().diff(date, "years") > 60 || !date
        ? moment().format("YYYY-MM-DD")
        : date;
    },
    saveSettings() {
      if (!this.isAllRequiredFilled) {
        this.displayError("Fill all required fields", this.error);
        return;
      }

      this.error.showError = false;

      return this.saveRequest();
    },
    uploadImages(type) {
      this.$refs[type].click();
    },
    selectedImage(event, type) {
      const filesAmount = event.target.files.length;

      if (!filesAmount) return;

      this.saveImageRequest(event.target.files[filesAmount - 1], type);
    },
    readImageURL(file, type) {
      const reader = new FileReader();

      reader.onload = e => {
        this.$refs[type + "Image"].src = e.target.result;
      };

      reader.readAsDataURL(file);
    },
    saveRequest() {
      const data = {
        firstName: this.firstName,
        middleName: this.middleName,
        lastName: this.lastName,
        address1: this.address1,
        address2: this.address2,
        zipCode: this.zipCode,
        city: this.city,
        region: this.region,
        country: this.country,
        passportId: this.passportId,
        dateOfIssue: moment(this.dateOfIssue).format("YYYY-MM-DD HH:mm:ss"),
        dateOfBirth: moment(this.dateOfBirth).format("YYYY-MM-DD HH:mm:ss"),
        expiringDate: moment(this.expiringDate).format("YYYY-MM-DD HH:mm:ss")
      };
      return this.$axios
        .$put("/profile/kycProfile", data)
        .then(() => {
          this.notifySuccess();
        })
        .catch(e => {
          this.notifyError(get(e.response, "data.title") || "Server error");
        });
    },
    saveImageRequest(file, type) {
      const typeNumber = this.getTypeNumber(type);
      const fd = new FormData();
      fd.append("uploadedFile", file, file.name);
      this.loadingImages[type] = true;
      this.$axios
        .$put(`/profile/kycImage?imageType=${typeNumber}`, fd)
        .then(res => this.readImageURL(file, type))
        .catch(console.log)
        .finally(() => (this.loadingImages[type] = false));
    },
    getTypeNumber(type) {
      if (type === "first") return 1;
      else if (type === "second") return 2;
      else if (type === "third") return 3;
      else if (type === "fourth") return 4;
    },
    loadImages() {
      const types = ["first", "second", "third", "fourth"];
      const path = `${this.$axios.defaults.baseURL}/profile/kycImage`;
      types.forEach(type => {
        const typeNumber = this.getTypeNumber(type);
        this.loadingImages[type] = true;
        this.loadSingleImage(type, typeNumber, res => {
          this.images[type] = this.imageFromBlob(res);
        });
      });
    },
    loadSingleImage(type, typeNumber, onHasImage) {
      this.$axios
        .$get(`/profile/kycImage?imageType=${typeNumber}`, {
          responseType: "arraybuffer"
        })
        .then(onHasImage)
        .catch(console.log)
        .finally(() => (this.loadingImages[type] = false));
    },
    hideTerms() {
      this.showTerms = false;
      this.loadImages();
    }
  },
  validations: {
    firstName: {
      custom: value => !value
    },
    middleName: {
      custom: value => !value
    },
    lastName: {
      custom: value => !value
    },
    address1: {
      custom: value => !value
    },
    address2: {
      custom: value => !value
    },
    zipCode: {
      custom: value => !value
    },
    city: {
      custom: value => !value
    },
    region: {
      custom: value => !value
    },
    country: {
      custom: value => !value
    },
    passportId: {
      custom: value => !value
    }
  }
};
</script>
<style scoped>
.formsettings {
  width: 500px !important;
}
.done {
  display: block;
}
.overflow-initial {
  overflow: initial;
}
.image-spinner {
  margin-bottom: 8px;
}
.upload-wrapper {
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  height: 300px;
}
.upload-wrapper > div {
  width: 50%;
}
</style>