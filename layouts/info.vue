<template>
  <div>
    <a-header/>
    <section class="default-page-wrapper">
      <div class="d-flex-full-center">
        <nuxt/>
      </div>
    </section>
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
