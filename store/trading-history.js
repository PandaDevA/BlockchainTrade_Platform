export default {
  state: () => ({
    histories: {
      values: []
    }
  }),
  getters: {},
  mutations: {
    saveTradingHistory(state, payload) {
      state.histories = payload;
    }
  },
  actions: {
    async loadTradingHistory({ commit }) {
      try {
        const histories = await this.$axios.$get("/tradingHistory/history");
        commit("saveTradingHistory", histories.reverse());
        return histories;
      } catch (e) {
        console.log("Loading trading history error", e);
      }
    }
  }
};
