import {
  get
} from "lodash";

export default {
  state: () => ({
    avatar: null,
    showThemeSwitch: false,
    theme: localStorage.getItem("theme") || "light",
    profileData: {
      appProfile: {
        timeZone: 0,
        local: 0,
        kycProcess: 0,
        maximumFollowerBTC: 0,
        mode: 0,
        notifyOnTrade: null,
        notifyOnTradeError: null,
        notifyOnCancelledOrder: null,
        notifyOnLoginAccount: null,
        notifyOnSubscriptionExpiration: null,
        getNewsletter: null,
        colorSelection: 0
      },
      login: "",
      firstName: "",
      lastName: "",
      password: "",
      email: ""
    },
    kycProcessData: {
      firstName: "",
      middleName: "",
      lastName: "",
      address1: "",
      address2: "",
      zipCode: "",
      city: "",
      region: "",
      country: "",
      passportId: "",
      dataOfIssue: "",
      expiringDate: ""
    }
  }),
  getters: {
    getUserName(state) {
      return get(state, "profileData.login");
    }
  },
  mutations: {
    toggleThemeSwitch(state, isShow) {
      state.showThemeSwitch = isShow;
    },
    setTheme(state, theme) {
      state.theme = theme;
    },
    saveProfileData(state, payload) {
      state.profileData = payload;
    },
    saveKycProcessData(state, payload) {
      state.kycProcessData = payload;
    },
    saveAvatar(state, avatar) {
      state.avatar = avatar;
    },
    saveUserName(state, name) {
      localStorage.setItem("login", name);
      state.profileData.login = name;
    }
  },
  actions: {
    changeTheme({
      commit
    }, theme) {
      commit("setTheme", theme);
      localStorage.setItem("theme", theme);
    },
    async loadProfileData({
      commit
    }) {
      try {
        const data = await this.$axios.$get("/profile/userProfile");
        commit("saveProfileData", data);
        return data;
      } catch (e) {
        console.log("Loading profile data error", e);
        return e;
      }
    },
    async loadAvatar({
      commit
    }) {
      try {
        const avatar = await this.$axios.$get(`/profile/kycImage?imageType=5`, {
          responseType: "arraybuffer"
        });
        const image =
          "data:image/jpeg;base64," +
          btoa(
            new Uint8Array(avatar).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
        commit("saveAvatar", image);
        return image;
      } catch (e) {
        console.log("Loading avatar error", e);
      }
    },
    async loadKycProcess({
      commit
    }) {
      try {
        const data = await this.$axios.$get("/profile/kycProfile");
        commit("saveKycProcessData", data);
        return data;
      } catch (e) {
        console.log("Loading kyc process error", e);
        return e;
      }
    },
    async loadSecret({
      commit
    }) {
      try {
        const data = await this.$axios.$get("/auth/turnOnTwoFactorAuth");
        return data;
      } catch (e) {
        console.log("Loading secret error", e);
        return e;
      }
    },
    activate2FA({
      commit
    }, data) {
      return this.$axios
        .$post("/auth/confirmTurnOnTwoFactorAuth", data)
        .then(res => {
          return res;
        })
        .catch(err => {
          console.error(err);
          return { error: get(err, 'response.data') || 'Server error' };
        });
    },
    deactivate2FA({
      commit
    }, data) {
      return this.$axios
        .$post("/auth/confirmTurnOffTwoFactorAuth", data)
        .then(res => {
          return res;
        })
        .catch(err => {
          console.error(err);
          return {
            error: get(err, 'response.data') || 'Server error'
          };
        });
    },
    getTempToken({
      commit
    }, data) {
      return this.$axios
        .$post("/auth/turnOffTwoFactorAuth", data)
        .then(res => {
          return res;
        })
        .catch(console.log);
    },
    isTwoFactorAuthTurnOn(context) {
      return this.$axios
        .$get("/auth/isTwoFactorAuthTurnOn")
        .then(res => {
          return res;
        })
        .catch(console.log);
    },
    loadLogginHistory(context) {
      return this.$axios
        .$get("/profile/recentlogin")
        .then(res => {
          return res;
        })
        .catch(console.log);
    },
    loadBotToken(context) {
      return this.$axios
        .$get("/auth/generateApiKey")
        .then(res => {
          return res;
        })
        .catch(error => ({
          error: get(error, 'response.data') ? error.response.data : 'Something went wrong'
        }));
    }
  }
};
