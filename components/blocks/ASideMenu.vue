<template>
  <section>
    <div :style="$route.name === 'trading' ? 'padding-top: 130px;' : ''" class="left-menu">
      <nuxt-link
        v-for="item in menuItems"
        :key="JSON.stringify(item)"
        exact
        exactActiveClass="active-menu-item"
        :to="item.path"
        active-class="active-menu-item"
        class="menu-item-left w-inline-block"
        data-ix="menu-item-left"
      >
        <img :src="`/images/${item.icon}.svg`" alt class="menu-icon">
        <div class="link-left" data-ix="link-text-initial">{{ item.title }}</div>
      </nuxt-link>
      <!-- <a v-promise-btn @click="logout" class="menu-item-left w-inline-block">
        <img src="/images/007-enter.svg" alt class="menu-icon">
        <div class="link-left">Logout</div>
      </a> -->
    </div>
    <div :class="{ 'opened': isOpened }" class="left-menu-full" data-ix="left-menu-full-initial">
      <nuxt-link
        v-for="item in menuItems"
        :key="JSON.stringify(item)"
        exact
        exactActiveClass="active-menu-item"
        :to="item.path"
        active-class="active-menu-item"
        class="menu-item-left-full w-inline-block"
      >
        <img :src="`/images/${item.icon}.svg`" alt class="menu-icon">
        <div class="link-left">{{ item.title }}</div>
      </nuxt-link>
      <!-- <a v-promise-btn @click="logout" class="menu-item-left-full w-inline-block">
        <img src="/images/007-enter.svg" alt class="menu-icon">
        <div class="link-left">Logout</div>
      </a> -->
    </div>
    <div @click="isOpened = true" class="logo-wrapper" data-ix="left-menu-full-appear"></div>
    <div
      @click="isOpened = false"
      :class="{ 'opened': isOpened }"
      class="logo-wrapper-hidden"
      data-ix="left-menu-full-dissapear"
    ></div>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      menuItems: [
        {
          title: "Home",
          icon: "home_icon",
          path: "/home"
        },
        {
          title: "Trading",
          icon: "iconmonstr-chart-16",
          path: "/trading"
        },
        {
          title: "Wallets",
          icon: "002-wallet",
          path: "/wallets"
        },
        {
          title: "Balances",
          icon: "balance",
          path: "/balances"
        },
        {
          title: "Profits",
          icon: "profits_pos",
          path: "/profits"
        },
        {
          title: "Roulette",
          icon: "roulette",
          path: "/roulette"
        },
        {
          title: "Pooling",
          icon: "Pooling_deposit_01",
          path: "/pooling"
        },
        {
          title: "Trade History",
          icon: "Purchase_Order",
          path: "/trading-history"
        },
        {
          title: "Transactions History",
          icon: "history",
          path: "/transactions-history"
        },
      ],
      isOpened: false
    };
  },
  methods: {
    ...mapActions("authentication", ["logoutUser"]),
    logout() {
      return new Promise(async (res, rej) => {
        try {
          await this.logoutUser();
          this.$router.push("/");
        } catch (error) {
          console.log(error);
        } finally {
          res();
        }
      });
    }
  }
};
</script>

<style scoped>
.left-menu {
  z-index: 2;
  transition: all 0.5s ease;
}
.left-menu .link-left {
  display: none;
}
.left-menu-full,
.logo-wrapper-hidden {
  transition: width 0.2s ease 0s;
}

.left-menu-full.opened {
  width: 130px;
  display: block;
  transition: width 0.2s ease 0s;
}
.logo-wrapper-hidden.opened {
  transition: background-color 0.2s ease 0s;
  display: block;
}
.menu-item-left {
  padding-right: 12px;
}
.menu-item-left.w-inline-block:hover {
  min-width: max-content;
}
.menu-item-left.w-inline-block:hover .link-left {
  display: block;
}
</style>