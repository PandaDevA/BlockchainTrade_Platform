<template>
  <div>
    <div style="height: 90vh;" class="d-flex-full-center">
      <a-spinner v-if="isLoading"/>
      <div v-else class="w-80">
        <div v-if="confirmRequest && !error">
          <h2>That worked!</h2>
          <br>
          <p class="mt-2 mb-4">
            You have
            <span class="text-green">CONFIRMED</span> a withdrawal!
          </p>
          <div class="info__wrapper d-flex f-wrap w-90 bg-white">
            <div class="info d-flex-full-center">
              <div class="info__title w-70">Coin</div>
              <div class="info__value w-100">{{ coin }}</div>
            </div>
            <div class="info d-flex-full-center">
              <div class="info__title w-70">Amount</div>
              <div class="info__value w-100">{{ amount }}</div>
            </div>
            <div class="info d-flex-full-center">
              <div class="info__title w-70">Fee</div>
              <div class="info__value w-100">{{ fee }}</div>
            </div>
            <div class="info d-flex-full-center">
              <div class="info__title w-70">Address to</div>
              <div class="info__value w-100">{{ address }}</div>
            </div>
            <div class="info d-flex-full-center">
              <div class="info__title w-70">Transaction Id</div>
              <div class="info__value w-100">{{ transactionId }}</div>
            </div>
            <div id="info__icon" class="info d-flex-full-center">
              <div class="info__title w-70">Check status in {{ coin || '[COIN]' }} Block Explorer</div>
              <div class="info__value w-100">
                <a v-if="url" :href="url" target="_blank">
                  <fa icon="external-link-alt"/>
                </a>
              </div>
            </div>
          </div>
          <br>
          <p class="mt-4">Your Folex Team</p>
        </div>
        <div v-else-if="confirmRequest === false && !error">
          <h2>That worked!</h2>
          <p class="mt-4">
            You have
            <span class="text-red">CANCELED</span> a withdrawal!
          </p>
          <br>
          <p class="mt-2">Your Folex Team</p>
        </div>
        <div v-if="error" class="error d-flex-full-center w-60">
          <div v-if="typeof(error) === 'string'">
            <h2>Error!</h2>
            <p class="mt-2 mb-4">Sorry, but {{ error }}</p>
          </div>
          <div v-else>
            <h2>Problem with the server!</h2>
            <p class="mt-2 mb-4">
              Please
              <a
                href="mailto:support@folex.io"
                class="link-dark footer-link-12-dark"
              >contact our support team.</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "lodash";

export default {
  middleware: "authentication",
  layout: "profile",
  head() {
    return {
      title: "Withdrawal | Folex"
    };
  },
  data() {
    return {
      isLoading: true,
      confirmRequest: false,
      id: null,
      coin: "-",
      url: "-",
      transactionId: "-",
      address: "-",
      amount: 0,
      fee: 0,
      error: false
    };
  },
  async mounted() {
    this.id = this.$route.query.id;
    this.confirmRequest = this.$route.query.confirm;

    if (
      !(this.confirmRequest === "true" || this.confirmRequest === "false") ||
      !this.id
    )
      return this.$router.push("/balances");

    this.confirmRequest = this.confirmRequest === "true";
    this.sendResuest();
  },
  methods: {
    sendResuest() {
      const baseUrl = this.$axios.defaults.baseURL;
      const url = `${baseUrl}/wallets/confirm-withdrawal`;
      const payload = {
        id: this.id,
        confirm: this.confirmRequest
      };
      this.$axios
        .$post(url, payload)
        .then(
          ({ currencyShortName, address, url, transactionId, amount, fee }) => {
            this.$notify({
              type: "success",
              title: `Success`,
              duration: this.notificationDuration
            });
            this.isLoading = false;

            if (!this.confirmRequest) return;

            this.url = url;
            this.transactionId = transactionId;
            this.coin = currencyShortName;
            this.address = address;
            this.amount = amount;
            this.fee = fee;
          }
        )
        .catch(err => {
          console.log(err);
          console.error(err.response.data);
          this.error = err.response.data || true;
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
p {
  font-size: 1.2em;
}

.info__wrapper {
  padding: 12px 20px;
}

.info {
  width: 100%;

  /* margin-right: 20px; */
}
.info__title {
  white-space: nowrap;
  color: rgb(98, 98, 98);
  margin-bottom: 12px;
}

.info__title,
.info__value {
  text-align: left;
}

#info__icon .info__title {
  margin-bottom: 10px;
}
#info__icon .info__value {
  font-size: 18px;
}
.w-35 {
  width: 35%;
}
</style>