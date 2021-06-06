<template>
  <section :class="{ 'bg-dark': theme === 'dark'}">
    <stop-limit-modal :theme="theme" :is-open="isStopLimit" @close="isStopLimit = false"/>
    <div id="banner-info" class="w-100 uppercase text-center">
      <h2>FLX sto live: Buy FLX from the order book now, 100% of trading fees get shared to all token holders. Kyc required.</h2>
    </div>
    <div
      :class="{'dashboard-wrapper-light': theme === 'light', 'dashboard-wrapper-dark': theme === 'dark'}"
      class="main-content-wrapper"
      style="height: 100%; padding-top: 86px;"
    >
      <div id="trading-first" class="side-column">
        <btc-module
          :current-selected-id="currentSelectedId"
          @addTab="addTab"
          @selectCurrencyRaw="selectCurrencyRaw"
        />
        <open-orders-module/>
      </div>
      <div class="center">
        <chart-module
          id="trading-chart"
          :theme="theme"
          :tabs="tabs"
          :current-selected-id="currentSelectedId"
          @removeTab="removeTab"
          @selectTab="selectTab"
        />
        <buy-sell-module id="buy-sell" @stopLimit="stopLimit"/>
      </div>
      <div id="trading-second" class="side-column">
        <trading-history-module/>
        <order-book/>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import { get, map, filter, forEach, find } from "lodash";
import StopLimitModal from "@/components/_sections/trading/StopLimitModal";
import BtcModule from "@/components/_sections/trading/BtcModule";
import OpenOrdersModule from "@/components/_sections/trading/OpenOrdersModule";
import TradingHistoryModule from "@/components/_sections/trading/TradingHistoryModule";
import ChartModule from "@/components/_sections/trading/ChartModule";
import OrderBook from "@/components/_sections/trading/OrderBook";
import BuySellModule from "@/components/_sections/trading/BuySellModule";

export default {
  middleware: "authentication",
  layout: "profile",
  head() {
    return {
      title: "Trading | Folex"
    };
  },
  components: {
    StopLimitModal,
    BtcModule,
    OpenOrdersModule,
    TradingHistoryModule,
    ChartModule,
    OrderBook,
    BuySellModule
  },
  data() {
    return {
      tabs: [],
      rates: [],
      tradingHistory: [],
      orders: [],
      tabsMaxAmount: 10,
      isStopLimit: false,
      currentSelectedId: 0
    };
  },
  created() {
    this.toggleThemeSwitch(true);
    this.runSocketConnection();

    try {
      this.tabs = localStorage.getItem("tabs")
        ? JSON.parse(localStorage.getItem("tabs"))
        : [];
    } catch (e) {
      console.log(e);
    }

    const currencyId = this.$route.query.currencyId;
    const lastSelectedCurrencyId = localStorage.getItem(
      "lastSelectedCurrencyId"
    );

    if (currencyId) {
      this.localLoadTradingState(currencyId);
      this.diselectAllTabs();
    } else if (lastSelectedCurrencyId) {
      this.localLoadTradingState(lastSelectedCurrencyId);
      this.diselectAllTabs();
    } else if (this.tabs.length)
      this.localLoadTradingState(this.currentSelectedTabId);
    else this.localLoadTradingState(1);
  },
  computed: {
    ...mapState("profile", ["theme"]),
    currentSelectedTabId() {
      const currentSelected = this.tabs.find(tab => tab.isSelected === true);
      return get(currentSelected, "currencyId");
    }
  },
  methods: {
    ...mapMutations("profile", ["toggleThemeSwitch"]),
    ...mapActions("trading", ["loadTradingState", "runSocketConnection"]),

    // Trading
    localLoadTradingState(id, saveSelectedRow = true) {
      id = +id;
      this.loadTradingState(id).then(res => {
        if (!res) return;
        this.rates = res.currencies;
        this.currentSelectedId = saveSelectedRow ? id : 0;
      });
    },

    // Stop limit
    stopLimit() {
      this.isStopLimit = true;
    },

    // Tabs
    removeTab(id) {
      if (this.tabs.length === 1) {
        if (id === 0) this.localLoadTradingState(1);
        this.tabs = [];
        localStorage.removeItem("tabs");
        return;
      }

      const isSelected = this.isSelectNext(id);
      this.tabs = filter(this.tabs, tab => tab.currencyId !== id);
      if (this.tabs.length === 1) {
        this.tabs = map(this.tabs, tab => {
          tab.isSelected = true;
          return tab;
        });
      }
      if (isSelected) {
        this.tabs = map(this.tabs, (tab, i) => {
          tab.isSelected = i === 0;
          return tab;
        });
      }

      this.localLoadTradingState(id);
      localStorage.setItem("tabs", JSON.stringify(this.tabs));
    },
    addTab(currencyId) {
      this.localLoadTradingState(currencyId);
      const isFilled = get(this.tabs, "length") === this.tabsMaxAmount;
      const isAdded = this.tabs.some(tab => {
        return tab.currencyId === currencyId;
      });
      if (isFilled || isAdded) return;
      if (this.tabs.length) this.diselectAllTabs();
      const newTab = {
        currencyShortName: this.getCurrencyShortNameById(currencyId),
        currencyId,
        isSelected: true
      };
      this.tabs = [...this.tabs, newTab];
      localStorage.setItem("tabs", JSON.stringify(this.tabs));
    },
    selectTab(id) {
      this.localLoadTradingState(id, false);
      this.currentSelectedId = 0;
      this.tabs = map(this.tabs, tab => {
        tab.isSelected = tab.currencyId === id;
        return tab;
      });
      localStorage.removeItem("lastSelectedCurrencyId");
      localStorage.setItem("tabs", JSON.stringify(this.tabs));
    },
    selectCurrencyRaw(id) {
      this.localLoadTradingState(id);
      this.currentSelectedId = id;
      localStorage.setItem("lastSelectedCurrencyId", id);
      this.tabs = map(this.tabs, tab => {
        tab.isSelected = false;
        return tab;
      });
      localStorage.setItem("tabs", JSON.stringify(this.tabs));
    },
    diselectAllTabs() {
      this.tabs = map(this.tabs, tab => {
        tab.isSelected = false;
        return tab;
      });
    },
    isSelectNext(id) {
      let selectNext = false;
      forEach(this.tabs, tab => {
        if (tab.currencyId === id && tab.isSelected) {
          selectNext = true;
        }
      });
      return selectNext;
    },
    getCurrencyShortNameById(id) {
      const currency = find(this.rates, rate => rate.currencyId === id);
      return get(currency, "currencyShortName");
    }
  },
  beforeDestroy() {
    this.toggleThemeSwitch(false);
  }
};
</script>

<style scoped>
#banner-info {
  position: fixed;
  top: 50px;
  width: 100%;
  background-color: #bfbfbf;
  color: #dc6c77;
  z-index: 3;
}
#banner-info h2 {
  font-size: 22px;
  font-weight: 700;
  line-height: 32px;
  margin: 6px 0;
}

.dashboard-wrapper-dark,
.dashboard-wrapper-light {
  display: flex;
  margin: 0 auto;
}
.dashboard-wrapper-light .side-column,
.dashboard-wrapper-dark .side-column {
  width: 25%;
}
.center .buysell {
  width: 100% !important;
}
.center > div:last-child {
  min-height: 288px;
}

#trading-chart {
  height: 500px;
}

#trading-first,
#trading-second {
  min-width: 300px;
}
#trading-first > div:first-child,
#trading-chart,
#trading-second > div:last-child {
  margin-bottom: 20px;
  min-height: 500px;
  max-height: 500px;
}
#trading-first > div:last-child,
#buy-sell,
#trading-second > div:first-child {
  margin-bottom: 20px;
  min-height: 310px;
  max-height: 310px;
}
</style>