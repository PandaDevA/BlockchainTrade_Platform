<template>
  <div class="w-60">
    <h3 class="p1">
      <span class="s1">
        <strong>FoLEx Trading Fees</strong>
      </span>
    </h3>
    <v-table :data="trading" class="mr-4 mt-4 w-100">
      <thead class="v-table-head" slot="head">
        <th class="text-center text-white border-none uppercase module-text">Fees</th>
        <th class="text-center text-white border-none uppercase module-text">Maker</th>
        <th class="text-center text-white border-none uppercase module-text">Taker</th>
      </thead>
      <tbody slot="body" slot-scope="{displayData}">
        <tr class="v-table-body bg-white" v-for="(row, i) in displayData" :key="i">
          <td class="text-center border-none">{{ row.fee }}</td>
          <td class="text-center border-none">{{ row.maker }}</td>
          <td class="text-center border-none">{{ row.taker }}</td>
        </tr>
      </tbody>
    </v-table>
    <div class="py-4"></div>
    <h3 class="p1">
      <span class="s1">
        <strong>Deposit & Withdrawal Fees</strong>
      </span>
    </h3>
    <v-table :data="deposit" class="mr-4 mt-4 w-100">
      <thead class="v-table-head" slot="head">
        <th class="text-left text-white border-none uppercase module-text text-left">Coin/Token</th>
        <th class="text-left text-white border-none uppercase module-text text-left">Name</th>
        <th class="text-right text-white border-none uppercase module-text">Minimum Withdrawal</th>
        <th class="text-right text-white border-none uppercase module-text">Withdrawal Fee</th>
      </thead>
      <tbody slot="body" slot-scope="{displayData}">
        <tr class="v-table-body bg-white" v-for="(row, i) in displayData" :key="i">
          <td class="text-left border-none text-left">{{ row.coin }}</td>
          <td class="text-left border-none text-left">{{ row.name }}</td>
          <td class="text-right border-none">{{ row.min }}</td>
          <td class="text-right border-none">{{ row.fee }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
export default {
  layout: "info",
   head () {
    return {
      title: 'Fees | Folex'
    }
  },
  data() {
    return {
      trading: [
        {
          fee: "General",
          maker: "0.1500%",
          taker: "0.1500%"
        }
      ],
      deposit: [
        {
          coin: "BHV",
          name: "BeeHive Beechain",
          min: "20",
          fee: "5 BHV"
        },
        {
          coin: "BTC",
          name: "Bitcoin",
          min: "0.002",
          fee: "0.0005 BTC"
        },
        {
          coin: "DASH",
          name: "Dash",
          min: "0.004",
          fee: "0.002 DASH"
        },
        {
          coin: "ETH",
          name: "Ethereum",
          min: "0.02",
          fee: "0.01 ETH"
        },
        {
          coin: "FLX",
          name: "FolexCoin",
          min: "10",
          fee: "5 FLX"
        },
        {
          coin: "MOD",
          name: "Modum",
          min: "10",
          fee: "5 MOD"
        },
        {
          coin: "NEBL",
          name: "Neblio",
          min: "0.1",
          fee: "0.01 NEBL"
        },
        {
          coin: "TN",
          name: "Blackturtle",
          min: "2",
          fee: "0.02 TN"
        },
        {
          coin: "WGR",
          name: "Wagerr",
          min: "20",
          fee: "5 WGR"
        },
        {
          coin: "XSN",
          name: "Stakenet",
          min: "5",
          fee: "0.001 XSN"
        },
        {
          coin: "ZEN",
          name: "Horizen",
          min: "0.004",
          fee: "0.002 ZEN"
        }
      ]
    };
  }
};
</script>

<style scoped>
p {
  padding-left: 20px;
}
</style>