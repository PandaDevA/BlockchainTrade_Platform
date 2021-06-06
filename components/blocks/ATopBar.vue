<template>
  <div class="top-menu justify-between">
    <div class="menu-list d-flex-full-center">
      <!-- <nuxt-link to="/mining" class="link-top ml-4">Mining</nuxt-link> -->
    </div>
    <div class="account-wrapper">
      <div v-if="showThemeSwitch" class="theme-wrapper">
        <div @click="changeTheme('light')" class="theme-button-wrapper">
          <img src="/images/002-sun_1.svg" alt class="themeimg">
        </div>
        <div @click="changeTheme('dark')" class="theme-button-wrapper">
          <img src="/images/001-night_1.svg" alt class="themeimg">
        </div>
      </div>
      <div class="icon-menu-wrapper">
        <div data-delay="0" data-hover="1" class="w-dropdown">
          <div class="notification-toggle w-dropdown-toggle" id="settings">
            <div class="settings-wrapper" data-ix="bell-animation"></div>
            <nav class="dropdown-list-2 w-dropdown-list">
              <nuxt-link to="/profile/edit-profile" class="text-white w-dropdown-link">Edit profile</nuxt-link>
              <nuxt-link to="/profile/kyc-process" class="text-white w-dropdown-link">Verification</nuxt-link>
              <nuxt-link to="/profile/security" class="text-white w-dropdown-link">Security</nuxt-link>
                  <a v-promise-btn @click="logout" class="menu-item-left-full w-inline-block">
        <img src="/images/007-enter.svg" alt class="menu-icon">
        <div class="link-left">Logout</div>
      </a>
            </nav>
          </div>
        </div>
      </div>
      <div class="user-wrapper">
        <img ref="profileTopImage" src="/images/profileimg.jpg" alt class="profile-image">
        <div class="name mx-2">{{ userName || 'user name'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      userName: "",
      isNotificationsOpen: false,
      isSettingsOpen: false
    };
  },
  mounted() {
    this.userName = this.getUserName;
    this.loadUserAvatar();
  },
  watch: {
    avatar(newValue, oldValue) {
      if (newValue) this.$refs.profileTopImage.src = newValue;
    },
    "profileData.login"(newValue, oldValue) {
      this.userName = newValue;
    }
  },
  computed: {
    ...mapGetters("authentication", ["getUserName"]),
    ...mapState("profile", ["avatar", "profileData", "showThemeSwitch"])
  },
  methods: {
    ...mapActions("profile", ["loadAvatar", "changeTheme"]),
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
    },
    async loadUserAvatar() {
      try {
        if (this.avatar && this.$refs.profileTopImage.src == this.avatar)
          return;
        const avatar = await this.loadAvatar();
        if (!avatar) return;
        this.$refs.profileTopImage.src = this.avatar;
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style scoped>
.menu-list {
  margin-left: 80px;
}
#notifications:hover .bell-wrapper,
#notifications:hover .w-dropdown-list,
#settings:hover .settings-wrapper,
#settings:hover .w-dropdown-list {
  margin-bottom: 10px;
  padding-right: 0px;
  padding-left: 0px;
  border-radius: 3px;
}

.account-wrapper .icon-menu-wrapper {
  margin-right: 0;
}
.account-wrapper .user-wrapper {
  margin-left: 14px;
}
.account-wrapper .profile-image {
  vertical-align: middle;
  z-index: 9999;
  border-radius: 50%;
  width: auto;
  height: 32px;
  transition: all 0.5s ease-out;
}
.account-wrapper .profile-image:hover {
  border-radius: 0;
  height: 60px;
  transition: all 0.5s ease-out;
  width: auto;
  transform: scale(2);
  transform-origin: 0% 0%;
}
.account-wrapper .themeimg {
  width: 20px;
}
.account-wrapper .theme-wrapper {
  margin-right: 8px;
}

.settings-wrapper {
  width: 24px;
  height: 24px;
  margin-top: 4px;
  background-image: url("~assets/images/001-settings.svg");
  background-position: 0px 0px;
  background-size: contain;
  background-repeat: no-repeat;
  transition: transform 1s ease;
}

.settings-wrapper:hover {
  transition: transform 1s ease;
  -webkit-transform: rotate(-50deg);
  -ms-transform: rotateZ(-50deg);
  transform: rotateZ(-50deg);
}

#notifications:hover .w-dropdown-list,
#settings:hover .w-dropdown-list {
  background-color: #777;
  display: block;
}

.bell-wrapper {
  transition: transform 1s ease;
}

.bell-wrapper:hover {
  transition: transform 1s ease;
  -webkit-animation: tic-toc 0.7s infinite;
  animation: tic-toc 0.7s infinite;
}

.w-dropdown-list .w-dropdown-link:hover {
  background-color: #a7a7a7;
}

@-webkit-keyframes tic-toc {
  0% {
    transform: rotateZ(0deg);
  }
  20% {
    transform: rotateZ(-15deg);
  }
  80% {
    transform: rotateZ(-15deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}

@keyframes tic-toc {
  0% {
    transform: rotateZ(0deg);
  }
  20% {
    transform: rotateZ(-15deg);
  }
  40% {
    transform: rotateZ(5deg);
  }
  60% {
    transform: rotateZ(-5deg);
  }
  100% {
    transform: rotateZ(15deg);
  }
}
</style>