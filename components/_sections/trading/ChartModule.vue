<template>
  <div class="module-wrapper">
    <div class="w-tabs">
      <div class="tabs-menu w-tab-menu module-header-grey">
        <div
          v-for="tab in tabs"
          :key="tab.currencyId"
          @click="$emit('selectTab', tab.currencyId)"
          :class="{'w--current': tab.isSelected}"
          class="tab w-inline-block w-tab-link"
        >
          <div class="tab-inner" @click.stop.prevent.right="$emit('removeTab', tab.currencyId)">
            <div @click.stop="$emit('removeTab', tab.currencyId)" class="closetab">x</div>
            <div>{{ tab.currencyShortName }}/BTC</div>
          </div>
        </div>
      </div>
      <div :key="JSON.stringify(selectedCurrency) + theme" class="w-tab-content">
        <div class="w-tab-pane w--tab-active">
          <div class="html-embed w-embed w-script">
            <div class="tradingview-widget-container">
              <trading-view :currency="selectedCurrency" :options="options"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TradingView from "@/components/charting/TVChartContainer";
import { forEach } from "lodash";
import { mapGetters } from "vuex";

export default {
  props: {
    tabs: {
      required: true
    },
    theme: {
      default: "light"
    },
    currentSelectedId: {
      type: [Number, String],
      required: true
    }
  },
  components: {
    TradingView
  },
  data() {
    return {
      selectedCurrency: {
        currencyShortName: "RDDBTC",
        currencyId: 1
      }
    };
  },
  watch: {
    currentSelectedId: {
      handler(newValue, oldValue) {
        if (this.currentSelectedId === 0) return;
        this.selectedCurrency = this.getSelectedCurrencyById(
          this.currentSelectedId
        );
      },
      immediate: true,
      deep: true
    },
    tabs: {
      handler(newValue, oldValue) {
        if (this.currentSelectedId !== 0) return;
        forEach(newValue, ({ currencyShortName, currencyId, isSelected }) => {
          if (isSelected)
            this.selectedCurrency = {
              currencyShortName,
              currencyId
            };
        });
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    ...mapGetters("trading", ["getSelectedCurrencyById"]),
    options() {
      let symbol;

      return {
        autosize: true,
        height: 450,
        container_id: "trade-view",
        library_path: "/charting_library/",
        enabled_features: ["left_toolbar"],
        hide_side_toolbar: false,
        disabled_features: ["header_symbol_search", "timeframes_toolbar"],
        theme: this.theme,
        timezone: "europe/berlin",
        locale: "en",
        debug: false
      };
    },
    selectedIndex() {
      let index;
      this.tabs.forEach((tab, i) => {
        if (tab.isSelected) index = i;
      });
      return index;
    }
  }
};
</script>

<style scoped>
.closetab {
  width: 12px;
  height: 12px;
  top: 3px;
  right: 7px;
}
.tab {
  padding: 0;
  border-radius: 4px;
}
.tab-inner {
  padding: 6px 18px;
}
.tabs-menu {
  min-height: 40px;
  border-bottom: 1px solid rgb(224, 224, 224);
}
.w-tabs,
.w-tab-content,
.w-tab-content div {
  height: 100%;
}
</style>