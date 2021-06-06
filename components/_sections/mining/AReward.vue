<template>
  <div class="d-flex-full-center w-100">
    <div class="table-wrapper w-100">
      <p v-if="isNoReward" class="text-center">No data</p>
      <div v-else-if="isLoading" class="d-flex-full-center w-100">
        <a-spinner/>
      </div>
      <div v-else class="w-100">
        <div class="d-flex justify-center pb-4 w-100">
          <v-table class="mr-4" :data="reward.items.slice(0, 25)">
            <thead slot="head">
              <th class="text-center">League</th>
              <th class="text-center">Date</th>
              <th class="text-center">Ranking</th>
              <th class="text-center">Points</th>
              <th class="text-center">Reward</th>
            </thead>
            <tbody slot="body" slot-scope="{displayData}">
              <tr v-for="row in displayData" :key="row.id">
                <td class="text-center">{{ row.league }}</td>
                <td class="text-center">{{ getHumanDate(row.date) }}</td>
                <td class="text-center">{{ row.position }}</td>
                <td class="text-center">{{ row.totalPoints }}</td>
                <td class="text-center">{{ row.rewardVolume }}</td>
              </tr>
            </tbody>
          </v-table>
        </div>
        <div class="table-pagination d-flex mt-3 mb-1 justify-center">
          <button
            @click="$emit('loadLess', 'myReward')"
            :disabled="reward.page == 1"
            class="left-arrow make-disabled"
          >❮</button>
          <span class="mx-2">{{ getPagesFromToRange(getAmount.reward, reward.page) }}</span>
          <button
            @click="$emit('loadMore', 'myReward')"
            :disabled="!reward.next"
            class="right-arrow make-disabled"
          >❯</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import { isEmpty } from "lodash";

export default {
  props: {
    reward: {
      type: Object,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters("mining", ["getAmount"]),
    isNoReward() {
      return isEmpty(this.reward.items) && !this.isLoading;
    }
  },
  methods: {
    getHumanDate(date) {
      return moment(date).format("DD.MM.YYYY");
    }
  }
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