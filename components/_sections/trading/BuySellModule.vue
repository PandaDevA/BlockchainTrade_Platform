<template>
  <div class="module-wrapper buysell small">
    <div v-if="getCurrencySecureStatus" class="w-tabs">
      <div class="tabs-menu exchangerate w-tab-menu">
        <a
          @click="changeBuySellState(true)"
          :class="{'w--current': isBuy}"
          class="tab buysell buy w-inline-block w-tab-link"
        >
          <div>BUY</div>
        </a>
        <a
          @click="changeBuySellState(false)"
          :class="{'w--current': !isBuy}"
          class="tab buysell sell w-inline-block w-tab-link"
        >
          <div>SELL</div>
        </a>
      </div>
      <div class="w-tab-content">
        <div :class="{'w--tab-active': isBuy}" class="w-tab-pane">
          <div class="buysell-wrapper">
            <div class="buysell-50">
              <div class="header-buysell">
                <div class="module-subtitle left">
                  <div class="buycoin">BUY {{ selectedCurrency.currencyShortName }}</div>
                </div>
                <div class="module-subtitle right buysell">
                  <img src="/images/004-bitcoin.svg" width="15" alt class="coin-img">
                  <div class="buycoin">{{ scientificToDecimal(selectedCurrency.btcAvailable) }} BTC</div>
                </div>
              </div>
              <div class="w-form">
                <div id="form-Buy-form-1" name="wf-form-Buy-form-1" data-name="Buy form 1">
                  <div class="price">
                    <div class="buyselltext">Price:</div>
                    <div class="priceinput-wrapper">
                      <numeric-input
                        v-model.number="buy.price"
                        @change="onChangeInput($event, 'BuyPrice')"
                        :min="0"
                        :decimals="limiters.price"
                        :step="dynamicStep(buy.price)"
                        size="small"
                        center
                        inline
                        controls
                        class="custom-number-input"
                      ></numeric-input>
                      <div class="buyselltext _1">BTC</div>
                    </div>
                  </div>
                  <div class="price">
                    <div class="buyselltext">Amount:</div>
                    <div class="priceinput-wrapper">
                      <numeric-input
                        v-model.number="buy.amount"
                        @change="onChangeInput($event, 'BuyAmount')"
                        :min="0"
                        :decimals="limiters.amount"
                        :max="calculateMax(selectedCurrency.btcAvailable, buy.price)"
                        :step="1"
                        size="small"
                        center
                        inline
                        controls
                        class="custom-number-input"
                      ></numeric-input>
                      <div class="buyselltext _1">{{ selectedCurrency.currencyShortName }}</div>
                    </div>
                  </div>
                  <div class="range-slider">
                    <input
                      class="range-slider__range"
                      type="range"
                      v-model.number="buy.amount"
                      @change="onChangeInput($event, 'BuyAmount')"
                      :min="0"
                      :max="calculateMax(selectedCurrency.btcAvailable, buy.price)"
                      :step="limiters.amountMin"
                    >
                    <span
                      class="range-slider__value"
                    >{{ amountPercentsWithMin(limiters.amountMin, buy.amount, (selectedCurrency.btcAvailable/buy.price)) }}%</span>
                  </div>
                  <div class="price">
                    <div class="buyselltext">Total:</div>
                    <div class="priceinput-wrapper">
                      <div class="field w-input w-100">
                        <span class="total-input">{{ totalBuy }}</span>
                      </div>
                      <div class="buyselltext _1">BTC</div>
                    </div>
                  </div>
                  <div class="button-wrapper">
                    <button
                      v-promise-btn
                      @click="addOrderHandler('buy')"
                      class="btn small w-button"
                    >Buy</button>
                    <button @click="clear('buy')" class="btn small clear w-button">Clear</button>
                  </div>
                </div>
                <div class="w-form-done">
                  <div>The form is working</div>
                </div>
                <div class="w-form-fail">
                  <div>Something went wrong with the form button</div>
                </div>
              </div>
            </div>
            <div class="buysell-50">
              <div class="header-buysell">
                <div class="module-subtitle left">
                  <div class="buycoin">BUY {{ selectedCurrency.currencyShortName }}</div>
                </div>
                <div class="module-subtitle right buysell">
                  <img src="/images/004-bitcoin.svg" width="15" alt class="coin-img">
                  <div class="buycoin">{{ scientificToDecimal(selectedCurrency.btcAvailable) }} BTC</div>
                </div>
              </div>
              <div class="w-form">
                <div id="form-Buy-form-1" name="wf-form-Buy-form-1" data-name="Buy form 1">
                  <div class="price">
                    <div class="buyselltext">Price:</div>
                    <div class="priceinput-wrapper">
                      <div class="market-price field grey w-100">Market Price</div>
                      <div class="buyselltext _1">BTC</div>
                    </div>
                  </div>
                  <div class="price">
                    <div class="buyselltext">Amount:</div>
                    <div class="priceinput-wrapper">
                      <numeric-input
                        v-model.number="buyMarket.amount"
                        :min="0"
                        :decimals="limiters.amount"
                        :max="+calculateBigNumber(selectedCurrency.btcAvailable, getCurrencyBtcRate, 'divide')"
                        :step="1"
                        size="small"
                        center
                        inline
                        controls
                        class="custom-number-input"
                      ></numeric-input>
                      <div class="buyselltext _1">{{ selectedCurrency.currencyShortName }}</div>
                    </div>
                  </div>
                  <div class="range-slider market-range">
                    <input
                      class="range-slider__range"
                      type="range"
                      v-model.number="buyMarket.amount"
                      :min="0"
                      :max="+calculateBigNumber(selectedCurrency.btcAvailable, getCurrencyBtcRate, 'divide')"
                      :step="limiters.amountMin"
                    >
                    <span
                      class="range-slider__value"
                    >{{ amountPercentsWithMin(limiters.amountMin, buyMarket.amount, (selectedCurrency.btcAvailable/getCurrencyBtcRate)) }}%</span>
                  </div>
                  <div class="button-wrapper">
                    <button
                      v-promise-btn
                      @click="addOrderHandler('buyMarket')"
                      class="btn small w-button"
                    >Buy</button>
                    <button @click="clear('buyMarket')" class="btn small clear w-button">Clear</button>
                  </div>
                </div>
                <div class="w-form-done">
                  <div>The form is working</div>
                </div>
                <div class="w-form-fail">
                  <div>Something went wrong with the form button</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div :class="{'w--tab-active': !isBuy}" class="w-tab-pane">
          <div class="buysell-wrapper">
            <div class="buysell-50">
              <div class="header-buysell">
                <div class="module-subtitle left">
                  <div class="buycoin">Sell {{ selectedCurrency.currencyShortName }}</div>
                </div>
                <div class="module-subtitle right buysell">
                  <img src="/images/004-bitcoin.svg" width="15" alt class="coin-img">
                  <div
                    class="buycoin"
                  >{{ selectedCurrency.currencyAvailable }} {{ selectedCurrency.currencyShortName }}</div>
                </div>
              </div>
              <div class="w-form">
                <div id="form-Buy-form-1" name="wf-form-Buy-form-1" data-name="Buy form 1">
                  <div class="price">
                    <div class="buyselltext">Price:</div>
                    <div class="priceinput-wrapper">
                      <numeric-input
                        v-model.number="sell.price"
                        :min="0"
                        :decimals="limiters.price"
                        :step="dynamicStep(sell.price)"
                        size="small"
                        center
                        inline
                        controls
                        class="custom-number-input"
                      ></numeric-input>
                      <div class="buyselltext _1">BTC</div>
                    </div>
                  </div>
                  <div class="price">
                    <div class="buyselltext">Amount:</div>
                    <div class="priceinput-wrapper">
                      <numeric-input
                        v-model.number="sell.amount"
                        :min="0"
                        :decimals="limiters.amount"
                        :max="+selectedCurrency.currencyAvailable"
                        :step="1"
                        size="small"
                        center
                        inline
                        controls
                        class="custom-number-input"
                      ></numeric-input>
                      <div class="buyselltext _1">{{ selectedCurrency.currencyShortName }}</div>
                    </div>
                  </div>
                  <div class="range-slider">
                    <input
                      class="range-slider__range"
                      type="range"
                      v-model.number="sell.amount"
                      :min="0"
                      :max="+selectedCurrency.currencyAvailable"
                      :step="limiters.amountMin"
                    >
                    <span
                      class="range-slider__value"
                    >{{ amountPercentsWithMin(limiters.amountMin, sell.amount, selectedCurrency.currencyAvailable) }}%</span>
                  </div>
                  <div class="price">
                    <div class="buyselltext">Total:</div>
                    <div class="priceinput-wrapper">
                      <div class="field w-input w-100">
                        <span class="total-input">{{ totalSell }}</span>
                      </div>
                      <div class="buyselltext _1">BTC</div>
                    </div>
                  </div>
                  <div class="button-wrapper">
                    <button
                      v-promise-btn
                      @click="addOrderHandler('sell')"
                      class="btn small sell w-button"
                    >Sell</button>
                    <button @click="clear('sell')" class="btn small clear w-button">Clear</button>
                    <!-- <div @click="$emit('stopLimit')" class="btn small stoploss">Stop limit</div> -->
                    <div
                      v-tooltip.bottom="{ content: 'Will be available in the next version', delay: 0, class: 'tooltip-small' }"
                      disabled
                      class="btn small stoploss make-disabled"
                    >Stop limit</div>
                  </div>
                </div>
                <div class="w-form-done">
                  <div>The form is working</div>
                </div>
                <div class="w-form-fail">
                  <div>Something went wrong with the form button</div>
                </div>
              </div>
            </div>
            <div class="buysell-50">
              <div class="header-buysell">
                <div class="module-subtitle left">
                  <div class="buycoin">SELL {{ selectedCurrency.currencyShortName }}</div>
                </div>
                <div class="module-subtitle right buysell">
                  <img src="/images/004-bitcoin.svg" width="15" alt class="coin-img">
                  <div
                    class="buycoin"
                  >{{ selectedCurrency.currencyAvailable }} {{ selectedCurrency.currencyShortName }}</div>
                </div>
              </div>
              <div class="w-form">
                <div id="form-Buy-form-1" name="wf-form-Buy-form-1" data-name="Buy form 1">
                  <div class="price">
                    <div class="buyselltext">Price:</div>
                    <div class="priceinput-wrapper">
                      <div class="market-price field grey w-100">Market Price</div>
                      <div class="buyselltext _1">BTC</div>
                    </div>
                  </div>
                  <div class="price">
                    <div class="buyselltext">Amount:</div>
                    <div class="priceinput-wrapper">
                      <numeric-input
                        v-model.number="sellMarket.amount"
                        :min="0"
                        :decimals="limiters.amount"
                        :max="+selectedCurrency.currencyAvailable"
                        :step="1"
                        size="small"
                        center
                        inline
                        controls
                        class="custom-number-input"
                      ></numeric-input>
                      <div class="buyselltext _1">{{ selectedCurrency.currencyShortName }}</div>
                    </div>
                  </div>
                  <div class="range-slider market-range">
                    <input
                      class="range-slider__range"
                      type="range"
                      v-model.number="sellMarket.amount"
                      :min="0"
                      :max="+selectedCurrency.currencyAvailable"
                      :step="limiters.amountMin"
                    >
                    <span
                      class="range-slider__value"
                    >{{ amountPercentsWithMin(limiters.amountMin, sellMarket.amount, selectedCurrency.currencyAvailable) }}%</span>
                  </div>
                  <div class="button-wrapper">
                    <button
                      v-promise-btn
                      @click="addOrderHandler('sellMarket')"
                      class="btn small sell w-button"
                    >Sell</button>
                    <button @click="clear('sellMarket')" class="btn small clear w-button">Clear</button>
                  </div>
                </div>
                <div class="w-form-done">
                  <div>The form is working</div>
                </div>
                <div class="w-form-fail">
                  <div>Something went wrong with the form button</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-tabs">
      <div class="unclickable-overlay">
        <div class="overlay-warning">
          <h2 class="text-red">Pass KYC first</h2>
        </div>
      </div>
      <div class="tabs-menu exchangerate w-tab-menu">
        <a :class="{'w--current': isBuy}" class="tab buysell buy w-inline-block w-tab-link">
          <div>BUY</div>
        </a>
        <a :class="{'w--current': !isBuy}" class="tab buysell sell w-inline-block w-tab-link">
          <div>SELL</div>
        </a>
      </div>
      <div class="w-tab-content">
        <div :class="{'w--tab-active': isBuy}" class="w-tab-pane">
          <div class="buysell-wrapper">
            <div class="buysell-50">
              <div class="header-buysell">
                <div class="module-subtitle left">
                  <div class="buycoin">BUY {{ selectedCurrency.currencyShortName }}</div>
                </div>
                <div class="module-subtitle right buysell">
                  <img src="/images/004-bitcoin.svg" width="15" alt class="coin-img">
                  <div class="buycoin">{{ scientificToDecimal(selectedCurrency.btcAvailable) }} BTC</div>
                </div>
              </div>
              <div class="w-form">
                <div id="form-Buy-form-1" name="wf-form-Buy-form-1" data-name="Buy form 1">
                  <div class="price">
                    <div class="buyselltext">Price:</div>
                    <div class="priceinput-wrapper">
                      <numeric-input
                        v-model.number="buy.price"
                        :min="0"
                        disabled
                        size="small"
                        center
                        inline
                        controls
                        class="custom-number-input"
                      ></numeric-input>
                      <div class="buyselltext _1">BTC</div>
                    </div>
                  </div>
                  <div class="price">
                    <div class="buyselltext">Amount:</div>
                    <div class="priceinput-wrapper">
                      <numeric-input
                        v-model.number="buy.amount"
                        :min="0"
                        :max="calculateMax(selectedCurrency.btcAvailable, buy.price)"
                        :step="1"
                        disabled
                        size="small"
                        center
                        inline
                        controls
                        class="custom-number-input"
                      ></numeric-input>
                      <div class="buyselltext _1">{{ selectedCurrency.currencyShortName }}</div>
                    </div>
                  </div>
                  <div class="range-slider">
                    <input
                      class="range-slider__range"
                      type="range"
                      v-model.number="buy.amount"
                      disabled
                      min="0"
                      :max="calculateMax(selectedCurrency.btcAvailable, buy.price)"
                      step="0.00000001"
                    >
                    <span
                      class="range-slider__value"
                    >{{ amountPercentsWithMin(limiters.amountMin, buy.amount, (selectedCurrency.btcAvailable/buy.price)) }}%</span>
                  </div>
                  <div class="price">
                    <div class="buyselltext">Total:</div>
                    <div class="priceinput-wrapper">
                      <div class="field w-input w-100">
                        <span
                          class="total-input"
                        >{{ toFixedSmall(calculateBigNumber(buy.price, buy.amount, 'multiply'), maxDecimals) }}</span>
                      </div>
                      <div class="buyselltext _1">BTC</div>
                    </div>
                  </div>
                  <div class="button-wrapper">
                    <button class="btn small w-button">Buy</button>
                    <button class="btn small clear w-button">Clear</button>
                  </div>
                </div>
                <div class="w-form-done">
                  <div>The form is working</div>
                </div>
                <div class="w-form-fail">
                  <div>Something went wrong with the form button</div>
                </div>
              </div>
            </div>
            <div class="buysell-50">
              <div class="header-buysell">
                <div class="module-subtitle left">
                  <div class="buycoin">BUY {{ selectedCurrency.currencyShortName }}</div>
                </div>
                <div class="module-subtitle right buysell">
                  <img src="/images/004-bitcoin.svg" width="15" alt class="coin-img">
                  <div class="buycoin">{{ scientificToDecimal(selectedCurrency.btcAvailable) }} BTC</div>
                </div>
              </div>
              <div class="w-form">
                <div id="form-Buy-form-1" name="wf-form-Buy-form-1" data-name="Buy form 1">
                  <div class="price">
                    <div class="buyselltext">Price:</div>
                    <div class="priceinput-wrapper">
                      <div class="market-price field grey w-100">Market Price</div>
                      <div class="buyselltext _1">BTC</div>
                    </div>
                  </div>
                  <div class="price">
                    <div class="buyselltext">Amount:</div>
                    <div class="priceinput-wrapper">
                      <numeric-input
                        v-model.number="buyMarket.amount"
                        :min="0"
                        :max="+calculateBigNumber(selectedCurrency.btcAvailable, getCurrencyBtcRate, 'divide')"
                        disabled
                        :step="1"
                        size="small"
                        center
                        inline
                        controls
                        class="custom-number-input"
                      ></numeric-input>
                      <div class="buyselltext _1">{{ selectedCurrency.currencyShortName }}</div>
                    </div>
                  </div>
                  <div class="range-slider market-range">
                    <input
                      class="range-slider__range"
                      type="range"
                      v-model.number="buyMarket.amount"
                      disabled
                      min="0"
                      :max="+calculateBigNumber(selectedCurrency.btcAvailable, getCurrencyBtcRate, 'divide')"
                      step="0.00000001"
                    >
                    <span
                      class="range-slider__value"
                    >{{ amountPercentsWithMin(limiters.amountMin, buyMarket.amount, (selectedCurrency.btcAvailable/getCurrencyBtcRate)) }}%</span>
                  </div>
                  <div class="button-wrapper">
                    <button class="btn small w-button">Buy</button>
                    <button class="btn small clear w-button">Clear</button>
                  </div>
                </div>
                <div class="w-form-done">
                  <div>The form is working</div>
                </div>
                <div class="w-form-fail">
                  <div>Something went wrong with the form button</div>
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
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import { debounce } from "lodash";
import NumericInput from "@/components/external/VueNumericInput";

const debounceTime = 200;
export default {
  components: {
    NumericInput
  },
  data() {
    return {
      maxDecimals: 8,
      buy: {
        price: 0,
        amount: 0
      },
      buyMarket: {
        price: -1,
        amount: 0
      },
      sell: {
        price: 0,
        amount: 0
      },
      sellMarket: {
        price: -1,
        amount: 0
      },
      minBtcTotal: 0.0001
    };
  },
  watch: {
    selectedCurrency(newValue, oldValue) {
      this.buy = {
        price: 0,
        amount: 0
      };
      this.buyMarket = {
        price: -1,
        amount: 0
      };
      this.sell = {
        price: 0,
        amount: 0
      };
      this.sellMarket = {
        price: -1,
        amount: 0
      };
    },
    currentBuy(newValue, oldValue) {
      this.buy = newValue;
    },
    currentSell(newValue, oldValue) {
      this.sell = newValue;
    }
  },
  computed: {
    ...mapState("trading", [
      "selectedCurrency",
      "isBuy",
      "currentBuy",
      "currentSell"
    ]),
    ...mapGetters("trading", [
      "getUserId",
      "getCurrencyBtcRate",
      "getCurrencySecureStatus"
    ]),
    totalBuy() {
      return this.toFixedSmall(
        this.calculateBigNumber(this.buy.price, this.buy.amount, "multiply"),
        this.maxDecimals
      );
    },
    totalSell() {
      return this.toFixedSmall(
        this.calculateBigNumber(this.sell.price, this.sell.amount, "multiply"),
        this.maxDecimals
      );
    },
    limiters() {
      if (this.getCurrencyBtcRate >= 10) {
        return {
          price: 2,
          priceMin: 0.01,
          amount: 4,
          amountMin: 0.0001
        };
      } else if (this.getCurrencyBtcRate >= 1) {
        return {
          price: 3,
          priceMin: 0.001,
          amount: 3,
          amountMin: 0.001
        };
      } else if (this.getCurrencyBtcRate >= 0.1) {
        return {
          price: 4,
          priceMin: 0.0001,
          amount: 3,
          amountMin: 0.001
        };
      } else if (this.getCurrencyBtcRate >= 0.01) {
        return {
          price: 5,
          priceMin: 0.00001,
          amount: 3,
          amountMin: 0.001
        };
      } else if (this.getCurrencyBtcRate >= 0.003) {
        return {
          price: 5,
          priceMin: 0.00001,
          amount: 2,
          amountMin: 0.01
        };
      } else if (this.getCurrencyBtcRate >= 0.001) {
        return {
          price: 6,
          priceMin: 0.000001,
          amount: 1,
          amountMin: 0.1
        };
      } else if (this.getCurrencyBtcRate >= 0.0001) {
        return {
          price: 7,
          priceMin: 0.0000001,
          amount: 0,
          amountMin: 1
        };
      } else if (this.getCurrencyBtcRate >= 0.00001) {
        return {
          price: 7,
          priceMin: 0.0000001,
          amount: 0,
          amountMin: 1
        };
      } else if (this.getCurrencyBtcRate >= 0.000001) {
        return {
          price: 8,
          priceMin: 0.00000001,
          amount: 0,
          amountMin: 1
        };
      } else if (this.getCurrencyBtcRate >= 0.0000001) {
        return {
          price: 8,
          priceMin: 0.00000001,
          amount: 0,
          amountMin: 1
        };
      } else if (this.getCurrencyBtcRate >= 0.00000001) {
        return {
          price: 8,
          priceMin: 0.00000001,
          amount: 0,
          amountMin: 1
        };
      } else {
        return {
          price: 0,
          priceMin: 0,
          amount: 0,
          amountMin: 0
        };
      }
    }
  },
  methods: {
    ...mapActions("trading", ["addOrder"]),
    ...mapMutations("trading", ["changeBuySellState"]),
    addOrderHandler(type) {
      const isMarket = type.includes("Market");
      const dealType = type.includes("buy") ? "Buy" : "Sell";

      const isValidate = this.validateRules(type, isMarket, dealType);
      if (!isValidate) return;

      const order = {
        userId: this.getUserId,
        currencyId: this.selectedCurrency.currencyId,
        price: isMarket ? -1 : +this[type].price,
        amount: +this[type].amount,
        dealType,
        expireAfterUTC: "10:00",
        trigger: 0
      };
      this.addOrder(order).then(res => {
        if (res) this.clear(type);
        return res;
      });
    },
    validateRules(type, isMarket, dealType) {
      if (!(+this[type].amount * +this[type].price)) {
        this.$notify({
          type: "error",
          title: `Can't ${dealType}. <br /> Please, provide amount and price`,
          duration: this.notificationDuration
        });
        return;
      }

      if (isMarket && !this.getCurrencyBtcRate) {
        this.$notify({
          type: "error",
          title: `Don't have proposals on market`,
          duration: this.notificationDuration
        });
        this.clear(type);
        return;
      }

      if (!isMarket && this[`total${dealType}`] < this.minBtcTotal) {
        this.$notify({
          type: "error",
          title: `Minimum 0,0001 BTC`,
          duration: this.notificationDuration
        });
        return;
      }

      return true;
    },
    onChangeInput(value, type) {
      this[`onChange${type}`](value);
    },
    onChangeBuyPrice(newValue) {
      if (newValue > this.selectedCurrency.btcAvailable / this.buy.amount) {
        const newVal = this.calculateBigNumber(
          this.selectedCurrency.btcAvailable,
          newValue,
          "divide"
        );
        this.buy.amount = newVal;
      }
    },
    onChangeBuyAmount(newValue) {
      if (newValue > this.selectedCurrency.btcAvailable / this.buy.price) {
        const newVal = this.calculateBigNumber(
          this.selectedCurrency.btcAvailable,
          this.buy.price,
          "divide"
        );
        this.buy.amount = newVal;
      }
    },
    clear(type) {
      if (type.includes("Market")) {
        this[type] = {
          price: -1,
          amount: 0
        };
      } else {
        this[type] = {
          price: 0,
          amount: 0
        };
      }
    }
  }
};
</script>

<style scoped>
.overlay-warning {
  width: 300px;
  top: 38%;
  left: 30%;
  position: relative;
}
.price .buyselltext {
  width: 80px;
  flex: 0 auto;
}
.market-price {
  height: 32px;
}
.market-range {
  margin-bottom: 46px;
}
</style>