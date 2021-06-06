<template>
  <div class="d-flex-full-center w-100">
    <div class="table-wrapper w-100">
      <p v-if="isNoHistory" class="text-center">No data</p>
      <div v-else-if="isLoading" class="d-flex-full-center w-100">
        <a-spinner/>
      </div>
      <div v-else class="w-100">
        <div class="d-flex justify-between pb-4 w-100">
          <v-table class="mr-4" :data="rewardHistory.slice(0, sliceBy)">
            <thead slot="head">
              <th class="text-center">Status</th>
              <th class="text-center">Date</th>
              <th class="text-center">Coin</th>
              <th class="text-center">Amount</th>
              <th class="text-center">Address</th>
              <th class="text-center">TXID</th>
            </thead>
            <tbody slot="body" slot-scope="{displayData}">
              <tr v-for="row in displayData" :key="row.id">
                <td class="text-center">{{ row.status }}</td>
                <td class="text-center">{{ row.date }}</td>
                <td class="text-center">{{ row.coin }}</td>
                <td class="text-center">{{ row.amount }}</td>
                <td class="text-center">{{ row.address }}</td>
                <td class="text-center">{{ row.txid }}</td>
              </tr>
            </tbody>
          </v-table>
          <v-table
            v-if="rewardHistory.length > sliceBy"
            :data="rewardHistory.slice(sliceBy)"
          >
           <thead slot="head">
              <th class="text-center">Status</th>
              <th class="text-center">Date</th>
              <th class="text-center">Coin</th>
              <th class="text-center">Amount</th>
              <th class="text-center">Address</th>
              <th class="text-center">TXID</th>
            </thead>
            <tbody slot="body" slot-scope="{displayData}">
              <tr v-for="row in displayData" :key="row.id">
                <td class="text-center">{{ row.status }}</td>
                <td class="text-center">{{ row.date }}</td>
                <td class="text-center">{{ row.coin }}</td>
                <td class="text-center">{{ row.amount }}</td>
                <td class="text-center">{{ row.address }}</td>
                <td class="text-center">{{ row.txid }}</td>
              </tr>
            </tbody>
          </v-table>
        </div>
        <div class="table-pagination d-flex mt-3 mb-1 justify-center">
          <!-- <button
            @click="$emit('loadLess', 'rewardHistory')"
            :disabled="rewardHistory.page == 1"
            class="left-arrow make-disabled"
          >❮</button>
          <span class="mx-2">{{ getPagesFromToRange(getAmount.history, rewardHistory.page) }}</span>
          <button
            @click="$emit('loadMore', 'rewardHistory')"
            :disabled="!rewardHistory.next"
            class="right-arrow make-disabled"
          >❯</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
import { isEmpty } from "lodash";

export default {
  components: { Datepicker },
  props: {
    rewardHistory: {
      type: Object,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    },
    sliceBy: {
        type: Number,
        default: 25
    }
  },
  data() {
    return {
      historyDate: moment().format("MM.DD.YYYY")
    };
  },
  computed: {
    ...mapGetters("mining", ["getAmount"]),
    isNoHistory() {
      return isEmpty(this.rewardHistory) && !this.isLoading;
    }
  },
  methods: {
    onSelectDate(date) {
      this.$emit("loadHistoryByDate", moment(date).unix());
    }
  }
};
</script>

<style scoped>
.date-picker {
  width: 100px;
}
.table-pagination .left-arrow,
.table-pagination .right-arrow {
  padding-left: 5px;
  padding-right: 5px;
}
.table-pagination .left-arrow:hover,
.table-pagination .right-arrow:hover {
  background-color: #eda55d;
  color: #ffffff;
}
</style>