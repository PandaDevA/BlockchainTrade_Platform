import { get } from "lodash";
export default {
  state: () => ({
    auth: {
      login: null,
      access_token: null,
      expire_token: null,
      refresh_token: null
    }
  }),
  getters: {
    getToken(state) {
      return (
        get(state, "auth.access_token") || localStorage.getItem("access_token")
      );
    },
    getUserName(state) {
      return (
        get(state, "auth.login") || localStorage.getItem("login") || "guest"
      );
    },
    isAuthenticated(state) {
      return !(
        get(state, "auth.access_token") == null &&
        localStorage.getItem("access_token") == null
      );
    }
  },
  mutations: {
    saveAuthData(state, payload) {
      state.auth = payload;
    },
    deleteAuthData(state) {
      state.auth = {
        login: null,
        access_token: null,
        expire_token: null,
        refresh_token: null
      };
    }
  },
  actions: {
    async createUser({ commit }, payload) {
      try {
        const response = await this.$axios.$post("/account/create", payload);
        return response;
      } catch (e) {
        console.log("Create user error", e);
        return get(e, "response.data");
      }
    },
    async loginUser({ commit }, credentials) {
      try {
        const auth = await this.$axios.$post("/auth/login", credentials);

        if (auth.needAuthenticationCode) return auth;

        if (!auth.access_token) return;
        commit("saveAuthData", auth);
        this.$axios.setToken(auth.access_token, "Bearer");
        localStorage.setItem("login", auth.login);
        localStorage.setItem("access_token", auth.access_token);
        localStorage.setItem("refresh_token", auth.refresh_token);
        localStorage.setItem("expire_token", auth.expire_token);
        return auth;
      } catch (e) {
        console.log("Login user error", e);
        return { error: get(e, "response.data") };
      }
    },
    async loginUser2FA({ commit }, credentials) {
      try {
        const auth = await this.$axios.$post(
          "/auth/twoFactorAuthCodeLogin",
          credentials
        );

        if (get(auth, "errorMsg") && get(auth, "token"))
          return { newToken: auth.token };
        if (!auth.access_token) return;
        commit("saveAuthData", auth);
        this.$axios.setToken(auth.access_token, "Bearer");
        localStorage.setItem("login", auth.login);
        localStorage.setItem("access_token", auth.access_token);
        localStorage.setItem("refresh_token", auth.refresh_token);
        localStorage.setItem("expire_token", auth.expire_token);
        return auth;
      } catch (e) {
        console.log("Login user error", e);
      }
    },
    async refreshToken({ commit }) {
      this.$axios.setToken(localStorage.getItem("refresh_token"), "Bearer");
      return this.$axios.$post("/auth/refresh").then(res => {
        this.$axios.setToken(res.access_token, "Bearer");
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("refresh_token", res.refresh_token);
        localStorage.setItem("expire_token", res.expire_token);
        return res;
      });
    },
    async logoutUser({ commit }, withoutRequest = false) {
      try {
        this.$axios.setToken(false);
        localStorage.removeItem("login");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("expire_token");
        localStorage.removeItem("theme");
        commit("deleteAuthData");
        if (withoutRequest) return true;
        // const response = await this.$axios.$post("/auth/logout");
        // return response;
        return Promise.resolve();
      } catch (e) {
        console.log("Logout user error", e);
      }
    },
    async resetPassword(context, { login, email }) {
      try {
        const url = `/account/reset?login=${login}&email=${email}`;
        const resp = await this.$axios.$get(url);
        return resp;
      } catch (e) {
        console.log("Logout user error", e);
      }
    },
    async reset2FA(context, data) {
      try {
        const url = `/auth/resetTwoFactorAuth`;
        const resp = await this.$axios.$post(url, data);
        return resp;
      } catch (e) {
        console.log("Logout user error", e);
      }
    },
    async send2FA(context, code) {
      try {
        const url = `/auth/check2FA/${code}`;
        await this.$axios.$get(url);
        return { success: true };
      } catch (e) {
        console.error("Logout user error", e);
        return { error: get(e, 'response.data') || 'Server error' };
      }
    }
  }
};
