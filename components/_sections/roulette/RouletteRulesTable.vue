<template>
  <v-table :data="rules" class="mr-4 w-100">
    <thead class="v-table-head" slot="head">
      <th class="text-center text-white border-none uppercase module-text">Placement</th>
      <th class="text-center text-white border-none uppercase module-text">Cover</th>
      <th class="text-center text-white border-none uppercase module-text">Quota</th>
      <th class="text-center text-white border-none uppercase module-text">Winning Probability</th>
      <th v-if="!terms" class="text-center text-white border-none uppercase module-text">Max Bet</th>
    </thead>
    <tbody slot="body" slot-scope="{displayData}">
      <tr
        :class="{'bg-white': terms}"
        class="v-table-body"
        v-for="(row, i) in displayData"
        :key="i"
      >
        <td class="text-center border-none">{{ row.placement }}</td>
        <td class="text-center border-none">{{ row.coverage }}</td>
        <td class="text-center border-none">{{ row.ratio }}</td>
        <td class="text-center border-none">{{ row.percentage }}</td>
        <td v-if="!terms" class="text-center border-none">{{ row.maxBet }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
const maxBet = 500;

export default {
  props: {
    terms: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules: [
        {
          placement: "Straight up bet",
          coverage: "1 number",
          ratio: "35:1",
          percentage: "2,6%",
          maxBet
        },
        {
          placement: "Split bet	",
          coverage: "2 numbers",
          ratio: "17:1",
          percentage: "5,3%",
          maxBet
        },
        {
          placement: "Street bet, First Three",
          coverage: "3 numbers",
          ratio: "11:1",
          percentage: "7,9%",
          maxBet
        },
        {
          placement: "Corner, First Four",
          coverage: "4 numbers",
          ratio: "8:1",
          percentage: "10,5%",
          maxBet
        },
        {
          placement: "First Five",
          coverage: "5 numbers",
          ratio: "6:1",
          percentage: "13,2%",
          maxBet
        },
        {
          placement: "Line Bet",
          coverage: "6 numbers",
          ratio: "5:1",
          percentage: "15,8%",
          maxBet
        },
        {
          placement: "Dozen, Column",
          coverage: "12 numbers",
          ratio: "2:1",
          percentage: "31,6%",
          maxBet
        },
        {
          placement: "Simple Chances",
          coverage: "18 numbers",
          ratio: "1:1",
          percentage: "47,4%",
          maxBet
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>