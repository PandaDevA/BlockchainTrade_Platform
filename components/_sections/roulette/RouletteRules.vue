<template>
  <div>
    <div id="rules">
      <a id="rules-btn" @click="openModal('rules')">Check Rules*</a>
      <ui-modal class="text-black" ref="rules" title="Rules">
        <roulette-rules-table/>
      </ui-modal>
    </div>
  </div>
</template>

<script>
import RouletteRulesTable from "@/components/_sections/roulette/RouletteRulesTable";

export default {
  components: {
    RouletteRulesTable
  },
  methods: {
    openModal(ref) {
      this.$refs[ref].open();
    },
    closeModal(ref) {
      this.$refs[ref].close();
    }
  }
};
</script>

<style scoped>
#rules {
  cursor: pointer;
  position: absolute;
  margin-left: -110px;
  margin-top: 10px;
  color: #f7f7f7;
  z-index: 600020;
}
#rules:hover {
  text-decoration: underline;
}
</style>