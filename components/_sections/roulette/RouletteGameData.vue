<template>
  <div class="wallet-wrapper mt-4">
    <div class="settings-form-wrapper mt-4 w-form w-100">
      <div class="settings-wrapper-main">
        <div class="module-wrapper custom-width overflow-initial">
          <div class="module-header">
            <div class="module-title">Game Data</div>
          </div>
          <p v-if="isNoGameData" class="text-center mt-2">No data</p>
          <div v-else-if="isLoading" class="d-flex-full-center w-100">
            <a-spinner/>
          </div>
          <div
            v-else
            class="content-transactionshistory round-border d-flex justify-around grey-bottom mb-4"
          >
            <v-table class="mr-4 w-100" :data="gameData">
              <thead class="v-table-head" slot="head">
                <th class="text-center text-white border-none uppercase module-text">Game</th>
                <th class="text-center text-white border-none uppercase module-text">Time</th>
                <th class="text-center text-white border-none uppercase module-text">User</th>
                <th class="text-center text-white border-none uppercase module-text">Bet</th>
                <th class="text-center text-white border-none uppercase module-text">Target</th>
                <th class="text-center text-white border-none uppercase module-text">Spin</th>
                <th class="text-center text-white border-none uppercase module-text">Profit</th>
              </thead>
              <tbody slot="body" slot-scope="{displayData}">
                <tr class="v-table-body" v-for="row in displayData" :key="row.game">
                  <td class="text-center border-none">{{ row.id }}</td>
                  <td class="text-center border-none">{{ transformToHumanDate(row.time) }}</td>
                  <td class="text-center border-none">{{ row.user }}</td>
                  <td class="text-center border-none">{{ row.bet }}</td>
                  <td class="text-center border-none">{{ row.target }}</td>
                  <td class="text-center border-none">{{ row.spin }}</td>
                  <td
                    :class="{'text-green': row.profit >= 0, 'text-red': row.profit < 0}"
                    class="text-center border-none"
                  >{{ row.profit }}</td>
                </tr>
              </tbody>
            </v-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isEmpty } from "lodash";
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  props: {
    isLoading: Boolean
  },
  data() {
    return {
      gameData: []
    };
  },
  watch: {
    getGameData: {
      handler(newValue, oldValue) {
        this.gameData = newValue;
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    ...mapGetters("roulette", ["getGameData"]),
    isNoGameData() {
      return isEmpty(this.gameData) && !this.isLoading;
    }
  },
  methods: {
    transformToHumanDate(date) {
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

<style scoped>
</style>