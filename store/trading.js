import {
  chain,
  filter,
  find,
  get,
  isEmpty,
  map,
  maxBy,
  minBy,
  value
} from "lodash";
import BigNumber from "bignumber.js";

export default {
  state: () => ({
    tradingState: {},
    selectedCurrency: {},
    isBuy: true,
    currentBuy: {
      price: 0,
      amount: 0
    },
    currentSell: {
      price: 0,
      amount: 0
    },
    hubConnection: null
  }),
  getters: {
    getConnection(state) {
      return state.hubConnection;
    },
    getUserId(state) {
      return get(state, "tradingState.userId");
    },
    getSelectedCurrencyById(state) {
      return id => {
        const currencyList = get(state, "tradingState.currencies");
        if (isEmpty(currencyList)) return;
        const currentCurrency = state.tradingState.currencies.find(
          ({ currencyId }) => {
            return currencyId === id;
          }
        );
        return currentCurrency;
      };
    },
    getSelectedCurrency(state) {
      return state.selectedCurrency;
    },
    getCurrencySecureStatus(state) {
      const currencies = get(state.tradingState, "currencies");
      const currentCurrencyId = get(state.selectedCurrency, "currencyId");
      const findByCurrencyId = currency =>
        currency.currencyId === currentCurrencyId;
      const currentCurrency = find(currencies, findByCurrencyId);
      const secureStatus = get(currentCurrency, "isSecureCoin");
      return secureStatus;
    },
    getMarketPrice(state) {
      const buyOrders = filter(
        state.tradingState.tradingOrders,
        order => order.dealType === "Buy"
      );
      const maxBuyOrder = maxBy(buyOrders, order => order.price);
      const sellOrders = filter(
        state.tradingState.tradingOrders,
        order => order.dealType === "Sell"
      );
      const minSellOrder = minBy(sellOrders, order => order.price);

      return {
        Buy: get(maxBuyOrder, "price"),
        Sell: get(minSellOrder, "price")
      };
    },
    getCurrencyBtcRate(state) {
      const currencyList = get(state, "tradingState.currencies");
      if (isEmpty(currencyList)) return;
      const currentCurrency = state.tradingState.currencies.find(
        ({ currencyId }) => {
          return currencyId === get(state, "selectedCurrency.currencyId");
        }
      );
      return get(currentCurrency, "btcRate");
    },
    getCurrencyRateStatus(state) {
      const currencyList = get(state, "tradingState.currencies");
      if (isEmpty(currencyList)) return;
      const currentCurrency = state.tradingState.currencies.find(
        ({ currencyId }) => {
          return currencyId === get(state, "selectedCurrency.currencyId");
        }
      );
      return get(currentCurrency, "isRateDown");
    },
    getCurrencyRates(state) {
      return isEmpty(get(state, "tradingState.currencies"))
        ? []
        : state.tradingState.currencies;
    },
    getTradingOrders(state) {
      return isEmpty(get(state, "tradingState.tradingOrders"))
        ? []
        : state.tradingState.tradingOrders;
    },
    getTradingHistory(state) {
      return isEmpty(get(state, "tradingState.tradingHistory"))
        ? []
        : [...state.tradingState.tradingHistory].sort(function(a, b) {
            return (
              new Date(get(b, "closeDateUTC")) -
              new Date(get(a, "closeDateUTC"))
            );
          });
    },
    getOpenOrders(state) {
      return isEmpty(get(state, "tradingState.tradingOpenOrders"))
        ? []
        : state.tradingState.tradingOpenOrders;
    }
  },
  mutations: {
    setConnection(state) {
      const hubUrl = this.$axios.defaults.baseURL + "/trading/hub";
      state.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl)
        .configureLogging(signalR.LogLevel.Information)
        .build();
    },
    changeBuySellState(state, isBuy) {
      state.isBuy = isBuy;
    },
    prefillBuySellModule(state, payload) {
      if (state.isBuy) state.currentBuy = { ...state.currentBuy, ...payload };
      else state.currentSell = { ...state.currentSell, ...payload };
    },
    saveTradingState(state, payload) {
      state.tradingState = payload;
    },

    saveCurrentSelected(state, payload) {
      if (payload.isState) {
        state.selectedCurrency = payload;
        return;
      }

      const hasUserId = typeof payload.userId != "undefined";

      if (
        (hasUserId &&
          get(payload, "userId") === get(state.tradingState, "userId")) ||
        !hasUserId
      ) {
        const sameCurrencySelected =
          payload.currencyId === get(state.selectedCurrency, "currencyId");
        const currencyAvailable = sameCurrencySelected
          ? +toFixedSmall(payload.currencyAvailable)
          : state.selectedCurrency.currencyAvailable;

        state.selectedCurrency = {
          ...state.selectedCurrency,
          btcAvailable: +toFixedSmall(payload.btcAvailable),
          currencyAvailable,
          isSecureCoin: state.selectedCurrency.isSecureCoin
        };
      }
    },

    // CurrencyRate
    updateCurrencyRate(state, newRate) {
      const rates = map(state.tradingState.currencies, rate => {
        if (rate.currencyId !== newRate.currencyId) return rate;
        const isSecureCoin = rate.isSecureCoin;
        return {
          ...rate,
          ...newRate,
          isSecureCoin
        };
      });
      state.tradingState = {
        ...state.tradingState,
        currencies: rates
      };
    },

    // Orders
    addTradingOrders(state, { newOrders, orderListName }) {
      let currentUserOrders = newOrders.filter(order => {
        if (orderListName === "tradingOrders") return true;
        return (
          get(order, "userId") &&
          get(order, "userId") === get(state.tradingState, "userId")
        );
      });
      const currentCurrencyId = state.selectedCurrency.currencyId;
      currentUserOrders = currentUserOrders.filter(
        record => record.currencyId === currentCurrencyId
      );
      const orders = [
        ...state.tradingState[orderListName],
        ...currentUserOrders
      ];

      state.tradingState = {
        ...state.tradingState,
        [orderListName]: orders
      };
    },
    removeTradingOrder(
      state,
      {
        price,
        dealType,
        currencyId,
        orderListName,
        isTakeProfitTrigger,
        isTriggered
      }
    ) {
      const orders = filter(state.tradingState[orderListName], order => {
        return !(
          order.currencyId === currencyId &&
          order.price === price &&
          order.dealType === dealType &&
          order.isTakeProfitTrigger === isTakeProfitTrigger &&
          order.isTriggered === isTriggered
        );
      });

      state.tradingState = {
        ...state.tradingState,
        [orderListName]: orders
      };
    },
    updateOrder(state, { orderData, orderListName }) {
      const orders = map(state.tradingState[orderListName], order => {
        if (
          order.price === orderData.price &&
          order.currencyId === orderData.currencyId &&
          order.dealType === orderData.dealType &&
          order.isTakeProfitTrigger === orderData.isTakeProfitTrigger &&
          order.isTriggered === orderData.isTriggered
        )
          return orderData;

        return order;
      });
      state.tradingState = {
        ...state.tradingState,
        [orderListName]: orders
      };
    },

    // Trading History
    addTradingHistory(state, historyRecords) {
      const historyList = get(state, "tradingState.tradingHistory");
      const currentCurrencyId = get(state.selectedCurrency, "currencyId");
      const currentCurrencyHistoryRecords = historyRecords.filter(
        record => record.currencyId === currentCurrencyId
      );
      state.tradingState.tradingHistory = [
        ...currentCurrencyHistoryRecords,
        ...historyList
      ];
    }
  },
  actions: {
    loadTradingState({ commit }, currencyId) {
      return this.$axios
        .$get(`/trading/tradingState?selectedCurrencyId=${currencyId}`)
        .then(async res => {
          let selectedCurrency;
          let kycStatus = {
            completed: false
          };
          try {
            kycStatus = await this.$axios.$get(`/profile/kycStatus`);
          } catch (e) {
            console.log("Loading KYC status failed", e);
          } finally {
            const currencies = map(res.currencies, currency => {
              currency.currencyShortName = currency.shortName;
              if (!get(kycStatus, "completed")) return currency;
              currency.isSecureCoin = true;
              return currency;
            });
            res = {
              ...res,
              currencies
            };
            const desireCurrency = find(
              res.currencies,
              currency =>
                currency.currencyId ===
                get(res, "currencyOrderSource.currencyId")
            );
            selectedCurrency = {
              ...res.currencyOrderSource,
              isState: true,
              currencyShortName: get(desireCurrency, "currencyShortName")
            };
            console.log("saved", res);
            commit("saveTradingState", res);
            commit("saveCurrentSelected", selectedCurrency);
            return res;
          }
        })
        .catch(console.log);
    },
    runSocketConnection({ getters, commit }) {
      let hubConnection = getters.getConnection;
      if (hubConnection) hubConnection.stop();

      commit("setConnection");
      hubConnection = getters.getConnection;

      hubConnection.on("Order", function(event) {
        if (event.insert) {
          commit("addTradingOrders", {
            newOrders: event.insert,
            orderListName: "tradingOrders"
          });
        }
        if (event.delete) {
          event.delete.forEach(orderData => {
            commit("removeTradingOrder", {
              ...orderData,
              orderListName: "tradingOrders"
            });
          });
        }
        if (event.update) {
          event.update.forEach(orderData => {
            commit("updateOrder", {
              orderData,
              orderListName: "tradingOrders"
            });
          });
        }

        console.log("OrderBook Event", event);
      });

      hubConnection.on("OpenOrder", function(event) {
        if (event.insert) {
          commit("addTradingOrders", {
            newOrders: event.insert,
            orderListName: "tradingOpenOrders"
          });
        }
        if (event.delete) {
          event.delete.forEach(orderData => {
            commit("removeTradingOrder", {
              ...orderData,
              orderListName: "tradingOpenOrders"
            });
          });
        }
        if (event.update) {
          event.update.forEach(orderData => {
            commit("updateOrder", {
              orderData,
              orderListName: "tradingOpenOrders"
            });
          });
        }
        console.log("OpenOrder event", event);
      });

      hubConnection.on("OrderSource", function(value) {
        console.log("OrderSource Event", value);
        commit("saveCurrentSelected", value);
      });

      hubConnection.on("TradingHistory", function(values) {
        console.log("TradingHistory Event", values);
        commit("addTradingHistory", values);
      });

      hubConnection.on("CurrencyRate", function(rate) {
        commit("updateCurrencyRate", rate);
        console.log("CurrencyRate Event", rate);
      });

      hubConnection.serverTimeoutInMilliseconds = 60000;
      hubConnection.start();
    },

    // Orders actions
    addOrder(context, order) {
      return this.$axios
        .$put(`/trading/addOrder`, order)
        .then(res => {
          return true;
        })
        .catch(console.log);
    },
    cancelOrder({ commit }, order) {
      console.log("Cancel order", order);
      return this.$axios
        .$delete(`/trading/cancelOrder`, { data: order })
        .then(res => {
          return res;
        })
        .catch(console.log);
    }
  }
};

function toFixedSmall(number, fixed = 8) {
  number = parseFloat(scientificToDecimal(number));
  const str = number.toString();
  if (str.indexOf(".") !== -1) {
    const splitted = str.split(".");
    const decimals = splitted[1].length;
    let result;
    if (decimals > fixed)
      result = new BigNumber(
        splitted[0] + "." + splitted[1].slice(0, fixed - decimals)
      ).toNumber();
    else result = new BigNumber(number).toFixed(decimals);
    return result;
  } else {
    return number;
  }
}
function scientificToDecimal(num) {
  const sign = Math.sign(num);
  //if the number is in scientific notation remove it
  if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
    const zero = "0";
    const parts = String(num)
      .toLowerCase()
      .split("e"); //split into coeff and exponent
    const e = parts.pop(); //store the exponential part
    let l = Math.abs(e); //get the number of zeros
    const direction = e / l; // use to determine the zeroes on the left or right
    const coeff_array = parts[0].split(".");

    if (direction === -1) {
      coeff_array[0] = Math.abs(coeff_array[0]);
      num = zero + "." + new Array(l).join(zero) + coeff_array.join("");
    } else {
      const dec = coeff_array[1];
      if (dec) l = l - dec.length;
      num = coeff_array.join("") + new Array(l + 1).join(zero);
    }
  }

  if (sign < 0) {
    num = -num;
  }

  return num;
}
