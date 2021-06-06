<template>
  <div class="dashboard-wrapper-light-profits responsive-content-wrapper">
    <div class="center full-height-page-wrapper">
      <div class="d-flex align-items-center">
        <div class="module-wrapper balance">
          <div class="module-title balance">BTC Value:</div>
          <div class="balanceamount">{{ totalBtc || '-' }} BTC / {{ '$' + (totalUsd || '-') }}</div>
        </div>
        <div>
          <a-button
            @click="refreshData"
            color="green"
            size="medium"
            :css="{ marginLeft: '12px', marginBottom: '12px'}"
          >
            <i :class="{'loading-tic-toc': refreshingPage }" class="fas fa-sync"></i>
          </a-button>
        </div>
      </div>
      <div class="wallet-wrapper">
        <profits-table :is-loading="refreshingPage" :profits="profits"/>
      </div>
    </div>
  </div>
</template>
<script>
import ProfitsTable from "@/components/_sections/profits/ProfitsTable";

import { get } from "lodash";
import { mapActions } from "vuex";

export default {
  middleware: "authentication",
  layout: "profile",
   head () {
    return {
      title: 'Profits | Folex'
    }
  },
  components: {
    ProfitsTable
  },
  data() {
    return {
      profits: [],
      fullProfits: [],
      totalBtc: "",
      totalUsd: "",
      refreshingPage: false,
      refreshDataIntervalId: null
    };
  },
  created() {
    this.loadData();
    this.refreshData();
  },
  methods: {
    ...mapActions("profits", ["loadClientProfits"]),
    async loadData() {
      this.refreshingPage = true;

      try {
        const { profits, totalBtc, totalUsd } = await this.loadClientProfits();
        this.fullProfits = profits;
        this.profits = [...this.fullProfits];
        this.totalBtc = totalBtc.toFixed(8);
        this.totalUsd = totalUsd.toFixed(2);
      } catch (e) {
        console.log("Local loading balances error", e);
      } finally {
        this.refreshingPage = false;
      }
    },
    refreshData() {
      if (this.refreshDataIntervalId) clearInterval(this.refreshDataIntervalId);
      this.refreshDataIntervalId = setInterval(() => {
        this.loadData();
      }, 30000);
    }
  },
  beforeDestroy() {
    clearInterval(this.refreshDataIntervalId);
  }
};
</script>

<style scoped>
</style>