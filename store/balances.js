import { get, map } from "lodash";

export default {
  state: () => ({
    totalBtc: 0,
    totalUsd: 0,
    balances: []
  }),
  getters: {
    getBalances(state) {
      return state.balances;
    }
  },
  mutations: {
    saveClientBalance(state, { totalBtc, totalUsd, balances }) {
      state.totalBtc = totalBtc;
      state.totalUsd = totalUsd;
      state.balances = balances;
    },
    changeBalanceAmount(state, { currencyId, amount, totalAmount }) {
      state.balances = map(state.balances, balance => {
        if (currencyId !== balance.data.currencyId) return balance;
        const maxMoreThenAvailable = balance.data.maxWithdrawal > amount;
        const newMax = maxMoreThenAvailable
          ? amount
          : balance.data.maxWithdrawal;
        return {
          ...balance,
          data: {
            ...balance.data,
            amountAvailable: amount || balance.data.amountAvailable,
            amountTotal: totalAmount || balance.data.amountTotal,
            maxWithdrawal: newMax
          }
        };
      });
    }
  },
  actions: {
    async loadClientBalance({ commit }) {
      try {
        const { totalBtc, totalUsd, values } = await this.$axios.$get(
          "/balance/clientBalance"
        );
        const balances = values.map(balance => {
          balance = {
            data: balance,
            showDeposit: false,
            showWithdraw: false,
            isWithdrawDisabled: true,
            showQRCode: false,
            qrCode: "SOME QR here" + Math.random()
          };
          return balance;
        });
        const payload = {
          totalBtc,
          totalUsd,
          balances
        };

        commit("saveClientBalance", {
          totalBtc,
          totalUsd,
          balances
        });
        return payload;
      } catch (e) {
        console.log("Loading balances error", e);
      }
    },
    async loadWalletAddress(context, coinShortName) {
      try {
        const url = `wallets/getNewAddress?coin=${coinShortName.toLowerCase()}`;
        const data = await this.$axios.$get(url);
        return data.address;
      } catch (e) {
        console.log("Getting wallet address error", e);
      }
    },
    async sendWithdrawal({ commit }, payload) {
      try {
        const data = await this.$axios.$post("wallets/withdrawal", payload);
        // commit("changeBalanceAmount", data);
        const status = get(data, 'status');
        if (checkWithdrawalError(status)) return { error: status };
        return data;
      } catch (e) {
        console.log("Send withdrawal error", e);
        return { error: get(e, 'response.data') || 'Server error' };
      }
    }
  }
};

const checkWithdrawalError = (status) => {
  return typeof status === 'string' && status.includes('error');
}