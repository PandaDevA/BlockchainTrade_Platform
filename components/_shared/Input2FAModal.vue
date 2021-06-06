<template>
  <div v-if="isOpen" @click.self="close" class="pop-up-modal over-all open">
    <div class="form-wrapper w-clearfix">
      <div @click="close" class="close-button w-100" data-ix="pop-up-register-close">
        <img src="/images/close_w.svg" alt class="menu-icon">
      </div>
      <div class="form2-form-wrap w-form">
        <div class="form2-wrapper">
          <h2 class="form2-headline">Two Factor Authentication</h2>
          <label for="name-3" class="text-left">Code</label>
          <input
            v-model="code2FA"
            @keyup.enter="sendCode"
            type="text"
            class="form2-input red w-input"
            maxlength="256"
            placeholder="Enter code"
          >
          <div class="form2-buttons-wrapper">
            <button ref="sendCode" v-promise-btn @click="sendCode" class="btn w-button">Send</button>
          </div>
          <ui-alert
            @dismiss="error.showError = false"
            type="error"
            v-show="error.showError"
          >{{ error.message }}</ui-alert>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { get } from "lodash";

export default {
  data() {
    return {
      isOpen: false,
      code2FA: "",
      error: {
        showError: false,
        message: ""
      }
    };
  },
  watch: {
    code2FA(newValue, oldValue) {
      if (newValue.length < 6) return;
      this.$refs.sendCode.click();
    }
  },
  methods: {
    ...mapActions("authentication", ["send2FA"]),
    sendCode() {
      if (!this.code2FA) {
        return this.displayError(
          "Provide key from Google Authenticator app",
          this.error
        );
      }

      return new Promise(async (res, rej) => {
        return this.send2FA(this.code2FA).then(response => {
          res();
          if (get(response, "error"))
            return this.displayError(response.error, this.error);
          this.$emit("onSuccess");
          this.close();
        });
      });
    },
    close() {
      this.isOpen = false;
      this.code2FA = "";
      this.error = {
        showError: false,
        message: ""
      };
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
.ui-alert {
  background: floralwhite;
}
.link-register {
  cursor: pointer;
  text-decoration: underline;
}
#captcha {
  background-color: #fff;
  display: flex;
  justify-content: center;
  padding: 0 6px;
  /* padding-left: 12px; */
  height: 40px;
}
#refresh-icon {
  font-size: 20px;
  color: green;
  background: white;
  height: 40px;
  padding: 8px;
  width: 36px;
  /* margin-left: -px; */
  cursor: pointer;
}
</style>