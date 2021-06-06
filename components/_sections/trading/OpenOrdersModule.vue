<template>
  <div class="trading-bottom-module module-wrapper">
    <div class="module-header-grey">
      <div class="module-title">Open Orders</div>
    </div>
    <div class="header-exchange">
      <div class="module-subtitle text-left pl-2 openorders">
        <div>coin</div>
      </div>
      <div class="module-subtitle text-left openorders">
        <div>price(btc)</div>
      </div>
      <div class="module-subtitle text-right openorders">
        <div>amount</div>
      </div>
      <div class="module-subtitle text-right pr-4 openorders">
        <div></div>
      </div>
    </div>
    <div class="module-content">
      <div
        v-for="(order, i) in getOpenOrders"
        :key="i"
        :class="{'grey': i % 2 === 0}"
        class="change-item space"
      >
        <div
          :class="{'green-text': order.dealType === 'Buy', 'red-text': order.dealType !== 'Buy'}"
          class="module-text text-left pl-2"
        >
          <div>
            <fa
              v-if="order.isTriggered"
              style="margin-left: -16px;"
              :icon="order.isTakeProfitTrigger ? 'arrow-up' : 'arrow-down'"
            />
            {{ order.currencyShortName }}
          </div>
        </div>
        <div class="module-text text-left">
          <div>{{ scientificToDecimal(order.price) }}</div>
        </div>
        <div class="module-text text-right pr-2">
          <div>{{ scientificToDecimal(order.amount) | maxThreeDecimals }}</div>
        </div>
        <div class="module-text d-flex-end mr-2">
          <div @click="cancelOrder(order)" class="btn-cancel-order">Cancel</div>
        </div>
      </div>
      <div class="no-data" v-if="!getOpenOrders.length">
        <p class="text-center">No open orders</p>
      </div>
    </div>
  </div>
</template>

<script>
import { get, cloneDeep } from "lodash";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  mounted() {},
  computed: {
    ...mapGetters("trading", ["getOpenOrders"])
  },
  methods: {
    ...mapActions("trading", ["cancelOrder"])
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
</style>