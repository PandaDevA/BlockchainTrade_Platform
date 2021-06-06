<template>
  <div class="module-wrapper">
    <div class="module-header-grey">
      <div class="module-title">BTC</div>
    </div>
    <div class="header-exchange px-3">
      <div class="module-subtitle left text-left">
        <div>coin</div>
      </div>
      <div class="module-subtitle left text-left">
        <div>price</div>
      </div>
      <div class="module-subtitle right text-right">
        <div>change</div>
      </div>
      <div class="module-subtitle right text-right">
        <div>volume</div>
      </div>
    </div>
    <div class="module-content">
      <div class="content-transactionshistory">
        <div
          v-for="(rate, i) in getCurrencyRates"
          @click="handleClick($event, rate.currencyId)"
          :key="i"
          :class="{'grey': i % 2 === 0, 'bg-orange': currentSelectedId === rate.currencyId }"
          class="change-item pointer px-2"
        >
          <div class="module-text text-left">
            <div>{{ rate.currencyShortName }}</div>
          </div>
          <div class="module-text text-left">
            <div>{{ scientificToDecimal(rate.btcRate) }}</div>
          </div>
          <div class="module-text text-right">
            <div
              :class="{'text-green': +rate.dynamicRate >= 0, 'text-red': +rate.dynamicRate < 0 }"
              class="change"
            >{{ rate.dynamicRate.toFixed(2) || 0 }}%</div>
          </div>
          <div class="module-text text-right">
            <div>{{ rate.volume.toFixed(3) }}</div>
          </div>
        </div>
        <div class="no-data" v-if="!getCurrencyRates.length">
          <p class="text-center">No data</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, cloneDeep } from "lodash";
import { mapGetters } from "vuex";

export default {
  props: {
    currentSelectedId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      clickCount: 0,
      clickTimer: null
    };
  },
  mounted() {},
  watch: {
    currentSelectedId(newValue, oldValue) {
      this.selected = newValue;
    }
  },
  computed: {
    ...mapGetters("trading", ["getCurrencyRates"])
  },
  methods: {
    handleClick(e, currencyId) {
      e.preventDefault();

      this.clickCount++;

      if (this.clickCount === 1) {
        this.clickTimer = setTimeout(() => {
          this.clickCount = 0;
          this.$emit("selectCurrencyRaw", currencyId);
        }, 350);
      } else if (this.clickCount === 2) {
        clearTimeout(this.clickTimer);
        this.clickCount = 0;
        this.$emit("addTab", currencyId);
      }
    }
  }
};
</script>

<style scoped>
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
.content-transactionshistory .change-item:hover {
  background-color: #aeb6da;
}
</style>