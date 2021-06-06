<template>
  <div :class="{ open: isOpen }" @click.self="clearAndClose" class="transfer-popup">
    <div @focus="isOpen = false" class="module-wrapper stoploss">
      <div class="module-header sl">
        <div class="emptyspace"></div>
        <div class="module-title">Transfer: Trade/Pool</div>
        <div @click="clearAndClose" class="closestoploss">
          <img src="/images/close.svg" alt class="menu-icon">
        </div>
      </div>
      <div class="module-content transfer">
        <div class="w-form">
          <form>
            <div class="stoploss-line">
              <div class="stoploss-col-3">
                <div class="title-3c">TRADE</div>
              </div>
              <ul class="tg-list">
                <li class="tg-list-item">
                  <input v-model="localTransfer.isTrade" class="tgl tgl-wallet2" type="checkbox">
                  <label
                    @click="localTransfer.isTrade = !localTransfer.isTrade"
                    class="tgl-btn"
                    for="cb2"
                  ></label>
                </li>
              </ul>
              <div class="stoploss-col-3">
                <div class="title-3c">POOL</div>
              </div>
            </div>
            <div class="stoploss-line nopadding m-none">
              <div class="stoploss-col-3 nopadding">
                <div class="title-3c nomargin">Choose amount:</div>
              </div>
              <div class="stoploss-col-3">
                <input
                  v-model="localTransfer.amount"
                  type="number"
                  class="field w-input text-right"
                >
              </div>
            </div>
            <div class="d-flex justify-between">
              <div class="stoploss-col-3 nopadding">
                <div class="title-3c nomargin">Value in order:</div>
              </div>
              <div class="stoploss-col-3 text-red mx-4">{{ localTransfer.blockedAmount }}</div>
            </div>
            <div class="range-slider">
              <input
                v-model="localTransfer.amount"
                class="range-slider__range"
                type="range"
                min="0"
                :max="max"
                step="0.001"
              >
              <span class="range-slider__value">{{ amountPercents(localTransfer.amount, max) }}%</span>
            </div>
            <div class="button-wrapper top d-flex justify-between">
              <div>COIN: {{ localTransfer.pair }}</div>
              <div v-promise-btn @click="accept" class="btn small">Accept</div>
            </div>
          </form>
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
</template>

<script>
import { clone } from "lodash";
import { mapActions } from "vuex";

export default {
  props: {
    transfer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localTransfer: clone(this.transfer),
      max: this.transfer.amount,
      isTrade: this.transfer.isTrade,
      isOpen: false
    };
  },
  watch: {
    "localTransfer.amount": {
      handler(newValue, oldValue) {
        if (newValue > this.max) this.localTransfer.amount = this.max;
        if (newValue < 0 || !newValue) this.localTransfer.amount = 0;
      }
    }
  },
  computed: {},
  methods: {
    ...mapActions("wallets", ["makeTransfer", "loadWallets"]),
    accept() {
      return new Promise(async (res, rej) => {
        const noTransfer = this.localTransfer.isTrade !== this.isTrade;
        const noAmount = this.localTransfer.amount == 0;
        if (noTransfer || noAmount) {
          res();
          return;
        }
        try {
          const { isTrade, amount, currencyId } = this.localTransfer;
          const to = isTrade ? 2 : 1; // 2 - to pooling, 1 to trade;
          const from = to === 2 ? 1 : 2;
          const data = {
            fromWalletId: from,
            toWalletId: to,
            currencyId: currencyId,
            currencyValue: +amount
          };
          await this.makeTransfer(data);
          await this.loadWallets();
          this.$emit("clean");
          this.isOpen = false;
        } catch (e) {
          console.log(e);
        } finally {
          res();
        }
      });
    },
    clearAndClose() {
      this.isOpen = false;
      this.$emit("clean");
    }
  }
};
</script>

<style scoped>
.open {
  display: flex;
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

h2 {
  color: #777;
}

h4 {
  color: #999;
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

.tgl-wallet2 + .tgl-btn {
  background: #fee6cb;
  border-radius: 2em;
  padding: 2px;
  transition: all 0.4s ease;
  border: 1px solid #e8eae9;
}
.tgl-wallet2 + .tgl-btn:after {
  border-radius: 2em;
  background: #fbfbfb;
  transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    padding 0.3s ease, margin 0.3s ease;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 0 rgba(0, 0, 0, 0.08);
}
.tgl-wallet2 + .tgl-btn:hover:after {
  will-change: padding;
}
.tgl-wallet2 + .tgl-btn:active {
  box-shadow: inset 0 0 0 2em #e8eae9;
}
.tgl-wallet2 + .tgl-btn:active:after {
  padding-right: 0.8em;
}
.tgl-wallet2:checked + .tgl-btn {
  background: #b5d5ec;
}
.tgl-wallet2:checked + .tgl-btn:active {
  box-shadow: none;
}
.tgl-wallet2:checked + .tgl-btn:active:after {
  margin-left: -0.8em;
}

.tgl-wallet3 + .tgl-btn {
  background: #e7f5d8;
  border-radius: 2em;
  padding: 2px;
  transition: all 0.4s ease;
  border: 1px solid #e8eae9;
}
.tgl-wallet3 + .tgl-btn:after {
  border-radius: 2em;
  background: #fbfbfb;
  transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    padding 0.3s ease, margin 0.3s ease;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 0 rgba(0, 0, 0, 0.08);
}
.tgl-wallet3 + .tgl-btn:hover:after {
  will-change: padding;
}
.tgl-wallet3 + .tgl-btn:active {
  box-shadow: inset 0 0 0 2em #e8eae9;
}
.tgl-wallet3 + .tgl-btn:active:after {
  padding-right: 0.8em;
}
.tgl-wallet3:checked + .tgl-btn {
  background: #fee6cb;
}
.tgl-wallet3:checked + .tgl-btn:active {
  box-shadow: none;
}
.tgl-wallet3:checked + .tgl-btn:active:after {
  margin-left: -0.8em;
}
</style>