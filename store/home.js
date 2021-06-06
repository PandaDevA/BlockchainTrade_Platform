export default {
  state: () => ({
    lastUpdates: []
  }),
  getters: {},
  mutations: {
    saveLastUpdates(state, payload) {
      state.lastUpdates = payload;
    }
  },
  actions: {
    async loadLastUpdates({ commit }) {
      try {
        const data = await this.$axios.$get("/home");
        commit("saveLastUpdates", data);
        return data;
      } catch (e) {
        console.log("Loading last updates error", e);
      }
    }
  }
};
