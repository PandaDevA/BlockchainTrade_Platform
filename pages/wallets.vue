<template>
  <div class="dashboard-wrapper-light-wallets responsive-content-wrapper">
    <div class="center vertical light-responsive-content-wrapper">
      <div class="horizontal-wr">
        <div class="module-wrapper balance wallets">
          <div class="module-title balance">Balance Total:</div>
          <div class="balanceamount">{{ totalBtc }}</div>
          <div class="balanceamount coin">BTC</div>
        </div>
        <div class="mx-4 my-1">
          <a-button @click="refreshData" color="green" size="medium">
            <i :class="{'loading-tic-toc': refreshingPage }" class="fas fa-sync"></i>
          </a-button>
        </div>
      </div>

      <div class="wallet-wrapper">
        <div class="module-wrapper-wallet justify-between">
          <div>
            <div class="module-header">
              <div class="module-title">Trading Wallet</div>
            </div>
            <div class="module-title wallet">
              <div class="wallet-subtitle">BTC Assigned:</div>
              <div class="wallet-subtitle">{{ toFixedSmall(trading.btcAssigned) }}</div>
            </div>
            <div class="module-content">
              <div class="content-transactionshistory">
                <div :class="{ 'shake-anim': isShake }" class="transactionhistory-item">
                  <div class="module-text title2 px-0">
                    <div class="pl-4">COIN</div>
                  </div>
                  <div class="module-text title2 pl-0 pr-4">
                    <div class="text-right">AMOUNT</div>
                  </div>
                  <div class="module-text title2 px-0">
                    <div class="pr-4 text-right">BTC VALUE</div>
                  </div>
                </div>
                <div class="transfers scroll">
                  <div
                    @click="selectTransfer(trade, 1)"
                    v-for="(trade, i) in trading.values"
                    :key="trade.pair + i"
                    :class="transferStyles(i, trade.isSelected)"
                    class="transactionhistory-item pointer px-4"
                  >
                    <div class="empty-div">
                      <div class="module-text justify-start value">{{ trade.pair }}</div>
                    </div>
                    <div class="module-text justify-end pl-2 value">
                      <div>{{ toFixedSmall(trade.amount) }}</div>
                    </div>
                    <div class="module-text justify-end value">
                      <div>{{ toFixedSmall(trade.btcValue) }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="module-title wallet remaining">
            <div class="wallet-subtitle">BTC Remaining:</div>
            <div class="wallet-subtitle">{{ toFixedSmall(trading.btcRemaining) }}</div>
          </div>
        </div>
        <a
          @click="makeTransfer"
          class="btn transfer-TP w-button"
          data-ix="transfer-pop-up2-appear"
        >Transfer</a>
        <div class="module-wrapper-wallet2 justify-between">
          <div>
            <div class="module-header">
              <div class="module-title">Pool Wallet</div>
            </div>
            <div class="module-title wallet">
              <div class="wallet-subtitle">BTC Assigned:</div>
              <div class="wallet-subtitle">{{ toFixedSmall(pooling.btcAssigned) }}</div>
            </div>
            <div class="module-content">
              <div class="content-transactionshistory">
                <div class="transactionhistory-item">
                  <div class="module-text title3 px-0">
                    <div class="pl-4">COIN</div>
                  </div>
                  <div class="module-text title3 pl-0 pr-4">
                    <div class="text-right">AMOUNT</div>
                  </div>
                  <div class="module-text title3 px-0">
                    <div class="pr-4 text-right">BTC VALUE</div>
                  </div>
                </div>
                <div class="transfers scroll">
                  <div
                    @click="selectTransfer(pool, 2)"
                    v-for="(pool, i) in pooling.values"
                    :key="pool.pair + i"
                    :class="transferStyles(i, pool.isSelected)"
                    class="transactionhistory-item pointer px-4"
                  >
                    <div class="empty-div">
                      <div class="module-text justify-start value">{{ pool.pair }}</div>
                    </div>
                    <div class="module-text justify-end pl-2 value">
                      <div>{{ toFixedSmall(pool.amount) }}</div>
                    </div>
                    <div class="module-text justify-end value">
                      <div>{{ toFixedSmall(pool.btcValue) }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="module-title wallet remaining">
            <div class="wallet-subtitle">BTC Remaining:</div>
            <div class="wallet-subtitle">{{ toFixedSmall(pooling.btcRemaining) }}</div>
          </div>
        </div>
      </div>
    </div>
    <a-transfer-pop-up
      :key="JSON.stringify(currentTransfer)"
      @clean="clean"
      :transfer="currentTransfer"
      ref="transfer"
    />
  </div>
</template>

<script>
import { clone, isEmpty, find, get } from "lodash";
import ATransferPopUp from "@/components/_shared/ATransferPopUp";
import { mapActions, mapState } from "vuex";

export default {
  middleware: "authentication",
  layout: "profile",
  head() {
    return {
      title: "Wallets | Folex"
    };
  },
  components: {
    ATransferPopUp
  },
  data() {
    return {
      totalBtc: 0,
      // wallets
      wallets: ["trading", "pooling"],
      trading: { values: [] },
      pooling: { values: [] },
      //
      currentTransfer: {},
      isShake: false,
      refreshingPage: true
    };
  },
  mounted() {
    this.refreshData();
  },
  watch: {
    walletsData: {
      handler(newValue, oldValue) {
        this.totalBtc = newValue.totalBtc.toFixed(8) || 0;
        if (get(newValue, "values.length"))
          this.parseWalletsData(newValue.values);
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapState("wallets", ["walletsData"])
  },
  methods: {
    ...mapActions("wallets", ["loadWallets"]),
    makeTransfer() {
      if (isEmpty(this.currentTransfer)) {
        this.isShake = true;
        setTimeout(() => {
          this.isShake = false;
        }, 1000);
        return;
      }
      this.openModal("transfer");
    },
    selectTransfer(transfer, id) {
      const wallet = id === 1 ? "trading" : "pooling";
      if (transfer.amount === 0)
        return this.$notify({
          type: "error",
          title: `Currency has 0 amount`
        });
      if (this.canTransfer(transfer.currencyId, wallet) === 1) {
        this.diselectAll();
        return this.$notify({
          type: "error",
          title: `Transfer min 500FLX first`
        });
      }
      if (this.canTransfer(transfer.currencyId, wallet) === 2) {
        this.diselectAll();
        return this.$notify({
          type: "error",
          title: `Can't transfer FLX <br> Transfer all other coins first`
        });
      }

      this.diselectAll();
      this[wallet].values = this[wallet].values.map(el => {
        if (el.pair === transfer.pair) el.isSelected = true;
        else el.isSelected = false;
        return el;
      });
      this.currentTransfer = clone(transfer);
      this.currentTransfer.amount =
        this.currentTransfer.amount - this.currentTransfer.blockedAmount;
    },
    canTransfer(currencyId, wallet) {
      const flxCurrencyId = 10;
      const isFlx = currencyId === flxCurrencyId;
      const poolingTransfers = get(this.pooling, "values");
      const flxInPooling = find(
        poolingTransfers,
        transfer => transfer.currencyId === flxCurrencyId
      );
      const flxAmount = get(flxInPooling, "amount");

      if (wallet === "trading") {
        const canTransferToPool = isFlx || flxAmount >= 500;
        return canTransferToPool || 1;
      }
      if (wallet === "pooling") {
        const canTransferToTrading = isFlx
          ? get(poolingTransfers, "length") === 1
          : get(poolingTransfers, "length") > 1;
        return canTransferToTrading || 2;
      }
    },
    diselectAll() {
      this.wallets.forEach(wallet => {
        this[wallet].values = this[wallet].values.map(el => {
          el.isSelected = false;
          return el;
        });
      });
    },
    transferStyles(i, isSelected) {
      return [{ grey: i % 2 === 0 }, { "is-selected": isSelected }];
    },
    parseWalletsData(values) {
      this.trading = clone(values[0]);
      this.trading.values = this.trading.values.map(item => ({
        ...item,
        isSelected: false,
        isTrade: true
      }));
      this.pooling = clone(values[1]);
      this.pooling.values = this.pooling.values.map(item => ({
        ...item,
        isSelected: false,
        isTrade: false
      }));
    },
    clean() {
      this.currentTransfer = {};
      this.diselectAll();
    },
    async refreshData() {
      this.refreshingPage = true;

      try {
        await this.loadWallets();
      } catch (e) {
        console.log("Local loading wallets error", e);
      } finally {
        this.refreshingPage = false;
      }
    }
  }
};
</script>

<style scoped>
.scroll {
  height: 380px;
}
.module-wrapper-wallet,
.module-wrapper-wallet2 {
  width: 360px;
}
.dashboard-wrapper-light-wallets {
  justify-content: center;
}
.module-text.title2,
.module-text.title3 {
  padding-left: 16px;
  text-align: left;
}
.is-selected {
  background: #aeb6da;
}
.loading-tic-toc {
  animation-duration: 1s;
}
</style>