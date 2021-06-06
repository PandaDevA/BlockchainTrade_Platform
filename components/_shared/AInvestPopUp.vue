<template>
  <div :class="{ open: isOpen }" class="transfer-popup">
    <div @focus="isOpen = false" class="module-wrapper stoploss">
      <div class="module-header sl">
        <div class="emptyspace"></div>
        <div class="module-title">Invest</div>
        <div @click="isOpen = false" class="closestoploss">
          <img src="/images/close.svg" alt class="menu-icon">
        </div>
      </div>
      <div class="module-content transfer">
        <div class="w-form">
          <form>
            <div class="stoploss-line">
              <div class="stoploss-col-3 nopadding">
                <div class="title-3c nomargin">Choose Amount:</div>
              </div>
              <div class="stoploss-col-3">
                <input
                  v-model="localInvest.amount"
                  :max="investData.amount"
                  type="number"
                  class="field w-input"
                >
              </div>
            </div>
            <div class="range-slider">
              <input
                v-model.number="localInvest.amount"
                class="range-slider__range"
                type="range"
                min="0"
                :max="investData.amount"
                step="0.1"
              >
              <span
                class="range-slider__value"
              >{{ amountPercents(+localInvest.amount, +investData.amount) }}%</span>
            </div>
            <div class="button-wrapper top d-flex justify-between">
              <div>{{ localInvest.currencyShortName }}</div>
              <div v-promise-btn @click="makeInvest" class="btn small">Invest</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { clone } from "lodash";
import { mapActions } from "vuex";

export default {
  props: {
    investData: {
      type: Object,
      required: true
    }
  },
  watch: {
    investData: {
      handler(newValue, oldValue) {
        this.localInvest = clone(this.investData);
      },
      immediate: true
    },
    "localInvest.amount": {
      handler(newValue, oldValue) {
        if (newValue > this.investData.amount)
          this.localInvest.amount = this.investData.amount;
        if (newValue < 0 || !newValue) this.localInvest.amount = 0;
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      localInvest: {
        pair: `BTC`,
        amount: 0,
        poolId: -1,
        walletId: -1
      },
      max: this.investData.amount,
      isOpen: false
    };
  },
  methods: {
    ...mapActions("pooling", ["invest"]),
    makeInvest() {
      return this.invest({
        investingPoolId: this.localInvest.poolId,
        walletId: this.localInvest.walletId,
        investAmount: this.localInvest.amount
      }).then(res => {
        this.isOpen = false;
        console.log("Invested", res);
      });
    }
  }
};
</script>

<style scoped>
.open {
  display: flex;
  padding-left: 50px;
}
</style>