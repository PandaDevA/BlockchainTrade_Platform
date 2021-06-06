import moment from "moment";

export default function (context) {
  if (!localStorage.getItem("expire_token") || !localStorage.getItem("login")) {
    context.store.dispatch("authentication/logoutUser");
    return context.redirect("/?login=true");
  }
  const start = moment().format();
  const end = moment(localStorage.getItem("expire_token"));
  const duration = moment.duration(end.diff(start));
  console.log("Refresh in " + duration.asMinutes() + " minutes");
  // if (duration.asMinutes() <= -59) {
  //     context.store.dispatch('authentication/logoutUser', true);
  //     context.redirect('/');
  // } else if (duration.asMinutes() <= 1) {
  if (duration.asMinutes() <= 0.4) {
    return context.store
      .dispatch("authentication/refreshToken")
      .then(res => {
        return context.store.dispatch("profile/loadAvatar");
      })
      .catch(e => {
        console.log("Refresh token error", e);
        context.store.dispatch("authentication/logoutUser");
        return context.redirect("/?login=true");
      });
  }
}
