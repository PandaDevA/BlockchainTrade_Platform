<template>
  <div class="pop-up-modal over-all" @click.self="close" :class="{ open: isOpen }">
    <div class="form-wrapper w-clearfix">
      <div @click="close" class="close-button w-100" data-ix="pop-up-register-close">
        <img src="/images/close_w.svg" alt class="menu-icon">
      </div>
      <div v-if="is2FA" class="form2-form-wrap w-form">
        <div class="form2-wrapper">
          <h2 class="form2-headline">Two Factor Authentication</h2>
          <label for="name-3">Code</label>
          <input
            v-model="code2FA"
            @keyup.enter="login2FA"
            type="text"
            class="form2-input red w-input"
            maxlength="256"
            placeholder="Enter code"
          >
          <div class="form2-buttons-wrapper">
            <button
              ref="login2FA"
              v-promise-btn
              @click.prevent="login2FA"
              class="btn w-button"
            >Login</button>
            <!-- <div class="signup-account-link">
              Lost your 2FA code?
              <a
                @click.prevent="openModal('reset-2fa')"
                class="link link-register"
              >Reset 2FA</a>
            </div>-->
          </div>
          <ui-alert
            @dismiss="error.showError = false"
            type="error"
            v-show="error.showError"
          >{{ error.message }}</ui-alert>
        </div>
      </div>
      <div v-else class="form2-form-wrap w-form">
        <div class="form2-wrapper">
          <h2 class="form2-headline">Login</h2>
          <label for="name-3">Username</label>
          <input
            v-model="userName"
            autofocus
            @keypress="restrictSpecialChars"
            @keyup.enter="login"
            type="text"
            class="form2-input red w-input"
            maxlength="256"
            placeholder="Enter your username"
          >
          <label for="password-3">Password</label>
          <input
            v-model="password"
            @keyup.enter="login"
            type="password"
            class="form2-input form2-input red w-input"
            maxlength="256"
            placeholder="Enter your password"
          >
          <label for="name-3">Captcha</label>
          <div>
            <div class="d-flex">
              <a-captcha-slider :key="isOpen" @onVerify="onVerifyCaptcha"/>
              <!-- <input
                v-model="captcha"
                @keyup.enter="login"
                type="text"
                class="form2-input form2-input red w-input w-100"
                maxlength="256"
                placeholder="Code"
              >
              <div @click="createCaptcha" id="captcha"></div>
              <fa @click="createCaptcha" id="refresh-icon" icon="sync-alt"/>-->
            </div>
          </div>
          <div class="form2-buttons-wrapper">
            <button v-promise-btn @click.prevent="login" class="btn w-button">Login</button>
            <div class="signup-account-link">
              <a
                @click.prevent="openModal('reset-password')"
                class="link link-register"
              >Reset Password</a>
              <!-- |
              <a
                @click.prevent="openModal('reset-2fa')"
                class="link link-register"
              >Reset 2FA</a>-->
            </div>
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
import ACaptchaSlider from "@/components/_shared/ACaptchaSlider";
import { mapActions, mapGetters } from "vuex";
import { get } from "lodash";

export default {
  components: {
    ACaptchaSlider
  },
  data() {
    return {
      isOpen: false,
      is2FA: false,
      tempToken: "",
      code2FA: "",
      userName: "",
      password: "",
      captchaCode: null,
      captcha: "",
      isCaptchaValid: false,
      error: {
        showError: false,
        message: ""
      }
    };
  },
  watch: {
    isAuthenticated: {
      handler(newValue, oldValue) {
        this.$nextTick(() => this.createCaptcha());
      },
      immediate: true
    },
    code2FA(newValue, oldValue) {
      if (newValue.length < 6) return;
      this.$refs.login2FA.click();
    }
  },
  computed: {
    ...mapGetters("authentication", ["isAuthenticated"])
    // isCaptchaValid() {
    //   if (this.captcha == this.captchaCode) return true;
    //   else {
    //     this.createCaptcha();
    //     return false;
    //   }
    // }
  },
  methods: {
    ...mapActions("authentication", ["loginUser", "loginUser2FA"]),
    login() {
      if (!this.userName || !this.password) {
        this.displayError("Fill all fields", this.error);
        return;
      }
      if (!this.isCaptchaValid) {
        this.displayError("Captcha is invalid", this.error);
        return;
      }

      this.error.showError = false;

      const data = {
        login: this.userName,
        password: this.password
      };

      return new Promise(async (res, rej) => {
        try {
          const resp = await this.loginUser(data);
          if (get(resp, "needAuthenticationCode")) {
            this.is2FA = true;
            this.tempToken = resp.tempToken;
          } else if (get(resp, "access_token")) this.$router.push("/trading");
          else if (get(resp, "error"))
            this.displayError(resp.error, this.error);
          else this.displayError("Server error", this.error);
        } catch (e) {
          console.log(e);
        } finally {
          this.password = "";
          res();
        }
      });
    },
    login2FA() {
      if (!this.code2FA) {
        this.displayError(
          "Provide key from Google Authenticator app",
          this.error
        );
        return;
      }

      return new Promise(async (res, rej) => {
        try {
          const auth = await this.loginUser2FA({
            code: this.code2FA,
            tempToken: this.tempToken
          });
          if (get(auth, "newToken")) {
            this.tempToken = auth.newToken;
            this.displayError("Invalid code", this.error);
          } else if (get(auth, "access_token")) this.$router.push("/trading");
        } catch (e) {
          console.log(e);
        } finally {
          res();
        }
      });
    },
    openModal(name) {
      this.close();
      this.$emit("openModal", name);
    },
    close() {
      this.isOpen = false;
      this.is2FA = false;
      this.error.showError = false;
      // this.captcha = "";
      this.isCaptchaValid = false;
      this.$nextTick(() => this.createCaptcha());
    },
    onVerifyCaptcha(isValid) {
      this.isCaptchaValid = isValid;
    },
    createCaptcha() {
      if (!!document.getElementById("captcha") === false) return;
      document.getElementById("captcha").innerHTML = "";
      const charsArray =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
      const lengthOtp = 6;
      const captcha = [];
      for (let i = 0; i < lengthOtp; i++) {
        //below code will not allow Repetition of Characters
        let index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
        if (captcha.indexOf(charsArray[index]) == -1)
          captcha.push(charsArray[index]);
        else i--;
      }
      const canv = document.createElement("canvas");
      canv.id = "captcha";
      canv.width = 108;
      canv.height = 40;
      const ctx = canv.getContext("2d");
      // ctx.strokeRect(0, 0, 100, 40);
      ctx.font = "25px Georgia";
      ctx.textAlign = "center";
      ctx.translate(canv.width / 2, 0);
      ctx.strokeText(captcha.join(""), 0, 30);
      //storing captcha so that can validate you can save it somewhere else according to your specific requirements
      this.captchaCode = captcha.join("");
      document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
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