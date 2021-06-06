<template>
  <div class="module-wrapper">
    <div class="module-header">
      <div class="module-title">Balances</div>
    </div>
    <div class="module-content">
      <div class="content-transactionshistory">
        <div class="transactionhistory-item full pl-4">
          <div
            v-for="(header, i) in headers"
            :key="i"
            :style="isNumericJustify(header)"
            class="module-text title _10 headers"
          >
            <div>{{ header }}</div>
          </div>
        </div>
        <div class="table-body">
          <div v-if="isNoBalances" class="transactionhistory-item balances empty">
            <p>No balances</p>
          </div>
          <div v-else-if="isLoading" class="transactionhistory-item balances empty">
            <a-spinner/>
          </div>
          <div
            v-else
            v-for="(balance, i) in localBalances"
            :key="JSON.stringify(balance) + i"
            class="transactionhistory-item balances pl-4"
            :class="{grey: i % 2 === 1 }"
          >
            <div class="balance-info">
              <div class="d-flex module-text text-left">
                <div>{{ balance.data.currencyShortName }}</div>
              </div>
              <div class="d-flex module-text text-left">
                <div>{{ balance.data.currencyName }}</div>
              </div>
              <div class="d-flex justify-end module-text text-right">
                <div>{{ scientificToDecimal(toFixedSmall(balance.data.amountTotal)) }}</div>
              </div>
              <div class="d-flex justify-end module-text text-right">
                <div>{{ scientificToDecimal(toFixedSmall(balance.data.amountAvailable)) }}</div>
              </div>
              <div class="d-flex justify-end module-text text-right">
                <div>{{ scientificToDecimal(toFixedSmall(balance.data.amountInBlock)) }}</div>
              </div>
              <div class="d-flex justify-end module-text text-right">
                <div>{{ scientificToDecimal(toFixedSmall(balance.data.amountInOrder)) }}</div>
              </div>
              <div class="d-flex justify-end module-text text-right pr-2">
                <div>{{ scientificToDecimal(toFixedSmall(balance.data.amountBtc)) }}</div>
              </div>
              <div class="d-flex justify-end module-text switch">
                <a-button
                  @click="showDeposit(balance)"
                  class="sell-button ghost"
                  color="transparent"
                  type="table"
                  size="auto"
                >Deposit</a-button>
              </div>

              <div class="d-flex justify-end module-text switch">
                <a-button
                  v-if="isAllowedWithdrawal(balance.data)"
                  @click="showWithdraw(balance)"
                  v-tooltip.bottom="tooltipWithdrawal"
                  class="sell-button ghost"
                  color="transparent"
                  :disabled="!isTwoFactorAuth"
                  type="table"
                  size="auto"
                >Withdrawal</a-button>
                <a-button
                  v-else
                  class="sell-button blocked-btn"
                  color="transparent"
                  disabled
                  type="table"
                  size="auto"
                >Coming soon...</a-button>
              </div>
              <div class="d-flex justify-end module-text switch">
                <a-button
                  v-if="isAllowedTrade(balance.data)"
                  @click="trade(balance)"
                  class="sell-button ghost"
                  color="transparent"
                  type="table"
                  style="width: 100px"
                  size="auto"
                >Trade</a-button>
                <button v-else class="sell-button make-disabled-trade" disabled>Trade</button>
              </div>
            </div>

            <div v-if="balance.showDeposit" class="deposit-content">
              <div class="deposit-container d-flex text-left">
                <div class="deposit-info">
                  <div class="deposit-description">
                    <h5>Deposit</h5>
                    <p>
                      Please send {{ balance.data.currencyShortName }} to your deposit address displayed below. The Deposit will credited in your corresponding
                      wallet. Learn more About wallets.
                      You can generate new deposit addresses using [ ] button below. When you generate a new deposit address,
                      the old address is still valid for accepting deposits.
                    </p>
                    <p>To ensure your Transaction is confirmed as soon as possible, a miner Transaction fee of is recommended.</p>
                  </div>
                  <hr>
                  <div class="deposit-wallet">
                    <h5>Wallet Address:</h5>
                    <div class="d-flex">
                      <input
                        ref="walletAddress"
                        :id="balance.data.lastAddress"
                        :value="balance.data.lastAddress"
                        onkeypress="return false;"
                        autocomplete="off"
                        class="deposit-code text-center"
                      >

                      <a-button
                        v-if="ifNoAddress(balance.data.lastAddress)"
                        @click="refreshWalletAddress(balance.data)"
                        size="small-icon"
                      >
                        <i class="fas fa-sync-alt"></i>
                      </a-button>
                      <a-button
                        @click="copyWalletAddress(balance.data.lastAddress)"
                        size="small-icon"
                      >
                        <i class="fas fa-copy"></i>
                      </a-button>
                      <!-- <a-button @click="generateQRCode(balance)" size="small-icon">
                        <i class="fas fa-qrcode"></i>
                      </a-button>-->
                    </div>
                  </div>
                </div>
                <div v-if="balance.showQRCode" class="deposit-qr">
                  <!-- <img src="http://astorfi.github.io/QR_Code/images/qrcode.png" alt> -->
                </div>
              </div>
            </div>
            <div v-if="balance.showWithdraw" class="withdraw-content">
              <!-- <div class="withdraw-content"> -->
              <div class="withdraw-container d-flex text-left">
                <div class="withdraw-new">
                  <div class="withdraw-description d-flex f-wrap pt-2">
                    <span class="w-100">Destination Address:</span>
                    <input
                      placeholder="Type destination address"
                      v-model="newWithdraw.destinationAddress"
                      class="input-custom-round w-100 mb-4"
                    >
                    <div class="withdraw-new-all d-flex f-wrap align-items-center w-100">
                      <span class="w-100 mb-1">Amount [{{balance.data.currencyShortName}}]:</span>
                      <ui-alert
                        type="warning"
                        :dismissible="false"
                        removeIcon
                      >Minimun withdrawal amount: {{ balance.data.minWithdrawal }}</ui-alert>
                      <ui-alert
                        type="warning"
                        :dismissible="false"
                        removeIcon
                      >Available withdrawal amount: {{ balance.data.maxWithdrawal }}</ui-alert>
                      <number-input
                        v-model.number="newWithdraw.amount"
                        :min="balance.data.maxWithdrawal < balance.data.minWithdrawal ? 0: balance.data.minWithdrawal"
                        :max="balance.data.maxWithdrawal < balance.data.minWithdrawal ? 0 : balance.data.maxWithdrawal"
                        :step="1"
                        :disabled="!balance.data.amountAvailable"
                        size="small"
                        center
                        inline
                        class="mt-1 p-none custom-number-input w-100"
                      ></number-input>
                    </div>
                    <div
                      class="mt-4 withdraw-new-send d-flex justify-between align-items-center w-100"
                    >
                      <div>
                        <span>
                          <strong>Transaction Fee: {{ balance.data.feeWithdrawal }}</strong>
                        </span>
                        <br>
                        <span>
                          <strong>You will get : {{ balance.data.maxWithdrawal >= balance.data.minWithdrawal ? scientificToDecimal(newWithdraw.amount - balance.data.feeWithdrawal) : 0 }}</strong>
                        </span>
                      </div>
                      <a-button
                        @click="prepareWithdrawal(balance.data)"
                        :disabled="isSendLoading"
                        :css="{ marginLeft: '12px', width: '100px'}"
                        color="green make-disabled"
                        size="medium"
                      >{{ isSendLoading ? 'Loading...' : 'Send' }}</a-button>
                    </div>
                  </div>
                </div>
                <div class="withdraw-note">
                  <h5>Please Note:</h5>
                  <p>Once you have submitted your withdrawal request, we will send a confirmation email. Please then click on the confirmation link in your email.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2FA before send withdrawal -->
    <input-2FA-modal ref="input-2fa-modal" @onSuccess="localSendWithdrawal"/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { clone, get, isEmpty, map } from "lodash";
import NumberInput from "@/components/external/VueNumberInput";
import Input2FAModal from "@/components/_shared/Input2FAModal";

export default {
  components: {
    NumberInput,
    Input2FAModal
  },
  props: {
    balances: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      headers: [
        "coin",
        "name",
        "total",
        "available",
        "blocked",
        "in order",
        "BTC VALUE",
        "",
        "",
        ""
      ],
      newWithdraw: {
        destinationAddress: "",
        amount: 0
      },
      currentWithdrawal: {},
      isSendLoading: false,
      isTwoFactorAuth: false,
      localBalances: []
    };
  },
  created() {
    this["profile/isTwoFactorAuthTurnOn"]().then(activated => {
      this.isTwoFactorAuth = !!activated;
    });
  },
  watch: {
    balances: {
      handler(newValue, oldValue) {
        this.localBalances = map(newValue, balance => {
          if (balance.data.lastAddress) return balance;
          balance.data.lastAddress =
            "Click refresh to initialize wallet address";
          return balance;
        });
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    isNoBalances() {
      return isEmpty(this.balances) && !this.isLoading;
    },
    tooltipWithdrawal() {
      return this.isTwoFactorAuth
        ? { class: "tooltip-hide", delay: 0 }
        : {
            content: "Activate 2FA first",
            delay: 0,
            class: "tooltip-small"
          };
    }
  },
  methods: {
    ...mapActions([
      "profile/isTwoFactorAuthTurnOn",
      "balances/loadWalletAddress",
      "balances/sendWithdrawal"
    ]),
    localSendWithdrawal() {
      const {
        feeWithdrawal,
        maxWithdrawal,
        minWithdrawal,
        currencyId
      } = this.currentBalance;
      const payload = {
        Address: this.newWithdraw.destinationAddress,
        CurrencyId: currencyId,
        Amount: this.newWithdraw.amount
      };

      this.isSendLoading = true;
      this["balances/sendWithdrawal"](payload).then(res => {
        this.isSendLoading = false;

        if (res.error) return this.notifyError(res.error);

        const successMessage = `Withdrawal has created successfully.<br>Check your email to confirm.`;
        this.notifySuccess(successMessage);
        this.resetNewWithdraw();
      });
    },
    prepareWithdrawal(balance) {
      if (!this.newWithdraw.destinationAddress) {
        return this.notifyError(`Provide a destination address`);
      }

      if (
        balance.maxWithdrawal < balance.minWithdrawal ||
        this.newWithdraw.amount <= 0
      ) {
        return this.notifyError(`Provide an amount`);
      }

      this.currentBalance = balance;
      this.openModal("input-2fa-modal");
    },
    copyWalletAddress(code) {
      const input = this.$refs.walletAddress[0];
      this.$nextTick(() => {
        input.focus();
        input.select();
      });

      navigator.clipboard.writeText(code);
    },
    refreshWalletAddress(balance) {
      balance.lastAddress = "Loading...";
      this["balances/loadWalletAddress"](balance.currencyShortName).then(
        address => {
          balance.lastAddress = address || "No data";
        }
      );
    },
    generateQRCode(balance) {
      balance.showQRCode = !balance.showQRCode;
    },
    showDeposit(balance) {
      if (!balance.showDeposit) this.$emit("hideOpened");
      balance.showDeposit = !balance.showDeposit;
    },
    showWithdraw(balance) {
      if (!balance.showWithdraw) {
        this.resetNewWithdraw();
        this.$emit("hideOpened");
      }
      balance.showWithdraw = !balance.showWithdraw;
    },
    trade(balance) {
      this.$router.push({
        name: "trading",
        query: { currencyId: balance.data.currencyId }
      });
    },
    resetNewWithdraw() {
      this.newWithdraw = {
        destinationAddress: "",
        amount: 0
      };
    },
    isAllowedWithdrawal({ currencyId }) {
      // const allowIds = [3, 4, 5, 6, 9, 11];
      const allowIds = [2, 3, 4, 5, 6, 9, 11];
      return allowIds.includes(currencyId);
      // const restricted = [10, 15];
      // return !restricted.includes(currencyId);
    },
    isAllowedTrade({ currencyId }) {
      const restricted = [11, 15];
      return !restricted.includes(currencyId);
    },
    isNumericJustify(header) {
      const numericHeaders = [
        "total",
        "available",
        "blocked",
        "in order",
        "BTC VALUE"
      ];
      if (numericHeaders.includes(header))
        return { justifyContent: "flex-end", "text-align": "right" };

      return { justifyContent: "flex-start", "text-align": "left" };
    },
    ifNoAddress(address) {
      return (
        !address ||
        address === "Click refresh to initialize wallet address" ||
        address === "No data"
      );
    }
  }
};
</script>

<style scoped>
.wallet-wrapper,
.module-wrapper {
  max-height: 65vh;
}
.module-content .module-text {
  align-items: center;
}
.transactionhistory-item.balances {
  flex-wrap: wrap;
}
.empty {
  display: flex;
  justify-content: center;
}
.empty p {
  margin-top: 10px;
  margin-bottom: 0;
}
.module-content,
.content-transactionshistory {
  height: 100%;
}
.transactionhistory-item.full {
  max-height: 50px;
}
.module-content .table-body {
  overflow-y: auto;
  height: 100%;
}
.balance-info {
  width: 100%;
  display: flex;
}
.deposit-content,
.withdraw-content {
  margin: 6px;
  background-color: #d6d6d654;
  width: 100%;
}
.deposit-container,
.withdraw-container {
  margin-left: 3%;
}
.deposit-container > div,
.withdraw-container > div {
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  padding: 20px;
  padding-top: 10px;
  margin: 16px;
}
.deposit-info,
.withdraw-new {
  background-color: #fff;
  width: 65%;
  text-align: justify;
}
.deposit-code {
  width: 100%;
  padding: 0 12px;
  margin-right: 16px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 4px;
}
.deposit-qr,
.withdraw-note {
  background-color: #fff;
  width: 26%;
}
.deposit-qr img {
  width: 100%;
  height: 100%;
}
.make-disabled-trade[disabled] {
  padding-left: 5px;
  padding-right: 5px;
  background-color: #cccccc !important;
  color: #666666 !important;
  opacity: 0.4;
  cursor: not-allowed;
  width: 100px;
  height: 22px;
  line-height: 15px;
}
.blocked-btn,
.blocked-btn:hover {
  background: #787878;
  color: white;
}
</style>