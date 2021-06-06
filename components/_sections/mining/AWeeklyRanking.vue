<template>
  <div class="d-flex-full-center w-100">
    <div class="table-wrapper w-100">
      <div class="d-flex mb-3">
        <button
          @click="$emit('loadByLeague', 'weeklyRanking', 1)"
          :class="{'bg-dark-orange': weeklyRanking.league == 1}"
          class="bg-orange text-white text-center mx-2 btn px-4 py-1 w-100"
        >League 1</button>
        <button
          @click="$emit('loadByLeague', 'weeklyRanking', 2)"
          :class="{'bg-dark-orange': weeklyRanking.league == 2}"
          class="bg-orange text-white text-center mx-2 btn px-4 py-1 w-100"
        >League 2</button>
        <button
          @click="$emit('loadByLeague', 'weeklyRanking', 3)"
          :class="{'bg-dark-orange': weeklyRanking.league == 3}"
          class="bg-orange text-white text-center mx-2 btn px-4 py-1 w-100"
        >League 3</button>
        <button
          @click="$emit('loadByLeague', 'weeklyRanking', 4)"
          :class="{'bg-dark-orange': weeklyRanking.league == 4}"
          class="bg-orange text-white text-center mx-2 btn px-4 py-1 w-100"
        >League 4</button>
      </div>
      <p v-if="isNoWeekly" class="text-center">No data</p>
      <div v-else-if="isLoading" class="d-flex-full-center w-100">
        <a-spinner/>
      </div>
      <div v-else class="w-100">
        <div class="d-flex justify-between pb-4 w-100">
          <v-table class="mr-4" :data="weeklyRanking.items.slice(0, sliceBy)">
            <thead slot="head">
              <th class="text-center">Ranking</th>
              <th class="text-center">Points</th>
            </thead>
            <tbody slot="body" slot-scope="{displayData}">
              <tr v-for="row in displayData" :key="row.id">
                <td class="text-center">{{ row.ranking }}</td>
                <td class="text-center">{{ row.points }}</td>
              </tr>
            </tbody>
          </v-table>
          <v-table
            v-if="weeklyRanking.items.length > sliceBy"
            :data="weeklyRanking.items.slice(sliceBy)"
          >
            <thead slot="head">
              <th class="text-center">Ranking</th>
              <th class="text-center">Points</th>
            </thead>
            <tbody slot="body" slot-scope="{displayData}">
              <tr v-for="row in displayData" :key="row.id">
                <td class="text-center">{{ row.ranking }}</td>
                <td class="text-center">{{ row.points }}</td>
              </tr>
            </tbody>
          </v-table>
        </div>
        <div class="table-pagination d-flex mt-3 mb-1 justify-center">
          <button
            @click="$emit('loadLess', 'weeklyRanking')"
            :disabled="weeklyRanking.page == 1"
            class="left-arrow make-disabled"
          >❮</button>
          <span class="mx-2">{{ getPagesFromToRange(getAmount.weekly, weeklyRanking.page) }}</span>
          <button
            @click="$emit('loadMore', 'weeklyRanking')"
            :disabled="!weeklyRanking.next"
            class="right-arrow make-disabled"
          >❯</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { isEmpty } from "lodash";

export default {
  props: {
    weeklyRanking: {
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
      sliceBy: 25
    };
  },
  computed: {
    ...mapGetters("mining", ["getAmount"]),
    isNoWeekly() {
      return isEmpty(this.weeklyRanking.items) && !this.isLoading;
    }
  },
  methods: {}
};
</script>

<style scoped>
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