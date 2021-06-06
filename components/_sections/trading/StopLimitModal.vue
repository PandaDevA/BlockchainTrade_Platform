<template>
  <div>
    <div :class="{show: isOpen}" @click.self="clearAndClose" class="stoploss-popup">
      <div
        :class="{dark: theme === 'dark', 'grey-border': theme === 'light'}"
        class="module-wrapper stoploss"
      >
        <div :class="{dark: theme === 'dark'}" class="module-header-grey sl">
          <div class="emptyspace"></div>
          <div class="module-title">Stop Limit</div>
          <div @click="clearAndClose" class="closestoploss">
            <img src="/images/close.svg" alt class="menu-icon">
          </div>
        </div>
        <div class="module-content">
          <div class="w-form">
            <div
              id="email-form-2"
              name="email-form-2"
              data-name="Email Form 2"
              method="post"
              action="#"
            >
              <div class="price">
                <div :class="{'text-white': theme === 'dark'}" class="buyselltext">Trigger at:</div>
                <div style="flex: 3;" class="priceinput-wrapper">
                  <number-input
                    v-model.number="triggerAt"
                    :min="0"
                    :step="0.1"
                    size="small"
                    center
                    inline
                    controls
                    class="custom-number-input"
                  ></number-input>
                  <div :class="{'text-white': theme === 'dark'}" class="buyselltext _1">BTC</div>
                </div>
              </div>
              <div class="price">
                <div :class="{'text-white': theme === 'dark'}" class="buyselltext">Amount:</div>
                <div style="flex: 3;" class="priceinput-wrapper">
                  <number-input
                    v-model.number="amount"
                    :min="0"
                    :max="selectedCurrency.currencyAvailable"
                    :step="1"
                    size="small"
                    center
                    inline
                    controls
                    class="custom-number-input"
                  ></number-input>
                  <div
                    :class="{'text-white': theme === 'dark'}"
                    class="buyselltext _1"
                  >{{ selectedCurrency.currencyShortName }}</div>
                </div>
              </div>
              <div class="range-slider">
                <input
                  class="range-slider__range"
                  type="range"
                  v-model.number="amount"
                  min="0"
                  :max="calculateMax(selectedCurrency.currencyAvailable, triggerAt)"
                  step="0.00000001"
                >
                <span
                  class="range-slider__value"
                >{{ amountPercents(amount, (selectedCurrency.currencyAvailable / triggerAt)) }}%</span>
              </div>
              <div class="price">
                <div :class="{'text-white': theme === 'dark'}" class="buyselltext">Total:</div>
                <div style="flex: 3;" class="priceinput-wrapper">
                  <div class="text-center field w-input w-100">
                    <span
                      class="total-input"
                    >{{ toFixedSmall(calculateBigNumber(triggerAt, amount, 'multiply'), maxDecimals) }}</span>
                  </div>
                  <div :class="{'text-white': theme === 'dark'}" class="buyselltext _1">BTC</div>
                </div>
              </div>
              <div class="button-wrapper d-flex justify-center top">
                <div v-promise-btn @click="localAddOrder" class="btn small">Okay</div>
                <div @click="clear" class="btn small ml-2 bg-orange">Clear</div>
                <div @click="$emit('close')" class="btn small stoploss">Abort</div>
              </div>
            </div>
            <div class="w-form-done">
              <div>Thank you! Your submission has been received!</div>
            </div>
            <div class="w-form-fail">
              <div>Oops! Something went wrong while submitting the form.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import NumberInput from "@/components/external/VueNumberInput";

export default {
  components: {
    NumberInput
  },
  props: {
    theme: {
      default: "light"
    },
    isOpen: {
      default: false
    }
  },
  data() {
    return {
      maxDecimals: 8,
      triggerAt: 0,
      amount: 0,
      price: -1,
      isTakeProfit: true
    };
  },
  mounted() {},
  watch: {
    triggerAt: {
      handler(newValue, oldValue) {
        const availableAmount =
          this.selectedCurrency.currencyAvailable / this.amount;
        if (newValue > availableAmount) {
          const newVal = this.calculateBigNumber(
            this.selectedCurrency.currencyAvailable,
            newValue,
            "divide"
          );
          this.amount = newVal;
        }
      }
    },
    amount: {
      handler(newValue, oldValue) {
        const availablePrice =
          this.selectedCurrency.currencyAvailable / this.triggerAt;
        if (newValue > availablePrice) {
          const newVal = this.calculateBigNumber(
            this.selectedCurrency.currencyAvailable,
            this.triggerAt,
            "divide"
          );
          this.amount = newVal;
        }
      }
    }
  },
  computed: {
    ...mapState("trading", ["selectedCurrency"]),
    ...mapGetters("trading", ["getCurrencyBtcRate"])
  },
  methods: {
    ...mapActions("trading", ["addOrder"]),
    localAddOrder() {
      if (!this.getCurrencyBtcRate) {
        this.$notify({
          type: "error",
          title: `Don't have proposals on market for ${dealType} deals.`,
          duration: this.notificationDuration
        });
        this.clear(type);
        return;
      }
      const order = {
        dealType: "Sell",
        currencyId: this.selectedCurrency.currencyId,
        triggerAt: this.triggerAt,
        amount: this.amount,
        price: this.price,
        isTriggered: this.triggerAt > this.getCurrencyBtcRate,
        isTakeProfit: true
      };
      return this.addOrder(order).then(res => {
        if (res) {
          this.clear();
          this.$notify({
            type: "success",
            title: `Order was added successfully`,
            duration: this.notificationDuration
          });
        }
        return res;
      });
    },
    clear() {
      this.triggerAt = 0;
      this.amount = 0;
    },
    clearAndClose() {
      this.clear();
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.dark .module-header-grey {
  background-color: #424242;
  color: #fff;
}
.show {
  display: flex;
}
.module-wrapper {
  width: 380px;
}
.module-header.dark {
  background-color: #424242;
  color: #fff;
}
.module-wrapper.dark {
  background-color: #5e5e5e;
}
.stoploss-line.grey.dark {
  background-color: transparent;
  color: #fff;
}
.stoploss-line.grey {
  padding: 5px 8px;
}
.module-content {
  padding: 10px 14px;
}
.module-wrapper.stoploss {
  padding: 0;
}
.grey-border {
  border-style: solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.1);
}
</style>