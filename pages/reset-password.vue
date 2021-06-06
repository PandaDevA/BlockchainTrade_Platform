<template>
  <div>
    <div style="height: 90vh;" class="d-flex-full-center">
      <a-spinner v-if="isLoading"/>
      <div v-else class="w-40">
        <div v-if="isReset">
          <h2>That worked!</h2>
          <p class="mt-4 mb-1">You have created a new password!</p>
          <p class="mb-1">Log-in here with your username and password:</p>
          <a @click="goToMainPage" class="btn small w-button">Login</a>
          <br>
          <p class="mt-4">Your Folex Team</p>
        </div>
        <div v-else>
          <h2>Create new password</h2>
          <label for="password-3">Password:</label>
          <input
            v-model="password"
            @keyup.enter="createPassword"
            type="password"
            class="input-custom-round text-left my-2"
            maxlength="256"
            placeholder="New password"
          >
          <label for="password-3">Confirm Password:</label>
          <input
            v-model="confirmPassword"
            @keyup.enter="createPassword"
            type="password"
            class="input-custom-round text-left mt-2 mb-4"
            maxlength="256"
            placeholder="Confirm password"
          >
          <a @click="createPassword" class="btn small w-button">Create</a>
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
      title: "Reset Password | Folex"
    };
  },
  data() {
    return {
      isLoading: false,
      isReset: false,
      password: null,
      confirmPassword: null
    };
  },
  async mounted() {
   
  },
  computed: {
    isPasswordConfimed() {
      return this.password && this.password === this.confirmPassword;
    }
  },
  methods: {
    createPassword() {
      if (!this.isPasswordConfimed) {
        return this.$notify({
          type: "error",
          title: `Password and Confirm password should be the same`,
          duration: this.notificationDuration
        });
      }

       const queryString = window.location.search.slice(1);
       const token = queryString.split('=')[1];
    const baseUrl = this.$axios.defaults.baseURL;
    const url = `${baseUrl}/account/update-password`;
    const payload = {
      Token: token,
      Password: this.password,
      ConfirmPassword: this.confirmPassword
    };
    this.$axios
      .$post(url, payload)
      .then(res => {
        this.isReset = true;
        this.isLoading = false;
         this.$notify({
        type: "success",
        title: `Success`,
        duration: this.notificationDuration
      });
      })
      .catch(err => {
        console.log(err);
        this.isLoading = false;
         this.$notify({
        type: "error",
        title: `Something went wrong`,
        duration: this.notificationDuration
      });
      });
    },
    goToMainPage() {
      this.$router.push({ path: "/", query: { confirm: true } });
    }
  }
};
</script>

<style scoped>
</style>