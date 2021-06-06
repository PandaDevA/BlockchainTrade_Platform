import { find, get, map } from "lodash";

export default {
  state: () => ({
    poolingList: []
  }),
  getters: {
    getCurrentActivePool(state) {
      return find(state.poolingList, el => el.isActive === true);
    }
  },
  mutations: {
    savePooling(state, payload) {
      const pooling = map(payload, (pool, i) => {
        pool.isActive = i === 0;
        return pool;
      });
      state.poolingList = pooling;
    },
    updatePool(state, { id, data }) {
      const newPooling = map(state.poolingList, pool => {
        if (pool.id !== id) return pool;
        pool = {
          ...pool,
          ...data
        };
        return pool;
      });
      state.poolingList = newPooling;
    }
  },
  actions: {
    async loadPooling({ commit }) {
      try {
        const data = await this.$axios.$get(`pooling/list`);
        commit("savePooling", data);
        return true;
      } catch (e) {
        console.log("Loading pooling list error", e);
      }
    },
    async payOut({ getters, commit }) {
      try {
        const id = get(getters.getCurrentActivePool, "id");
        const data = await this.$axios.$post(`pooling/payout/${id}`);
        commit("updatePool", { id, data });
        return true;
      } catch (e) {
        console.log("Loading pooling list error", e);
      }
    },
    async invest({ getters, commit }, investModel) {
      try {
        const data = await this.$axios.$post(`pooling/pool`, investModel);
        commit("updatePool", { id: data.id, data });
        return true;
      } catch (e) {
        console.log("Loading pooling list error", e);
      }
    }
  }
};
