export default function ({ $axios, redirect, store, route }) {
  $axios.onError(error => {
    if (error.response.status === 401 && localStorage.getItem("access_token")) {
      store
        .dispatch("authentication/refreshToken")
        .then(res => {
          store.dispatch("profile/loadAvatar");
        })
        .catch(e => {
          console.log("Refresh axios token error", e);
          store.dispatch("authentication/logoutUser");
          redirect("/?login=true");
        });
    }
  });
}
