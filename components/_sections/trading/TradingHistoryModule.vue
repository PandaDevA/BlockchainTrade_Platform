<template>
  <div class="trading-bottom-module module-wrapper">
    <div class="module-header-grey">
      <div class="module-title">Trade History</div>
    </div>
    <div class="header-exchange">
      <div class="module-subtitle openorders text-left pl-3">
        <div>price(btс)</div>
      </div>
      <div class="module-subtitle openorders text-right pr-3">
        <div>amount [{{ getSelectedCurrency.currencyShortName }}]</div>
      </div>
      <div class="module-subtitle openorders">
        <div>time</div>
      </div>
    </div>
    <div class="module-content scroll">
      <div class="content-transactionshistory">
        <div
          v-for="(order, i) in getTradingHistory"
          :key="'history' + i + JSON.stringify(order)"
          :class="{'grey': i % 2 === 0}"
          class="transactionhistory-item"
        >
          <div class="empty-div text-left pl-1">
            <div
              id="trade-history-price"
              :class="{'text-green': order.dealType === 'Sell', 'text-red': order.dealType === 'Buy'}"
            >{{ scientificToDecimal(order.price) }}</div>
          </div>
          <div class="module-text text-right pr-3">
            <div>{{ scientificToDecimal(toFixedSmall(order.filled, 5)) }}</div>
          </div>
          <div style="max-width: 110px" class="module-text text-center">
            <div>{{ beautifyUTCDate(order.closeDateUTC) }}</div>
          </div>
        </div>
        <div class="no-data" v-if="!getTradingHistory.length">
          <p class="text-center">No history</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import { get } from "lodash";

export default {
  data() {
    return {};
  },
  mounted() {},
  computed: {
    ...mapGetters("trading", ["getTradingHistory", "getSelectedCurrency"])
  },
  methods: {
    beautifyUTCDate(utcDate) {
      if (!utcDate) return;
      return moment(utcDate).format("HH:mm:ss");
    }
  }
};
</script>

<style scoped>
#trade-history-price {
  padding-left: 12px;
}
.green-text {
  text-transform: capitalize;
}
.change-item > div:first-child {
  width: 25%;
}
.change-item > div:nth-child(2) {
  width: 48%;
  text-align: center;
}
.change-item > div:nth-child(3) {
  width: 25%;
}
.change-item .module-text div {
  font-size: 13px;
}
.content-transactionshistory .transactionhistory-item {
  padding: 0;
  align-items: center;
}
</style>