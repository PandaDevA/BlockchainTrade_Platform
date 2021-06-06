<template>
  <div>
    <div class="page-wrapper">
      <div class="wrap hero">
        <div class="col-s">
          <div class="hero3-text-wrapper">
            <div class="hero3-headline-wrap">
              <h1 class="heading">Time to get your investments to the next level!</h1>
              <div class="text-20 text-20-60">Folex – Future Of Trading</div>
            </div>
            <div></div>
          </div>
        </div>
        <div class="col-wr col-wr-last">
          <img
            src="/images/logo-head.png"
            srcset="images/logo-head-p-500.png 500w, images/logo-head.png 800w"
            sizes="(max-width: 479px) 100vw, (max-width: 767px) 46vw, (max-width: 991px) 322.5px, 350px"
            alt
            class="logo-right"
          >
        </div>
      </div>
    </div>
    <div class="section">
      <a-table-last-update/>
    </div>
    <home-folex-coin id="folex-coin"></home-folex-coin>
    <home-coins id="coins"></home-coins>
    <home-features id="more"></home-features>
    <home-partners id="partners"></home-partners>
  </div>
</template>

<script>
import HomeFolexCoin from "@/components/_sections/index/HomeFolexCoin";
import HomeCoins from "@/components/_sections/index/HomeCoins";
import HomeFeatures from "@/components/_sections/index/HomeFeatures";
import HomePartners from "@/components/_sections/index/HomePartners";
import ATableLastUpdate from "@/components/_shared/ATableLastUpdate";

export default {
  layout: "profile",
  middleware: "authentication",
   head () {
    return {
      title: 'Home | Folex'
    }
  },
  components: {
    HomeFolexCoin,
    HomeCoins,
    HomeFeatures,
    HomePartners,
    ATableLastUpdate
  }
};
</script>

<style scoped>
</style>