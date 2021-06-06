<template>
  <div class="module-wrapper">
    <div class="module-header">
      <div class="module-title">Profits & PoS</div>
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
          <div v-if="isNoProfits" class="transactionhistory-item profits empty">
            <p>No Profits & PoS</p>
          </div>
          <div v-else-if="isLoading" class="transactionhistory-item balances empty">
            <a-spinner/>
          </div>
          <div
            v-else
            v-for="(profit, i) in profits"
            :key="JSON.stringify(profit) + i"
            class="transactionhistory-item profits pl-4"
            :class="{grey: i % 2 === 1 }"
          >
            <div class="profit-info">
              <div class="module-text text-left">
                <div>{{ profit.data.currencyShortName }}</div>
              </div>
              <div class="module-text text-left">
                <div>{{ profit.data.currencyName }}</div>
              </div>
              <div class="module-text text-right">
                <div>{{ scientificToDecimal(toFixedSmall(profit.data.amountTotal)) }}</div>
              </div>
              <div class="module-text text-right">
                <div>{{ scientificToDecimal(toFixedSmall(profit.data.entryPrice)) }}</div>
              </div>
              <div class="module-text text-right">
                <div>{{ scientificToDecimal(toFixedSmall(profit.data.marketPrice)) }}</div>
              </div>
              <div class="module-text text-right">
                <div>{{ scientificToDecimal(toFixedSmall(profit.data.amountBtc)) }}</div>
              </div>
              <div class="module-text text-right">
                <div
                  :class="{ negative: profit.data.profit < 0 }"
                  class="green-text"
                >{{ profitStyled(profit.data.profit) }}</div>
              </div>
              <div class="module-text switch">
                <button
                  @click="sell(profit)"
                  :disabled="profit.data.currencyId == 12"
                  class="btn-cancel-order sell-button make-disabled"
                >SELL</button>
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

export default {
  props: {
    profits: {
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
        "value",
        "entry price",
        "market price",
        "BTC VALUE",
        "profit",
        "close position"
      ]
    };
  },
  computed: {
    isNoProfits() {
      return isEmpty(this.profits) && !this.isLoading;
    }
  },
  methods: {
    profitStyled(profit) {
      const sign = profit > 0 ? "+" : "";
      return (
        sign +
        this.scientificToDecimal(
          this.toFixedSmall(Math.floor(profit * 100) / 100)
        ) +
        "%"
      );
    },
    sell(profit) {
      this.$router.push({
        path: "trading",
        query: { currencyId: profit.data.currencyId, sell: true }
      });
    },
    isNumericJustify(header) {
      const numericHeaders = [
        "value",
        "entry price",
        "market price",
        "BTC VALUE",
        "profit"
      ];

      if (header === "close position") return;

      if (numericHeaders.includes(header))
        return { justifyContent: "flex-end", "text-align": "right" };

      return { justifyContent: "flex-start", "text-align": "left" };
    }
  }
};
</script>

<style scoped>
.sell-button {
  height: 15px;
}
.wallet-wrapper,
.module-wrapper {
  max-height: 65vh;
}
.module-content .module-text {
  align-items: center;
}
.transactionhistory-item.profits {
  padding-top: 5px;
  padding-bottom: 5px;
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
.module-content .table-body {
  overflow-y: auto;
  height: 100%;
}
.profit-info {
  width: 100%;
  display: flex;
}
.transactionhistory-item.full {
  max-height: 50px;
}
</style>