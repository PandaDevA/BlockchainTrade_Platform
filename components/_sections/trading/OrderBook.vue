<template>
  <div class="module-wrapper">
    <div class="module-header-grey">
      <div class="module-title">Orderbook</div>
    </div>
    <div class="header-exchange">
      <div class="module-subtitle openorders text-left pl-3">
        <div>price(btс)</div>
      </div>
      <div class="module-subtitle openorders text-right">
        <div>amount [{{ getSelectedCurrency.currencyShortName }}]</div>
      </div>
      <div class="module-subtitle openorders text-right pr-3">
        <div>total [{{ getSelectedCurrency.currencyShortName }}]</div>
      </div>
    </div>
    <div v-if="!isEmptyLists" id="order-content" class="module-content">
      <div class="red-wrapper">
        <div
          v-for="(order, i) in sellList"
          :key="i + JSON.stringify(order) + order.dealType"
          :class="{'grey': i % 2 === 1}"
          class="change-item space red-block"
        >
          <div :style="getRowStyles(maxFiller, order.total)" class="progress-fill filler-red"></div>
          <div
            @click="localPrefillBuySellModule({ price: order.price})"
            class="module-text text-left pl-3"
          >
            <div>{{ scientificToDecimal(order.price) }}</div>
          </div>
          <div
            @click="localPrefillBuySellModule({ amount: order.amount})"
            class="module-text text-right"
          >
            <div>{{ toFixedSmall(scientificToDecimal(order.amount)) }}</div>
          </div>
          <div class="module-text text-right pr-4">
            <div>{{ scientificToDecimal(order.total) | maxThreeDecimals }}</div>
          </div>
        </div>
      </div>
      <div class="last-price-wrapper" :class="{'down': getCurrencyRateStatus}">
        <span class="last-price">{{ scientificToDecimal(getCurrencyBtcRate) }}</span>
        <fa class="last-price-arrow" :icon="getCurrencyRateStatus ? 'arrow-down' : 'arrow-up'"/>
      </div>
      <div class="green-wrapper">
        <div
          v-for="(order, i) in buyList"
          :key="i + JSON.stringify(order) + order.dealType"
          :class="{'grey': i % 2 === 0}"
          class="change-item space green-block"
        >
          <div :style="getRowStyles(maxFiller, order.total)" class="progress-fill filler-green"></div>
          <div
            @click="localPrefillBuySellModule({ price: order.price, amount: 0})"
            class="module-text text-left pl-3"
          >
            <div>{{ scientificToDecimal(order.price) }}</div>
          </div>
          <div
            @click="localPrefillBuySellModule({ amount: order.amount})"
            class="module-text text-right"
          >
            <div>{{ toFixedSmall(scientificToDecimal(order.amount)) }}</div>
          </div>
          <div class="module-text text-right pr-4">
            <div>{{ scientificToDecimal(order.total) | maxThreeDecimals }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="module-content no-data">
      <p class="text-center">No orders</p>
    </div>
  </div>
</template>

<script>
import { get, maxBy, isEmpty, pick, clone, filter } from "lodash";
import { mapGetters, mapMutations } from "vuex";
import roundTo from "round-to";

export default {
  data() {
    return {
      maxRowWidth: 290,
      lastPrice: 0,
      previousLastPrice: 0,
      maxFiller: 0,
      buySellMaxAmount: 12,
      sellList: [],
      buyList: [],
      round: 8
    };
  },
  watch: {
    getTradingOrders: {
      handler(newOrders, oldOrders) {
        this.populateOrders(newOrders);
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    ...mapGetters("trading", [
      "getTradingOrders",
      "getSelectedCurrency",
      "getCurrencyBtcRate",
      "getCurrencyRateStatus"
    ]),
    isEmptyLists() {
      return isEmpty(this.sellList) && isEmpty(this.buyList);
    }
  },
  methods: {
    ...mapMutations("trading", ["changeBuySellState", "prefillBuySellModule"]),
    localPrefillBuySellModule(payload) {
      // this.changeBuySellState(isBuy);
      this.prefillBuySellModule(payload);
    },
    populateOrders(orders) {
      this.maxFiller = 0;
      this.createSellArray(orders);
      this.createBuyArray(orders);
    },
    createSellArray(orders) {
      let sellList = filter(orders, order => order.dealType === "Sell");
      sellList = [...sellList]
        .sort((a, b) => a.price - b.price)
        .slice(0, this.buySellMaxAmount);
      sellList = this.populateTotal(sellList).reverse();
      if (sellList.length) this.maxFiller = this.getMaxTotalFromArray(sellList);
      this.sellList = sellList;
    },
    createBuyArray(orders) {
      let buyList = filter(orders, order => order.dealType === "Buy");
      buyList = [...buyList]
        .sort((a, b) => b.price - a.price)
        .slice(0, this.buySellMaxAmount);
      buyList = this.populateTotal(buyList);
      if (buyList.length) this.maxFiller = this.getMaxTotalFromArray(buyList);
      this.buyList = buyList;
    },
    populateTotal(list) {
      return list.map((order, i) => {
        if (i === 0) {
          order.total = roundTo.up(+order.amount, this.round);
        } else {
          order.total =
            roundTo.up(+order.amount, this.round) + list[i - 1].total;
        }
        order.total = roundTo.up(+order.total, this.round);

        return order;
      });
    },
    getMaxTotalFromArray(array) {
      const maxFiller = maxBy(array, "total");
      return this.maxFiller >= maxFiller.total
        ? this.maxFiller
        : maxFiller.total;
    },
    getRowFillerWidth(maxAmount, amount) {
      return (
        (((this.maxRowWidth / maxAmount) * amount) / this.maxRowWidth) * 100
      );
    },
    getRowStyles(maxAmount, amount) {
      return {
        width: `${this.getRowFillerWidth(maxAmount, amount)}%`
      };
    }
  }
};
</script>

<style>
#order-content {
  height: 100%;
  overflow: hidden;
  padding: 0px 5px;
}
#order-content .progress-fill {
  transition: background-color 1s ease;
}
#order-content .change-item {
  position: relative;
  cursor: pointer;
}
#order-content .change-item:hover {
  background-color: #aeb6da !important;
}
#order-content .change-item:hover .filler-green,
#order-content .change-item:hover .filler-red {
  opacity: 0;
}
.last-price-wrapper {
  width: 290px;
  text-align: center;
  position: relative;
  z-index: 10;
  padding: 10px;
  padding-left: 40px;
  display: flex;
  justify-content: center;
  font-size: 18px;
  color: #009e0d;
}
.last-price {
  margin-right: 8px;
}
.last-price-wrapper.down {
  color: #e64f56;
}

.red-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.red-wrapper,
.green-wrapper {
  height: 192px;
}
.last-price-wrapper,
.green-block {
  top: 0px;
}
.red-block {
  position: absolute;
  margin-top: 90px;
}
.filler-wrapper {
  position: absolute;
  z-index: 1;
  width: 282px;
  overflow: hidden;
}
.progress-fill {
  pointer-events: none;

  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
}
.filler-wrapper,
.progress-fill {
  width: 290px;
  height: 15px;
}
.filler-green {
  background-color: rgba(0, 128, 0, 0.24);
}
.filler-red {
  background-color: rgba(255, 0, 0, 0.24);
}
</style>