export default {
  state: () => ({
    profits: {
      "totalBtc": 0,
      "totalUsd": 0,
      "values": []
    }
  }),
  getters: {},
  mutations: {
    saveClientProfits(state, payload) {
      state.profits = payload;
    }
  },
  actions: {
    async loadClientProfits({ commit }) {
      try {
        const { totalBtc, totalUsd, values } = await this.$axios.$get('/profits/clientProfitsAndPoS');
        const profits = values.map(profit => {
          profit = {
            data: profit
          }
          return profit;
        });

        const payload = {
          totalBtc,
          totalUsd,
          profits
        };
        commit('saveClientProfits', payload);
        return payload;
      } catch (e) {
        console.log('Loading profits error', e);
      }
    }
  }
};
