import { isEmpty } from "lodash";

export default {
  state: () => ({
    initialState: {
      flxBalance: 0,
      table: []
    },
    hubConnection: null
  }),
  getters: {
    getConnection(state) {
      return state.hubConnection;
    },
    getGameData(state) {
      return state.initialState.table;
    },
    getBalance(state) {
      return state.initialState.flxBalance;
    }
  },
  mutations: {
    setConnection(state) {
      const hubUrl = this.$axios.defaults.baseURL + "/gamble/hub/";
      state.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl)
        .configureLogging(signalR.LogLevel.Information)
        .build();
    },
    saveInitialState(state, payload) {
      state.initialState = payload;
    },
    addGameRecord(state, record) {
      state.initialState.table = [record, ...state.initialState.table];
    }
  },
  actions: {
    loadTradingState({ commit }) {
      return this.$axios
        .$get(`/gamble/table`)
        .then(res => {
          commit("saveInitialState", res);
          return res;
        })
        .catch(console.log);
    },
    runSocketConnection({ getters, commit }) {
      let hubConnection = getters.getConnection;
      if (hubConnection) hubConnection.stop();

      commit("setConnection");
      hubConnection = getters.getConnection;

      hubConnection.on("UpdatedTable", function(event) {
        if (isEmpty(event)) return;
        commit("addGameRecord", event);
      });

      hubConnection.serverTimeoutInMilliseconds = 60000;
      hubConnection.start();
    },
    async saveGame({ commit }, data) {
      try {
        const resp = await this.$axios.$post(`/gamble/spin`, data);
        return resp;
      } catch (e) {
        console.log("Error on save game", e);
      }
    }
  }
};
