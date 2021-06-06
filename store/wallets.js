export default {
  state: () => ({
    walletsData: {
      totalBtc: 0,
      values: []
    }
  }),
  getters: {},
  mutations: {
    saveWallets(state, payload) {
      state.walletsData = payload;
    }
  },
  actions: {
    async loadWallets({ commit }) {
      try {
        const wallets = await this.$axios.$get("wallets/clientWallets");
        commit("saveWallets", wallets);
        return wallets;
      } catch (e) {
        console.log("Loading wallets error", e);
      }
    },
    async makeTransfer({ commit }, data) {
      try {
        await this.$axios.$put("wallets/transfer", data);
      } catch (e) {
        console.log("Loading wallets error", e);
      }
    }
  }
};
