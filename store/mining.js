export default {
  state: () => ({
    miningState: {
      myRankingInfo: {
        dailyLeague: 0,
        dailyRanking: 0,
        dailyPoints: 0,
        lastWeekRanking: 0,
        lastWeekReward: 0,
        totalReward: 0
      },
      weeklyRanking: {
        page: 0,
        next: 0,
        league: 0,
        items: []
      },
      rewardHistory: {
        page: 0,
        next: 0,
        league: 0,
        items: []
      },
      myReward: {
        page: 0,
        next: 0,
        items: []
      }
    },
    weekly: 50,
    history: 50,
    reward: 25
  }),
  getters: {
    getCurrentPage(state) {
      const weekly = state.miningState.weeklyRanking.page;
      const history = state.miningState.rewardHistory.page;
      const reward = state.miningState.myReward.page;
      return {
        weekly,
        history,
        reward
      };
    },
    getAmount(state) {
      const { weekly, history, reward } = state;
      return {
        weekly,
        history,
        reward
      };
    },
    getLeague(state) {
      const weekly = state.miningState.weeklyRanking.league;
      const history = state.miningState.rewardHistory.league;
      return {
        weekly,
        history
      };
    }
  },
  mutations: {
    saveState(state, payload) {
      state.miningState = payload;
    },
    saveWeeklyRanking(state, payload) {
      state.miningState.weeklyRanking = payload;
    },
    saveRewardHistory(state, payload) {
      state.miningState.rewardHistory = payload;
    },
    saveMyReward(state, payload) {
      state.miningState.myReward = payload;
    }
  },
  actions: {
    async loadState({ getters, commit }) {
      try {
        const { weekly, history, reward } = getters.getAmount;
        const state = await this.$axios.$get(
          `mining?weekly=${weekly}&history=${history}&reward=${reward}`
        );
        commit("saveState", state);
        return state;
      } catch (e) {
        console.log("Loading mining state error", e);
      }
    },
    async loadWeeklyRanking({ getters, commit }, { league, isMore }) {
      try {
        league = league || getters.getLeague.weekly;
        const amount = getters.getAmount.weekly;
        const currentPage = getters.getCurrentPage.weekly;
        const page =
          isMore === false ? currentPage - 1 : isMore ? currentPage + 1 : 1;
        const response = await this.$axios.$get(
          `mining/weekly?page=${page}&amount=${amount}&league=${league}`
        );
        commit("saveWeeklyRanking", response);
        return response;
      } catch (e) {
        console.log("Loading weekly ranking error", e);
      }
    },
    async loadRewardHistory({ getters, commit }, { league, isMore, date }) {
      try {
        league = league || getters.getLeague.history;
        const amount = getters.getAmount.history;
        const dateQuery = date ? `&dateUNIXSeconds=${date}` : "";
        const currentPage = getters.getCurrentPage.history;
        const page =
          isMore === false ? currentPage - 1 : isMore ? currentPage + 1 : 1;
        const response = await this.$axios.$get(
          `mining/history?page=${page}&amount=${amount}&league=${league}${dateQuery}`
        );
        commit("saveRewardHistory", response);
        return response;
      } catch (e) {
        console.log("Loading reward history error", e);
      }
    },
    async loadMyReward({ getters, commit }, { isMore }) {
      try {
        const amount = getters.getAmount.reward;
        const currentPage = getters.getCurrentPage.reward;
        const page =
          isMore === false ? currentPage - 1 : isMore ? currentPage + 1 : 1;
        const response = await this.$axios.$get(
          `mining/reward?page=${page}&amount=${amount}`
        );
        commit("saveMyReward", response);
        return response;
      } catch (e) {
        console.log("Loading my reward error", e);
      }
    }
  }
};
