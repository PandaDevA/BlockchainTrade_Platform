<template>
  <div class="wrap">
    <p v-if="isNoLastUpdates" class="text-center mt-2">No data</p>
    <div v-else-if="isLoading" class="d-flex-full-center w-100">
      <a-spinner/>
    </div>
    <div
      v-else
      class="content-transactionshistory round-border d-flex justify-around grey-bottom mb-4"
    >
      <v-table class="mr-4 w-100" :data="lastUpdates">
        <thead class="v-table-head table-head-red" slot="head">
          <th class="pl-4 text-left text-white border-none uppercase module-text">Pair</th>
          <th class="text-left text-white border-none uppercase module-text">Coin</th>
          <th class="text-right text-white border-none uppercase module-text">Last Price</th>
          <th class="text-right text-white border-none uppercase module-text">24h Change</th>
          <th class="text-right text-white border-none uppercase module-text">24h High</th>
          <th class="text-right text-white border-none uppercase module-text">24h Low</th>
          <th class="pr-4 text-right text-white border-none uppercase module-text">24h Volume</th>
        </thead>
        <tbody class="bg-white" slot="body" slot-scope="{displayData}">
          <tr
            class="v-table-body v-table-border-bottom"
            v-for="row in displayData"
            :key="JSON.stringify(row)"
          >
            <td class="pl-4 text-left border-none">{{ row.pair }}</td>
            <td class="text-left border-none">{{ row.coinName }}</td>
            <td class="text-right border-none">{{ scientificToDecimal(toFixedSmall(row.btcPrice)) }}</td>
            <td
              :class="{'text-green': row.change >= 0, 'text-red': row.change < 0}"
              class="text-right border-none"
            >{{ row.change.toFixed(2) }}%</td>
            <td
              class="text-right border-none"
            >{{ scientificToDecimal(toFixedSmall(row.highPrice)) }}</td>
            <td class="text-right border-none">{{ scientificToDecimal(toFixedSmall(row.lowPrice)) }}</td>
            <td
              class="pr-4 text-right border-none"
            >{{ scientificToDecimal(toFixedSmall(row.volume)) }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { isEmpty } from "lodash";

export default {
  data() {
    return {
      isLoading: true
    };
  },
  mounted() {
    this.loadLastUpdates().finally(() => {
      this.isLoading = false;
    });
  },
  computed: {
    ...mapState("home", ["lastUpdates"]),
    isNoLastUpdates() {
      return isEmpty(this.lastUpdates) && !this.isLoading;
    }
  },
  methods: {
    ...mapActions("home", ["loadLastUpdates"])
  }
};
</script>

<style scoped>
</style>