<template>
  <div class="pop-up-modal over-all" @click.self="isOpen = false" :class="{ open: isOpen }">
    <div class="form-wrapper w-clearfix">
      <div @click="closeModal" class="close-button w-100" data-ix="pop-up-register-close">
        <img src="/images/close_w.svg" alt class="menu-icon">
      </div>
      <div class="form2-form-wrap w-form">
        <form name="email-form" data-name="Email Form" class="form2-wrapper">
          <h2 class="form2-headline">Reset Password</h2>
          <label for="name-3">Username</label>
          <input
            v-model="userName"
            autofocus
            @keyup.enter="login"
            type="text"
            class="form2-input red w-input"
            maxlength="256"
            placeholder="Enter your username"
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
          <div class="form2-buttons-wrapper">
            <button v-promise-btn @click.prevent="reset" class="btn w-button">Reset</button>
          </div>
          <ui-alert
            @dismiss="error.showError = false"
            type="error"
            v-show="error.showError"
          >{{ error.message }}</ui-alert>
        </form>
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
      email: "",
      userName: "",
      error: {
        showError: false,
        message: ""
      }
    };
  },
  methods: {
    ...mapActions("authentication", ["resetPassword"]),
    closeModal() {
      this.isOpen = false;
    },
    reset() {
      if (!this.userName) {
        this.displayError("Check username", this.error);
        return;
      }
      if (!this.validateEmail(this.email)) {
        this.displayError("Check email", this.error);
        return;
      }

      this.error.showError = false;

      return new Promise(async (res, rej) => {
        try {
          const data = {
            login: this.userName,
            email: this.email
          };
          const response = await this.resetPassword(data);
          if (response) {
            this.isOpen = false;
            this.$notify({
              type: "success",
              title: `Please check your email account.`,
              duration: this.notificationDuration
            });
          } else {
            this.displayError(response || "Something went wrong", this.error);
          }
        } catch (e) {
          console.log(e);
        } finally {
          res();
        }
      });
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
</style>