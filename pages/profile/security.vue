<template>
  <div class="dashboard-wrapper-light full">
    <div class="center vertical">
      <h1>Security</h1>
      <div class="settings-form-wrapper w-form">
        <form @submit.prevent class="settings-wrapper-main">
          <div class="module-wrapper custom-width overflow-initial">
            <h4 class="w-100 text-center text-black my-3">Two Factor Authentification</h4>
            <div class="module-content round-border">
              <p class="paragraph-small p-none m-none">
                The use of two-factor authentication is strongly recommended.
                It greatly increases the security of the user account.
                Please note that verification process 2-FA must be enabled, otherwise Withdrawal cannot be shared.
                This measure is only for the security of our customers.
              </p>
            </div>
            <div class="module-content qr-code-wrapper d-flex">
              <div class="step">
                <div class="icon-rounded">1</div>
                <div class="qr-code-content">
                  <p class="info">
                    Install
                    <strong>Google Authenticator</strong>
                    to your device
                  </p>
                  <div>
                    <a
                      href="https://itunes.apple.com/ua/app/google-authenticator/id388497605?mt=8"
                      target="_blank"
                    >
                      <img class="social" src="/images/app-store-button.png" alt>
                    </a>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en"
                      target="_blank"
                    >
                      <img class="social my-2" src="/images/google-play-button.png" alt>
                    </a>
                  </div>
                  <a
                    href="https://support.google.com/accounts/answer/1066447?co=GENIE.Platform%3DAndroid&hl=en#"
                    target="_blank"
                    id="devices-link"
                  >
                    Google Authenticator
                    <br>on other devices
                  </a>
                </div>
              </div>
              <div class="step">
                <div class="icon-rounded">2</div>
                <div class="qr-code-content pointer">
                  <p class="info">Scan the code with your device</p>
                  <img
                    @click="localLoadSecret"
                    :class="{'d-none': is2FAActivated}"
                    id="qr-code-img"
                    ref="qrcode"
                    alt
                  >
                </div>
              </div>
              <div class="step wide">
                <div class="icon-rounded">3</div>
                <div class="qr-code-content">
                  <p class="info">
                    <span class="warning-red">Warning</span>: If your phone is unavailable,
                    the backup code will be the only way to sign in to your account.
                    It’s strongly recommended to write it down.
                  </p>
                  <p v-if="!is2FAActivated">
                    <strong>Write down your backup code:</strong>
                    <br>
                    <b>{{ token }}</b>
                    <br>Enter validation code from your device:
                  </p>
                  <div>
                    <p v-if="is2FAActivated" class="activated-code">Activated</p>
                    <div class="confirm-input d-flex-full-center">
                      <input
                        v-model="code"
                        :maxlength="6"
                        :class="{filled: code.length === 6}"
                        type="text"
                        class="field settings w-input mr-2"
                        placeholder="Code"
                      >
                      <button
                        v-show="is2FAActivated"
                        v-promise-btn
                        @click.prevent="turnOff2FA"
                        ref="deactivateBtn"
                        class="btn-middle-size btn w-button btn-red"
                      >Deactivate</button>
                      <button
                        v-show="!is2FAActivated"
                        v-promise-btn
                        @click="toggle2FA"
                        ref="activateBtn"
                        class="btn-middle-size btn w-button"
                      >Activate</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="d-flex-full-center">
              <div class="bg-light-grey d-flex-full-center w-100 px-2">
                <h4 class="w-40 text-black">Automatic logout</h4>
                <ui-select
                  :options="authoLogoutRange"
                  v-model="autoLogout"
                  style="height: 34px; margin: 0"
                  class="w-60 bg-white text-black"
                  placeholder="Select type"
                />
              </div>
              <div class="button-wrapper-settings w-60 mx-2 my-2">
                <button v-promise-btn @click="saveSettings" class="btn green w-button">Save</button>
              </div>
            </div>-->
            <ui-alert
              @dismiss="error.showError = false"
              type="error"
              v-show="error.showError"
            >{{ error.message }}</ui-alert>
            <div class="w-100 mt-3">
              <h4 class="w-100 text-center text-black my-3">Bot Integration</h4>
              <div class="d-flex-full-center py-1">
                <div>Token:</div>
                <button
                  v-if="!botToken"
                  v-promise-btn
                  @click="generateBotToken"
                  class="btn px-2 py-1 my-0 mx-3 w-button green"
                >Generate</button>
                <span v-else>
                  <input
                    ref="botToken"
                    type="text"
                    :value="botToken"
                    onkeypress="return false"
                    class="bot-token"
                  >
                  <fa @click="copyBotToken" icon="copy" class="text-green pointer"/>
                </span>
              </div>
              <p class="mt-1">
                <b>Important:</b> To be able to generate token for your bot you need to
                <strong>pass KYC process</strong> and
                <strong>activate 2FA</strong> first
              </p>
            </div>
            <div class="w-100 d-flex f-wrap justify-center mt-3" id="activity-history">
              <h4 class="w-100 text-center text-black mt-3">Recent activity</h4>
              <div v-if="isNoHistory" class="transactionhistory-item balances empty">
                <p>No balances</p>
              </div>
              <div v-else-if="isLoadingHistory" class="mb-transactionhistory-item balances empty">
                <a-spinner/>
              </div>
              <table v-else class="my-2">
                <tr>
                  <th>Date (UTC)</th>
                  <th>Device</th>
                  <th>Browser</th>
                  <th>Operation system</th>
                  <th>IP</th>
                  <th>Address</th>
                </tr>
                <tr v-for="(activity, i) in activityHistoryList" :key="i">
                  <td>{{ humanDate(activity.loginDateTimeUTC, 'YYYY-MM-DD HH:mm') }}</td>
                  <td>{{ activity.device }}</td>
                  <td>{{ activity.browser }}</td>
                  <td>{{ activity.os }}</td>
                  <td>{{ activity.remoteIP }}</td>
                  <td style="max-width: 110px;">{{ activity.geoLocation }}</td>
                </tr>
              </table>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import axios from "axios";
import { isEmpty, get } from "lodash";

export default {
  middleware: "authentication",
  layout: "profile",
  head() {
    return {
      title: "2FA | Folex"
    };
  },
  data() {
    return {
      isLoadingHistory: true,
      account: "",
      key: "",
      token: "",
      authoLogoutRange: [
        { value: 10, label: "10 min" },
        { value: 30, label: "30 min" },
        { value: 60, label: "60 min" },
        { value: 0, label: "Never" }
      ],
      autoLogout: "",
      activityHistoryList: [],
      notifyOnLoginAccount: false,
      error: {
        showError: false,
        message: ""
      },
      secret: null,
      code: "",
      is2FAActivated: false,
      botToken: ""
    };
  },
  mounted() {
    this.initialize2FA();

    this.loadLogginHistory().then(resp => {
      if (resp) this.activityHistoryList = resp;

      this.isLoadingHistory = false;
    });
  },
  watch: {
    code(newValue, oldValue) {
      if (newValue.length < 6) return;

      const action2FABtn = this.is2FAActivated
        ? this.$refs.deactivateBtn
        : this.$refs.activateBtn;
      action2FABtn.click();
    }
  },
  computed: {
    ...mapGetters("authentication", ["getUserName"]),
    isNoHistory() {
      return isEmpty(this.activityHistoryList) && !this.isLoadingHistory;
    }
  },
  methods: {
    ...mapActions("profile", [
      "loadSecret",
      "activate2FA",
      "deactivate2FA",
      "getTempToken",
      "isTwoFactorAuthTurnOn",
      "loadLogginHistory",
      "loadBotToken"
    ]),
    initialize2FA() {
      this.isTwoFactorAuthTurnOn().then(activated => {
        if (activated) this.is2FAActivated = activated;
        else this.localLoadSecret();
      });
    },
    toggle2FA() {
      const request = this.is2FAActivated
        ? this.deactivate2FA
        : this.activate2FA;
      return request({ code: this.code, tempToken: this.token }).then(res => {
        if (get(res, "error")) return this.notifyError(res.error);
        if (res === false) {
          this.notifyError("Coudn't activate. Rescan new QR-code.");
          return this.initialize2FA();
        }

        this.code = "";
        this.is2FAActivated = !this.is2FAActivated;
        if (!this.is2FAActivated) this.localLoadSecret();
      });
    },
    turnOff2FA() {
      this.token = "Loading...";
      return this.getTempToken()
        .then(data => {
          if (data.token) {
            this.token = data.token;
            this.toggle2FA();
          }
        })
        .catch(console.log);
    },
    async localLoadSecret() {
      try {
        const secret = await this.loadSecret();
        this.token = secret.token;
        this.setSecret(secret.key);
      } catch (e) {
        console.log(e);
      }
    },
    setSecret(key) {
      QRCode.toDataURL(
        `otpauth://totp/Folex-${this.getUserName}?secret=${key}`,
        (err, data_url) => {
          this.$refs.qrcode.src = data_url;
        }
      );
    },
    generateBotToken() {
      return this.loadBotToken().then(res => {
        if (res.error) return this.notifyError(res.error);

        this.botToken = res;
        this.copyBotToken();
      });
    },
    copyBotToken() {
      this.$nextTick(function() {
        this.$refs.botToken.focus();
        this.$refs.botToken.select();
      });
      navigator.clipboard.writeText(this.botToken);
    },
    saveSettings() {
      // if (!this.userName || !this.password) {
      //   displayError.log("Fill all fields", this.error);
      //   return;
      // }

      this.error.showError = false;

      return new Promise((res, rej) =>
        setTimeout(() => {
          res();
          this.isSave = true;
          this.isSaveSuccessfully = true;
        }, 2000)
      );
    }
  }
};
</script>

<style scoped>
.custom-width {
  max-width: 800px;
  padding-left: 15px;
  padding-right: 15px;
}
.done {
  display: block;
}
.ui-select {
  border: 1px solid #ccc;
}
.round-border {
  border: 2px solid #eda55d;
  border-radius: 8px;
  padding: 16px;
  margin: 0;
}
.qr-code-wrapper .step:nth-child(1),
.qr-code-wrapper .step:nth-child(2) {
  width: 68%;
  margin-right: 2%;
}
.step .icon-rounded {
  background-color: gray;
  height: 30px;
  width: 30px;
  line-height: 32px;
  border-radius: 50%;
  color: white;
  font-size: 16px;
  margin-bottom: 6px;
}
.qr-code-content {
  text-align: left;
}
.qr-code-content .social {
  width: 70%;
}
#devices-link {
  text-decoration: none;
  color: #0881ff;
}
#qr-code-img {
  border: 1px solid #ccc;
}
.activated-code {
  color: green;
  font-size: 18px;
  margin: 0;
}
.filled {
  border-color: green;
}
.bot-token {
  width: 310px;
  text-align: center;
  padding: 0;
}
.bot-token,
.bot-token:hover,
.bot-token:focus {
  border: none;
  outline: none;
}
</style>