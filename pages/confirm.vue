<template>
  <div>
    <div style="height: 90vh;" class="d-flex-full-center">
      <a-spinner v-if="isLoading"/>
      <div v-else class="w-40">
        <div v-if="confirmed">
          <h2>That worked!</h2>
          <p class="mt-4">You have confirmed your email address and we have activated your account!</p>
          <p class="mt-4">Log-in here with your username and password:</p>
          <a @click="goToMainPage" class="btn small w-button">Login</a>
          <p class="mt-4">
            We do our best to protect your account, your data and especially your crypto currencies!
            At this point we ask you to activate the two-factor authentication in the menu point Security in order to guarantee an even higher security for your account!
            For your security, the Withdrawal feature only becomes active once you have successfully activated two-factor authentication.
          </p>
          <p class="mt-4">We hope you enjoy this and wish you a pleasant time on folex.io.</p>
          <p class="mt-4">Your Folex Team</p>
        </div>
        <div v-else>
          <h2>Ooops, something went wrong</h2>
          <p>Please, check your verification link again.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "empty",
  head() {
    return {
      title: "Confirm | Folex"
    };
  },
  data() {
    return {
      isLoading: true,
      confirmed: false
    };
  },
  async mounted() {
    const queryString = window.location.search.slice(1);
    const baseUrl = this.$axios.defaults.baseURL;
    const path = `${baseUrl}/account/confirm?${queryString}`;
    this.$axios
      .$get(path)
      .then(res => {
        this.confirmed = true;
        this.isLoading = false;
      })
      .catch(err => {
        console.log(err);
        this.isLoading = false;
      });
  },
  methods: {
    goToMainPage() {
      this.$router.push({ path: "/", query: { login: true } });
    }
  }
};
</script>

<style scoped>
</style>