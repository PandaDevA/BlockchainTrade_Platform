<template>
  <div class="dashboard-wrapper-light-notrad responsive-content-wrapper">
    <div class="center vertical">
      <div class="horizontal-wrapper">
        <div class="module-wrapper credits">
          <div class="horizontal-wr">
            <div>
              <input
                v-model="findCoin"
                type="search"
                class="search-field w-input"
                maxlength="256"
                name="query"
                placeholder="Search…"
                id="search"
                autocomplete="off"
              >
            </div>
            <div class="checkbox w-checkbox">
              <input
                v-model="hideZeroBalances"
                type="checkbox"
                id="checkbox"
                name="checkbox"
                data-name="Checkbox"
                class="w-checkbox-input"
              >
              <label for="checkbox" class="checkbox-label w-form-label">Hide Zero Balances</label>
            </div>
            <div>
              <a-button @click="refreshData" color="green" size="medium">
                <i :class="{'loading-tic-toc': refreshingPage }" class="fas fa-sync"></i>
              </a-button>
            </div>
          </div>
        </div>
        <div>
          <div class="module-wrapper empty">
            <div class="module-title">Estimated Value</div>
            <div class="balanceamount">{{ totalBtc || '-' }} BTC / {{ '$' + (totalUsd || '-') }}</div>
          </div>
          <div class="module-wrapper empty">
            <div class="module-title">24h Withdrawal Limit 2BTC</div>
          </div>
        </div>
      </div>
      <div class="wallet-wrapper">
        <balances-table @hideOpened="hideOpened" :is-loading="refreshingPage" :balances="balances"/>
      </div>
    </div>
  </div>
</template>

<script>
import BalancesTable from "@/components/_sections/balances/BalancesTable";
import { get } from "lodash";
import { mapActions, mapGetters } from "vuex";

export default {
  middleware: "authentication",
  layout: "profile",
  head() {
    return {
      title: "Balances | Folex"
    };
  },
  components: {
    BalancesTable
  },
  data() {
    return {
      hideZeroBalances: false,
      refreshingPage: false,
      totalBtc: "",
      totalUsd: "",
      findCoin: "",
      balances: [],
      fullBalances: []
    };
  },
  watch: {
    hideZeroBalances(newValue, oldValue) {
      if (newValue === true) {
        this.balances = this.fullBalances.filter(
          item => +get(item, "data.amountTotal") !== 0
        );
      } else this.balances = this.fullBalances;
    },
    findCoin(newValue, oldValue) {
      if (newValue) {
        this.balances = this.fullBalances.filter(balance => {
          const balanceCoin = balance.data.currencyShortName.toLowerCase();
          const searchPrefix = newValue.toLowerCase();
          return balanceCoin.includes(searchPrefix);
        });
      } else this.balances = this.fullBalances;
    },
    getBalances(newValue, oldValue) {
      this.balances = newValue;
    }
  },
  created() {
    this.refreshData();
  },
  computed: {
    ...mapGetters("balances", ["getBalances"])
  },
  methods: {
    ...mapActions("balances", ["loadClientBalance"]),
    async refreshData() {
      this.refreshingPage = true;
      this.hideZeroBalances = false;
      this.findPair = "";

      try {
        const { balances, totalBtc, totalUsd } = await this.loadClientBalance();
        this.fullBalances = balances;
        this.balances = [...this.fullBalances];
        this.totalBtc = totalBtc.toFixed(8);
        this.totalUsd = totalUsd.toFixed(2);
      } catch (e) {
        console.log("Local loading balances error", e);
      } finally {
        this.refreshingPage = false;
      }
    },
    hideOpened() {
      this.balances = this.balances.map(balance => {
        balance.showDeposit = false;
        balance.showWithdraw = false;
        return balance;
      });
    }
  }
};
</script>

<style scoped>
.center.vertical {
  display: block;
  position: relative;
  top: 7vh;
}
.horizontal-wr div {
  margin-right: 12px;
}
.checkbox-label {
  width: max-content;
}
.loading-tic-toc {
  animation-duration: 1s;
}
.balanceamount {
  width: 200px;
}
</style>