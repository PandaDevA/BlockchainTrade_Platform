<template>
  <div>
    <a-header/>
    <nuxt/>
    <a-footer/>
    <notifications position="bottom right"/>
  </div>
</template>

<script>
import AFooter from "@/components/blocks/AFooter";
import AHeader from "@/components/blocks/AHeader";
export default {
  components: { AFooter, AHeader }
};
</script>

<style>
</style>
