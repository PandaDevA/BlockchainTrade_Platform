<template>
  <div class="dashboard-wrapper-light-notrad responsive-content-wrapper">
    <div class="center vertical">
      <div class="horizontal-wrapper"></div>
      <div class="horizontal-wr">
        <div>
          <input
            v-model="findPair"
            type="search"
            class="search-field w-input"
            maxlength="256"
            name="query"
            placeholder="Search…"
            id="search"
            autocomplete="off"
          >
        </div>
        <div>
          <button
            @click="downloadCSV"
            :disabled="historyIsEmpty"
            :class="{'px-3': historyIsEmpty}"
            class="btn download w-button make-disabled-dark"
          >Download CSV file</button>
          <a href="#" id="download-report"></a>
        </div>
        <div>
          <a-button @click="refreshData" color="green" size="medium">
            <i :class="{'loading-tic-toc': refreshingPage }" class="fas fa-sync"></i>
          </a-button>
        </div>
      </div>
      <div class="wallet-wrapper">
        <trading-history-table :is-loading="refreshingPage" :histories="histories"/>
      </div>
    </div>
  </div>
</template>

<script>
import TradingHistoryTable from "@/components/_sections/trading_history/TradingHistoryTable";
import { isEmpty, get } from "lodash";
import { mapActions } from "vuex";

export default {
  middleware: "authentication",
  layout: "profile",
   head () {
    return {
      title: 'Trading History | Folex'
    }
  },
  components: {
    TradingHistoryTable
  },
  data() {
    return {
      refreshingPage: false,
      findPair: "",
      histories: [],
      fullHistories: [],
      baseUrl: this.$axios.defaults.baseURL
    };
  },
  watch: {
    findPair(newValue, oldValue) {
      if (newValue) {
        this.histories = this.fullHistories.filter(history => {
          const historyPair = history.pair.toLowerCase();
          const searchPrefix = newValue.toLowerCase();
          return historyPair.includes(searchPrefix);
        });
      } else this.histories = this.fullHistories;
    }
  },
  created() {
    this.refreshData();
  },
  computed: {
    downloadCSVLink() {
      return `${this.baseUrl}/tradingHistory/csv?filter=${this.findPair}`;
    },
    historyIsEmpty() {
      return isEmpty(this.histories);
    }
  },
  methods: {
    ...mapActions("tradingHistory", ["loadTradingHistory"]),
    downloadCSV() {
      if (!this.histories.length) return;
      this.$axios
        .$post(this.downloadCSVLink)
        .then(res => {
          this.saveCSV(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveCSV(csv) {
      const fileName = "trading-history.csv";
      const isMac = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)
        ? true
        : false;
      const isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent
      );

      if (!isMac) {
        const BOM = "\ufeff";
        csv = BOM + csv;
      }

      const blob = new Blob([csv], {
        encoding: "UTF-8",
        type: "text/csv;charset=UTF-8"
      });
      const blobUrl = window.URL.createObjectURL(blob);

      //ie (naturally) does things differently
      let csvLink = document.getElementById("download-report");
      if (!window.navigator.msSaveOrOpenBlob) {
        csvLink.href = blobUrl;
        csvLink.download = fileName;
      }

      //oh ie, I love you so
      csvLink.onclick = function() {
        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, fileName);
        } else if (isSafari) {
          window.open("data:attachment/csv;charset=utf-8," + encodeURI(csv));
        }
      };

      csvLink.click();
    },
    async refreshData() {
      this.refreshingPage = true;
      this.findPair = "";

      try {
        const histories = await this.loadTradingHistory();
        this.fullHistories = histories;
        this.histories = [...this.fullHistories];
      } catch (e) {
        console.log("Local loading trading history error", e);
      } finally {
        this.refreshingPage = false;
      }
    }
  }
};
</script>

<style scoped>
.center.vertical {
  display: block;
  position: relative;
  top: 10vh;
}
.horizontal-wr div {
  margin-right: 12px;
}
.checkbox-label {
  width: max-content;
}
.loading-tic-toc {
  animation-duration: 1s;
}
</style>