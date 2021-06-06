<template>
  <div class="module-wrapper">
    <div class="module-header">
      <div class="module-title">Trading History</div>
    </div>
    <div class="module-content">
      <div class="content-transactionshistory">
        <div class="transactionhistory-item full px-4">
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
          <div v-if="isNoHistory" class="transactionhistory-item trading-history empty">
            <p>No history</p>
          </div>
          <div v-else-if="isLoading" class="transactionhistory-item trading-history empty">
            <a-spinner/>
          </div>
          <div
            v-else
            v-for="(history, i) in histories"
            :key="JSON.stringify(history) + i"
            class="transactionhistory-item trading-history px-4"
            :class="{grey: i % 2 === 1 }"
          >
            <div class="trading-history-info">
              <div class="module-text text-left">
                <div>{{ getHumanDate(history.dealDataUTC) }}</div>
              </div>
              <div class="module-text text-left">
                <div>{{ history.pair }}</div>
              </div>
              <div
                :class="{ 'text-red': history.dealType === 'Sell', 'text-green': history.dealType === 'Buy' }"
                class="module-text uppercase text-left"
              >
                <div>{{ history.dealType }}</div>
              </div>
              <div class="module-text text-right">
                <div>{{ scientificToDecimal(toFixedSmall(history.price)) }}</div>
              </div>
              <div class="module-text text-right">
                <div>{{ scientificToDecimal(toFixedSmall(history.filled)) }}</div>
              </div>
              <div class="module-text text-right">
                <div>{{ history.dealType === 'Sell' ? scientificToDecimal(toFixedSmall(history.btcFee)) : scientificToDecimal(toFixedSmall(history.fee)) }} [{{ history.dealType === 'Sell' ? 'BTC': history.pair }}]</div>
              </div>
              <div class="module-text text-right">
                <div>{{ history.dealType === 'Sell' ? scientificToDecimal(toFixedSmall(history.totalAmountBTC)) : scientificToDecimal(toFixedSmall(history.totalAmount)) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isEmpty } from "lodash";
import moment from "moment";

export default {
  props: {
    histories: {
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
      headers: ["date", "coin", "type", "price", "amount", "fee", "total"]
    };
  },
  computed: {
    isNoHistory() {
      return isEmpty(this.histories) && !this.isLoading;
    }
  },
  methods: {
    resetNewWithdraw() {
      this.newWithdraw = {
        destinationAddress: "",
        coinTag: "",
        amount: 0,
        transactionFee: 0
      };
    },
    getHumanDate(date) {
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    isNumericJustify(header) {
      const numericHeaders = ["price", "amount", "fee", "total"];
      if (numericHeaders.includes(header))
        return { justifyContent: "flex-end", "text-align": "right" };

      return { justifyContent: "flex-start", "text-align": "left" };
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
.transactionhistory-item.trading-history {
  flex-wrap: wrap;
  padding-top: 5px;
  padding-bottom: 5px;
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
.module-content .table-body {
  overflow-y: auto;
  height: 100%;
}
.trading-history-info {
  width: 100%;
  display: flex;
}
.transactionhistory-item.full {
  max-height: 50px;
}
</style>