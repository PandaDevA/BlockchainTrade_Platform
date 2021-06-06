<template>
  <div class="dashboard-wrapper-light-roulette">
    <div class="full-height-page-wrapper">
      <roulette-board/>
      <roulette-game-data :is-loading="isLoading"/>
    </div>
    <notifications position="top right" group="roulette"/>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import RouletteBoard from "@/components/_sections/roulette/RouletteBoard";
import RouletteGameData from "@/components/_sections/roulette/RouletteGameData";

export default {
  middleware: "authentication",
  layout: "profile",
   head () {
    return {
      title: 'Roulette | Folex'
    }
  },
  components: {
    RouletteBoard,
    RouletteGameData
  },
  data() {
    return {
      isLoading: true
    };
  },
  created() {
    this.runSocketConnection();
    this.loadTradingState().then(() => (this.isLoading = false));
  },
  computed: {},
  methods: {
    ...mapActions("roulette", ["loadTradingState", "runSocketConnection"])
  }
};
</script>

<style scoped>
.dashboard-wrapper-light-roulette {
  margin-bottom: 40px;
}
</style>