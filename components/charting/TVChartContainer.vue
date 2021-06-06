<template>
  <div id="trade-view"></div>
</template>

<script>
import { isEmpty, get } from "lodash";
import moment from "moment";

export default {
  props: {
    options: {
      required: true
    },
    currency: {
      required: true
    }
  },
  data() {
    return {
      widget: null,
      socket: new socket(),
      datafeeds: new datafeeds(this),
      symbol: this.currency.currencyShortName + "BTC" || "RDDBTC",
      interval: 30,
      cacheData: {},
      lastTime: null,
      getBarTimer: null,
      isLoading: true,
      isLastChanged: false
    };
  },
  mounted() {
    if (process.server) return;
    this.$nextTick(() => {
      if (!this.socket) return;

      this.socket.doOpen();
      this.socket.on("open", () => {
        this.socket.send({
          cmd: "req",
          resolution: "M5",
          currencyId: this.currency.currencyId,
          numberOfHistoryRecords: 100,
          timeNow: this.timeNowUnix()
        });
      });
      this.socket.on("message", this.onMessage);
    });
  },
  methods: {
    init(symbol = "USDBTC", interval = 30) {
      if (!this.widget) {
        this.widget = new TradingView.widget({
          ...this.options,
          datafeed: this.datafeeds,
          interval: interval
        });
        this.symbol = this.currency.currencyShortName + "BTC";
        this.interval = interval;
      }
    },
    sendMessage(data) {
      if (this.socket.checkOpen()) {
        this.socket.send(data);
      } else {
        this.socket.on("open", () => {
          this.socket.send(data);
        });
      }
    },
    unSubscribe(interval) {
      if (interval < 60) {
        this.sendMessage({
          cmd: "unsub",
          resolution: `M${interval}`,
          currencyId: this.currency.currencyId,
          numberOfHistoryRecords: 100,
          timeNow: this.timeNowUnix()
        });
      } else if (interval >= 60) {
        this.sendMessage({
          cmd: "unsub",
          resolution: `H${interval / 60}`,
          currencyId: this.currency.currencyId,
          numberOfHistoryRecords: 100,
          timeNow: this.timeNowUnix()
        });
      } else {
        this.sendMessage({
          cmd: "unsub",
          resolution: "D1",
          currencyId: this.currency.currencyId,
          numberOfHistoryRecords: 100,
          timeNow: this.timeNowUnix()
        });
      }
    },
    subscribe() {
      if (this.interval < 60) {
        this.sendMessage({
          cmd: "sub",
          resolution: `M${this.interval}`,
          currencyId: this.currency.currencyId,
          timeNow: this.timeNowUnix()
        });
      } else if (this.interval >= 60) {
        this.sendMessage({
          cmd: "sub",
          resolution: `H${this.interval / 60}`,
          currencyId: this.currency.currencyId,
          timeNow: this.timeNowUnix()
        });
      } else {
        this.sendMessage({
          cmd: "sub",
          resolution: "D1",
          currencyId: this.currency.currencyId,
          timeNow: this.timeNowUnix()
        });
      }
    },
    onMessage(data) {
      // History
      if (data.data && data.data.length) {
        const list = data.data.map(element => ({
          time: element.id,
          open: element.open,
          high: element.high,
          low: element.low,
          close: element.close,
          volume: element.quote_vol
        }));
        const ticker = `${this.symbol}-${this.interval}`;
        this.cacheData[ticker] = list;
        this.lastTime = list[list.length - 1].time;
        this.init();
        this.subscribe();
      }
      // Uodate with new data
      if (data.type && data.type.indexOf(this.symbol.toLowerCase()) !== -1) {
        const ticker = `${this.symbol}-${this.interval}`;
        const barsData = {
          time: data.id,
          open: data.open,
          high: data.high,
          low: data.low,
          close: data.close,
          volume: data.quote_vol
        };

        // console.log("Add ticker", barsData, this.lastTime, barsData.time);

        if (isEmpty(this.cacheData[ticker]))
          return this.datafeeds.barsUpdater.updateData();

        if (barsData.time > this.lastTime) {
          // when passed interval
          // console.log("Add new ticker");
          this.cacheData[ticker].push(barsData);
          this.lastTime = barsData.time;
        } else if (barsData.time == this.lastTime) {
          // when intevral hasn't finished
          const lastBarIndex = this.cacheData[ticker].length - 1;
          // console.log(
          //   "UPDATE ticker",
          //   ticker,
          //   lastBarIndex,
          //   this.cacheData[ticker][lastBarIndex]
          // );
          this.cacheData[ticker][lastBarIndex] = barsData;
        }
        this.datafeeds.barsUpdater.updateData();
      }
    },
    getBars(
      symbolInfo,
      resolution,
      rangeStartDate,
      rangeEndDate,
      onLoadedCallback
    ) {
      resolution = +resolution;
      if (this.interval !== resolution) {
        this.unSubscribe(this.interval);
        this.interval = resolution;

        if (resolution < 60) {
          this.sendMessage({
            cmd: "req",
            resolution: `M${this.interval}`,
            currencyId: this.currency.currencyId,
            numberOfHistoryRecords: 100,
            timeNow: this.timeNowUnix()
          });
        } else if (resolution >= 60) {
          this.sendMessage({
            cmd: "req",
            resolution: `H${this.interval / 60}`,
            currencyId: this.currency.currencyId,
            numberOfHistoryRecords: 100,
            timeNow: this.timeNowUnix()
          });
        } else {
          this.sendMessage({
            cmd: "req",
            resolution: "D1",
            currencyId: this.currency.currencyId,
            numberOfHistoryRecords: 100,
            timeNow: this.timeNowUnix()
          });
        }
      }
      const ticker = `${this.symbol}-${this.interval}`;
      console.log("Resolution", resolution, "Ticker", ticker, this.cacheData);
      if (this.cacheData[ticker] && this.cacheData[ticker].length) {
        this.isLoading = false;
        const newBars = [];
        this.cacheData[ticker].forEach((item, i) => {
          if (item.time >= rangeStartDate && item.time <= rangeEndDate) {
            const newItem = {
              ...item,
              time: item.time * 1000
            };
            newBars.push(newItem);
          }
        });
        onLoadedCallback(newBars);
      } else {
        const self = this;
        this.getBarTimer = setTimeout(function() {
          self.getBars(
            symbolInfo,
            resolution,
            rangeStartDate,
            rangeEndDate,
            onLoadedCallback
          );
        }, 10);
      }
    },
    timeNowUnix() {
      return moment().unix() * 1000;
    },
    timeZoneOffset() {
      return moment().utcOffset() * 60;
    }
  },
  beforeDestroy() {
    this.socket.destroy();
    clearTimeout(this.getBarTimer);
  }
};
</script>

