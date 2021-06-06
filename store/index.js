import Vue from "vue";
import Vuex from "vuex";
import authentication from "./authentication.js";
import profile from "./profile.js";
import wallets from "./wallets.js";
import balances from "./balances.js";
import profits from "./profits.js";
import tradingHistory from "./trading-history.js";
import trading from "./trading.js";
import mining from "./mining.js";
import pooling from "./pooling.js";
import roulette from "./roulette.js";
import home from "./home.js";

Vue.use(Vuex);

const store = () =>
  new Vuex.Store({
    state: () => ({
      user: {
        name: "Sergey Petrov",
        picture: ""
      },
      isLoading: false
    }),
    getters: {},
    mutations: {
      changeLoadingStatus(state, status = false) {
        state.isLoading = status;
      }
    },
    actions: {},
    modules: {
      authentication: {
        namespaced: true,
        ...authentication
      },
      wallets: {
        namespaced: true,
        ...wallets
      },
      balances: {
        namespaced: true,
        ...balances
      },
      profits: {
        namespaced: true,
        ...profits
      },
      tradingHistory: {
        namespaced: true,
        ...tradingHistory
      },
      trading: {
        namespaced: true,
        ...trading
      },
      profile: {
        namespaced: true,
        ...profile
      },
      mining: {
        namespaced: true,
        ...mining
      },
      pooling: {
        namespaced: true,
        ...pooling
      },
      roulette: {
        namespaced: true,
        ...roulette
      },
      home: {
        namespaced: true,
        ...home
      }
    }
  });

export default store;
