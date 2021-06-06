<template>
  <div>
    <div style="z-index: 10;" class="top-menu home">
      <nuxt-link
        :to="homeLink"
        class="logo-wrapper home"
        data-ix="left-menu-full-appear"
        style="transition: background-color 0.2s ease 0s;"
      ></nuxt-link>
      <div class="account-wrapper">
        <img src="/images/avatar.svg" alt class="avatar">
        <a v-show="showLogout" v-promise-btn @click="logout" class="pointer link-top">Log out</a>
        <a v-show="!showLogout" @click="openModal('login')" class="pointer link-top">Sign in</a>
        <div class="separator">/</div>
        <a @click="openModal('register')" class="link-top" data-ix="pop-up-register">Register</a>
      </div>
    </div>
    <register-modal ref="register"/>
    <login-modal ref="login" @openModal="openModal"/>
    <reset-password-modal ref="reset-password" @openModal="openModal"/>
    <reset-2FA-modal ref="reset-2fa" @openModal="openModal"/>
  </div>
</template>

<script>
import RegisterModal from "@/components/_shared/RegisterModal";
import LoginModal from "@/components/_shared/LoginModal";
import ResetPasswordModal from "@/components/_shared/ResetPasswordModal";
import Reset2FAModal from "@/components/_shared/Reset2FAModal";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    RegisterModal,
    LoginModal,
    ResetPasswordModal,
    Reset2FAModal
  },
  data() {
    return {
      showLogout: false
    };
  },
  created() {
    if (this.isAuthenticated && this.$route.path === "/") {
      this.$router.push("/home");
    }
  },
  mounted() {
    this.showLogout = this.isAuthenticated;
  },
  watch: {
    "$route.query.login": {
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          if (newValue) this.openModal("login");
        });
      },
      immediate: true
    },
    "$route.query.register": {
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          if (newValue) this.openModal("register");
        });
      },
      immediate: true
    },
  },
  computed: {
    ...mapGetters("authentication", ["isAuthenticated"]),
    homeLink() {
      return this.isAuthenticated ? "/home" : "/";
    }
  },
  methods: {
    ...mapActions("authentication", ["logoutUser"]),
    logout() {
      return new Promise(async (res, rej) => {
        try {
          await this.logoutUser();
          this.showLogout = false;
        } catch (error) {
          console.log(error);
        } finally {
          res();
        }
      });
    },
    openModal(e) {
      this.closeAllModals();
      this.$refs[e].isOpen = true;
    },
    closeModal(e) {
      this.$refs[e].isOpen = false;
    },
    closeAllModals() {
      this.closeModal("login");
      this.closeModal("register");
      this.closeModal("reset-password");
      this.closeModal("reset-2fa");
    }
  }
};
</script>

<style scoped>
</style>