<template>
  <div class="pop-up-modal over-all" @click.self="closeModal" :class="{ open: isOpen }">
    <div :class="{ success: successRegistration }" class="form-wrapper w-clearfix">
      <div @click="closeModal" class="close-button w-100" data-ix="pop-up-register-close">
        <img src="/images/close_w.svg" alt class="menu-icon">
      </div>
      <div v-if="!isRegistered" class="form2-form-wrap w-form">
        <form name="email-form" data-name="Email Form" class="form2-wrapper">
          <h2 class="form2-headline">Register</h2>
          <label for="name">Username</label>
          <input
            v-model="userName"
            autofocus
            @keypress="restrictSpecialChars"
            type="text"
            class="form2-input red w-input"
            maxlength="256"
            placeholder="Enter your desired username"
          >
          <label for="email-3">Email</label>
          <input
            v-model="email"
            type="text"
            class="form2-input red w-input"
            maxlength="256"
            placeholder="Enter your email"
            required
          >
          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            class="form2-input form2-input red w-input"
            maxlength="256"
            placeholder="Enter your password"
            required
          >
          <div class="form2-buttons-wrapper">
            <button v-promise-btn @click.prevent="register" class="btn w-button">Register</button>
            <div class="checkbox-field w-checkbox">
              <input v-model="isAgreedOnTerms" type="checkbox" class="w-checkbox-input">
              <label for="checkbox" class="w-form-label">
                I Agree to FoLEx&#x27;s
                <a @click="openTerms" class="link">Terms of Use</a>
              </label>
            </div>
          </div>
          <ui-alert
            @dismiss="error.showError = false"
            type="error"
            v-show="error.showError"
          >{{ error.message }}</ui-alert>
        </form>
      </div>
      <div v-else>
        <div v-if="successRegistration" class="form2-success-message-text text-center">
          <p>Congratulation you have been registered.</p>
          <p>Please check your email account and verify provided link. We sent confirmation email to you.</p>
        </div>
        <div v-else class="form2-error-message-text">Oops! Something went terribly wrong.</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isOpen: false,
      userName: "",
      email: "",
      password: "",
      error: {
        showError: false,
        message: ""
      },
      isAgreedOnTerms: false,
      isRegistered: false,
      successRegistration: false,
      errorRegistration: false
    };
  },
  methods: {
    ...mapActions("authentication", ["createUser"]),
    closeModal() {
      this.isOpen = false;
      this.isRegistered = false;
    },
    register() {
      if (!this.validateEmail(this.email)) {
        this.displayError("Check your email", this.error);
        return;
      }
      if (!this.userName || !this.password) {
        this.displayError("Fill all fields", this.error);
        return;
      }

      if (this.isAgreedOnTerms === false) {
        this.displayError("Accept terms first", this.error);
        return;
      }

      this.error.showError = false;

      const data = {
        login: this.userName,
        email: this.email,
        password: this.password
      };

      return new Promise(async (res, rej) => {
        try {
          const response = await this.createUser(data);
          if (response === "Account created") {
            this.successRegistration = true;
            this.isRegistered = true;
          } else {
            this.successRegistration = false;
            this.isRegistered = false;
            this.displayError(response || "Something went wrong", this.error);
          }
        } catch (e) {
          console.log(e);
        } finally {
          this.password = "";
          res();
        }
      });
    },
    openTerms() {
      let routeData = this.$router.resolve({ name: "terms" });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>

<style scoped>
.open {
  display: flex;
  opacity: 1;
}
.show-result {
  display: block;
}
.success {
  padding: 30px;
  width: max-content;
}
.ui-alert {
  background: floralwhite;
}
.link:hover {
  text-decoration: underline;
}
</style>