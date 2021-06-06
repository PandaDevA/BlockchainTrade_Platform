<template>
  <div class="d-flex-full-center w-100">
    <div class="table-wrapper w-100">
      <div class="d-flex mb-3">
        <div class="mr-2 ml-1">
          <datepicker
            v-model="historyDate"
            @selected="onSelectDate"
            format="dd.MM.yyyy"
            class="text-center date-picker field settings w-input"
            type="text"
          ></datepicker>
        </div>
        <button
          @click="$emit('loadByLeague', 'rewardHistory', 1)"
          :class="{'bg-dark-orange': rewardHistory.league == 1}"
          class="bg-orange text-white text-center mx-2 btn px-4 py-1 w-100"
        >League 1</button>
        <button
          @click="$emit('loadByLeague', 'rewardHistory', 2)"
          :class="{'bg-dark-orange': rewardHistory.league == 2}"
          class="bg-orange text-white text-center mx-2 btn px-4 py-1 w-100"
        >League 2</button>
        <button
          @click="$emit('loadByLeague', 'rewardHistory', 3)"
          :class="{'bg-dark-orange': rewardHistory.league == 3}"
          class="bg-orange text-white text-center mx-2 btn px-4 py-1 w-100"
        >League 3</button>
        <button
          @click="$emit('loadByLeague', 'rewardHistory', 4)"
          :class="{'bg-dark-orange': rewardHistory.league == 4}"
          class="bg-orange text-white text-center mx-2 btn px-4 py-1 w-100"
        >League 4</button>
      </div>
      <p v-if="isNoHistory" class="text-center">No data</p>
      <div v-else-if="isLoading" class="d-flex-full-center w-100">
        <a-spinner/>
      </div>
      <div v-else class="w-100">
        <div class="d-flex justify-between pb-4 w-100">
          <v-table class="mr-4" :data="rewardHistory.items.slice(0, sliceBy)">
            <thead slot="head">
              <th class="text-center">Ranking</th>
              <th class="text-center">Points</th>
              <th class="text-center">Reward</th>
            </thead>
            <tbody slot="body" slot-scope="{displayData}">
              <tr v-for="row in displayData" :key="row.id">
                <td class="text-center">{{ row.ranking }}</td>
                <td class="text-center">{{ row.points }}</td>
                <td class="text-center">{{ row.reward }}</td>
              </tr>
            </tbody>
          </v-table>
          <v-table
            v-if="rewardHistory.items.length > sliceBy"
            :data="rewardHistory.items.slice(sliceBy)"
          >
            <thead slot="head">
              <th class="text-center">Ranking</th>
              <th class="text-center">Points</th>
              <th class="text-center">Reward</th>
            </thead>
            <tbody slot="body" slot-scope="{displayData}">
              <tr v-for="row in displayData" :key="row.id">
                <td class="text-center">{{ row.ranking }}</td>
                <td class="text-center">{{ row.points }}</td>
                <td class="text-center">{{ row.reward }}</td>
              </tr>
            </tbody>
          </v-table>
        </div>
        <div class="table-pagination d-flex mt-3 mb-1 justify-center">
          <button
            @click="$emit('loadLess', 'rewardHistory')"
            :disabled="rewardHistory.page == 1"
            class="left-arrow make-disabled"
          >❮</button>
          <span class="mx-2">{{ getPagesFromToRange(getAmount.history, rewardHistory.page) }}</span>
          <button
            @click="$emit('loadMore', 'rewardHistory')"
            :disabled="!rewardHistory.next"
            class="right-arrow make-disabled"
          >❯</button>
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
    }
  },
  data() {
    return {
      sliceBy: 25,
      historyDate: moment().format("MM.DD.YYYY")
    };
  },
  computed: {
    ...mapGetters("mining", ["getAmount"]),
    isNoHistory() {
      return isEmpty(this.rewardHistory.items) && !this.isLoading;
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