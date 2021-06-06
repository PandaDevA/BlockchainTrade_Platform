<template>
  <section id="profile-wrapper">
    <a-top-bar/>
    <!-- <div id="banner-info" class="w-100 uppercase text-center">
      <h2>FLX sto live: Buy FLX from the order book now, 100% of trading fees get shared to all token holders. Kyc required.</h2>
    </div>-->
    <a-side-menu/>
    <div class="page-wrapper">
      <nuxt/>
    </div>
    <a-footer/>
    <notifications position="bottom right"/>
  </section>
</template>

<script>
import ATopBar from "@/components/blocks/ATopBar";
import ASideMenu from "@/components/blocks/ASideMenu";
import AFooter from "@/components/blocks/AFooter";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    ATopBar,
    ASideMenu,
    AFooter
  },
  created() {
    this.$axios.setToken(this.getToken, "Bearer");
  },
  computed: {
    ...mapGetters("authentication", ["getToken"])
  }
};
</script>

<style>
/* #banner-info {
  position: fixed;
  top: 30px;
  padding-left: 56px;
  width: 100%;
  background-color: #a63230;
  color: red;
}
#banner-info h2 {
  font-size: 18px;
  white-space: nowrap;
} */

#profile-wrapper {
  /* overflow-x: hidden; */
  width: 100%;
}
</style>
