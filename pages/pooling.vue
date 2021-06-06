<template>
  <div style="height: 100%;" class="dashboard-wrapper-light">
    <div class="center pool">
      <img src="/images/logo-c.png" alt class="logo-p small">

      <!-- F&Q modal -->
      <a @click="openModal('fq')" class="btn-help">
        <fa icon="question-circle" />
      </a>
      <ui-modal ref="fq" title="Info" class="pooling text-left w-100">
        <h3>What is "Folex Pool"?</h3>
        <p>
          The Pool is an investment community, which we offer on Folex for you, so that also small investors can invest in good, lucrative and stable MNs, without investing much money.
        </p>
        <p>
          When you invest in the pool, you participate in masternodes without previous knowledge and can thus expand your portfolio. Our portfolio, which is actively managed externally by make-it.capital on our behalf, generates a passive income for you. The risk diversification is greatly increased by the joint investment and the experience of make-it-capital.
        </p>
        <p>
          With our product, we aim for a return of 10% p.a..
        </p>
        <p>
          If one pool is closed, the next one follows soon, so that you can still participate in it later or do a reinvest, which is also possible. As an investor you don't have to worry about anything, we will do everything for you.
        </p>

        <h3>Procedure for you as an investor</h3>
        <p>
          You have to deposit e.g. BTC to your exchange balance. With this, you have to buy at least 500 FLX and transfer them from your wallet to the pool wallet. The deposit time window is shown in the section "Pooling".
        </p>
        <p>
          This money is used to buy the appropriate cryptocurrencies and create the masternodes.
        </p>
        <p>
          The rewards will then be paid out regularly, in addition to participation in the individual cryptocurrencies, which are also noticeable.
        </p>
        <p>
          After one month at the earliest, the investors receive their first distribution in the amount of the profits accrued up to that point. This procedure is repeated monthly until the paid-in capital can be paid out after 6 months. However, they can also simply remain in the "Pool" and continue to receive their monthly distributions.
        </p>

        <h3>How we invest</h3>
        <p>
          We invest the money in various masternodes, which are an essential part of many cryptocurrencies.
        </p>
        <p>
          The more common method would be staking. The differences are as follows:
        </p>
        <div class="pl-4">
          <h4>Staking</h4>
          <p>
            The storage of certain cryptocurrencies is called staking and contributes to the security of the network. We compare it to an account in a bank, where you get interested in storing money. Stored money also reduces supply and increases prices. The cryptocurrency network pays a reward for this.
          </p>
          <h4>Masternodes</h4>
          <p>
            This is one of the original wallets of a cryptocurrency installed on a server that stores the entire blockchain and performs some other functions. A blockchain contains all booking processes within the cryptocurrency. A certain amount of the respective cryptocurrency is the basic prerequisite here. Here the cryptocurrency network pays a reward, too.
          </p>
          <h4>Differences</h4>
          <p>
            The reward that a masternode receives is usually higher than the reward that the stackers receive. In order to operate a masternode at all, you must have a certain amount of the respective cryptocurrency for it. If this amount is not reached, the only thing left is staking. Since the majority of users do not reach this number of coins, the reward for a master node is usually higher.
          </p>
        </div>

      </ui-modal>

      <!-- Pooling -->
      <div class="wrapper-pooling-main w-tabs">
        <div class="pooling-wrapper-content w-tab-content">
          <div v-if="isNoPooling" class="w--tab-active w-tab-pane">
            <div class="pool-wrapper">
              <div class="single-pool-wrapper">
                <div class="single-pool-header">
                  <div class="title-text-pool">No pooling right now</div>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="isLoading" class="w--tab-active w-tab-pane">
            <div class="pool-wrapper">
              <div class="single-pool-wrapper">
                <div class="single-pool-header">
                  <div class="title-text-pool">Loading...</div>
                </div>
                <div class="pool-content w-form">
                  <div class="pool-content-wrapper">
                    <div class="pool-inside-module p-none">
                      <a-spinner/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <transition-group mode="out-in" name="anim-fade" tag="div">
              <div
                v-for="(pool, i) in pooling"
                :key="'content' + pool.id + i + pool.isActive + pool.myInvest + + pool.currencyAmount"
                :class="{'w--tab-active': pool.isActive}"
                class="w-tab-pane"
              >
                <div
                  v-if="pooling.length > 1 && i + 1 < pooling.length"
                  class="next-right-button-wrapper"
                >
                  <div @click="changeActivePool(i + 1)" class="button-next-right1"></div>
                </div>
                <div v-if="i > 0" class="next-left-button-wrapper">
                  <div
                    @click="changeActivePool(i - 1)"
                    id="button-next-left2"
                    class="button-next-left2"
                  ></div>
                </div>

                <div class="pool-wrapper">
                  <div class="single-pool-wrapper">
                    <div class="single-pool-header">
                      <div class="title-text-pool">{{ pool.name }}</div>
                    </div>
                    <div class="pool-content w-form">
                      <div class="pool-content-wrapper">
                        <div class="pool-inside-module">
                          <div class="module-header pool">
                            <div class="module-title">Time To Invest</div>
                          </div>
                          <a-count-down-timer
                            :end-time="pool.timeToInvest"
                            expiredMessage="This pool is expired"
                            @onExpired="makeExpired(pool)"
                          />
                        </div>
                        <div class="_2xmodules">
                          <div class="pool-inside-module">
                            <div class="module-header pool">
                              <div class="module-title">Conditions</div>
                            </div>
                            <div class="module-inside-wrapper">
                              <div class="pooling-container">
                                <div class="pool-content-module">Pooling level:</div>
                                <div
                                  class="pool-content-module"
                                >{{ pool.targetVolume }} {{ pool.currencyShortName }}</div>
                              </div>
                              <div class="pooling-container">
                                <div class="pool-content-module">Time duration:</div>
                                <div class="pool-content-module">{{ pool.timeDuration }} Month</div>
                              </div>
                              <div class="pooling-container">
                                <div class="pool-content-module">Target performance:</div>
                                <div class="pool-content-module">{{pool.targetPerformance}}%</div>
                              </div>
                              <div class="pooling-container">
                                <div class="pool-content-module">Advance possibility</div>
                                <div
                                  class="pool-content-module"
                                >{{ pool.isAdvancePossible ? 'YES' : 'NO' }}</div>
                              </div>
                            </div>
                          </div>
                          <div class="pool-inside-module">
                            <div class="module-header pool">
                              <div class="module-title">Investments</div>
                            </div>
                            <div class="module-inside-wrapper">
                              <div class="pooling-container">
                                <div class="pool-content-module">Investment status:</div>
                                <div class="pool-content-module">{{ pool.investmentStatus }}%</div>
                              </div>
                              <div class="pooling-container">
                                <div class="pool-content-module">Investors</div>
                                <div class="investors-wrapper">
                                  <div
                                    class="pool-content-module investornumber"
                                  >{{ pool.investors }}</div>
                                  <img
                                    src="/images/multiple-users-silhouette.svg"
                                    alt
                                    class="image-2"
                                  >
                                </div>
                              </div>
                              <div class="pooling-container">
                                <div class="pool-content-module highlight pointer">Your investment:</div>
                                <div
                                  class="pool-content-module highlight pointer"
                                >{{ pool.myInvest }} {{ pool.currencyShortName }}</div>
                              </div>
                              <div class="button-wrapper pooling">
                                <button
                                  :disabled="disablePoolInvest(pool)"
                                  @click="openModal('invest')"
                                  class="btn small w-button make-disabled-dark"
                                >Invest</button>
                                <button
                                  :disabled="!pool.myInvest || isExpired(pool)"
                                  v-promise-btn
                                  @click="makePayOut"
                                  class="btn small clear w-button make-disabled-dark"
                                >Pay Out</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="w-form-done">
                        <div>The form is working</div>
                      </div>
                      <div class="w-form-fail">
                        <div>Something went wrong with the form button</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
          <div v-if="currentActiveExpired" class="pooling-iframe">
            <!-- <a-spinner v-if="iframe.loading"/> -->
            <vue-friendly-iframe :src="safeGet(currentActive, 'urlToSite')"></vue-friendly-iframe>
          </div>
        </div>
        <div class="pool-menu-wrapper w-tab-menu d-flex justify-center align-items-end">
          <div class="pool-menu-inner d-flex align-items-end justify-center">
            <a
              v-for="(pool, i) in pooling"
              :key="'tab'+pool.id + i"
              @click="changeActivePool(i)"
              :class="{'w--current': pool.isActive}"
              class="pool-menu1 w-inline-block w-tab-link"
            >
              <div>{{ pool.name }}</div>
            </a>
          </div>
        </div>
      </div>
      <div class="desclimer d-flex w-100 justify-content f-wrap">
        <div class="desclimer__description">
          <p
            class="text-left"
          >FoLEx offers the users with Pool 1 the opportunity to invest in an index of $HoriZen $Wagerr $Dash $PivX $Stakenet. Deposits and withdrawals into this pool are made in $BTC. Payouts are regularly made automatically to the participants' balance.</p>
        </div>
        <div class="desclimer__logos d-flex">
          <div class="desclimer__logo">
            <img src="/images/coin-dash.png" alt class="image">
          </div>
          <div class="desclimer__logo">
            <img src="/images/coin-wagerr.png" alt class="image">
          </div>
          <div class="desclimer__logo">
            <img src="/images/coin-stakenet.png" alt class="image">
          </div>
          <div class="desclimer__logo">
            <img src="/images/coin-pivx.png" alt class="image">
          </div>
          <div class="desclimer__logo">
            <img src="/images/coin-horizon.png" alt class="image">
          </div>
        </div>
        <div class="desclimer__description">
          <div class="desclimer__title">Risk Disclosure</div>
          <p>All information contained herein should be independently verified and confirmed. We do not accept any liability for any loss or damage whatsoever caused in reliance upon such information or services. Please be aware of the risks involved with any trading done in any financial market. Do not trade with money that you cannot afford to lose. When in doubt, you should consult a qualified financial advisor before making any investment decisions.</p>
          <div class="desclimer__title">Disclaimer</div>
          <p>Trading and investing in cryptocurrencies (also called digital or virtual currencies, crypto assets, altcoins and so on) involves substantial risk of loss and is not suitable for every investor. The valuation of cryptocurrencies and futures may fluctuate, and, as a result, clients may lose more than their original investment.</p>
          <p>If the market moves against you, you may sustain a total loss of the amount you deposited into your Pool Wallet. You are responsible for all the risks and financial resources you use and for the chosen trading system. You should not engage in trading unless you fully understand the nature of the transactions you are entering into and the extent of your exposure to loss. If you do not fully understand these risks you must seek independent advice from your financial advisor.</p>
          <p>All trading strategies are used at your own risk.</p>
          <p>Any content on this site should not be relied upon as advice or construed as providing recommendations of any kind. It is your responsibility to confirm and decide which trades to make. Trade only with risk capital; that is, trade with money that, if lost, will not adversely impact your lifestyle and your ability to meet your financial obligations. Past results are no indication of future performance. In no event should the content of this correspondence be construed as an express or implied promise or guarantee.</p>
          <p>FoLEx is not responsible for any losses incurred as a result of using any of our trading-Pooling strategies. Loss-limiting strategies such as stop loss orders may not be effective because market conditions or technological issues may make it impossible to execute such orders. Information provided in this correspondence is intended solely for informational purposes and is obtained from sources believed to be reliable. Information is in no way guaranteed. No guarantee of any kind is implied or possible where projections of future conditions are attempted.</p>
          <p>None of the content published on this site constitutes a recommendation that any particular cryptocurrency, portfolio of cryptocurrencies, transaction or investment strategy is suitable for any specific person. None of the information providers or their affiliates will advise you personally concerning the nature, potential, value or suitability of any particular cryptocurrency, portfolio of cryptocurrencies, transaction, investment strategy or other matter.</p>
          <p>The generic market recommendations provided by us are based solely on the judgment of our personnel and should be considered as such. You acknowledge that you enter into any transactions relying on your own judgment. Any market recommendations provided by us are generic only and may or may not be consistent with the market positions or intentions of our company and/or our affiliates. Any opinions, news, research, analyses, prices, or other information contained on this website are provided as general market commentary, and do not constitute an investment advice.</p>
          <p>Note – Outperformance !</p>
          <p>Please note that in the pooling area an outperformance of the initial currency is possible, FoLEx assumes no liability by outperformance of a single asset, the initial asset or a complete default of one of the assets contained in the pool. Use this feature only by a small amount or your portfolio and a part which you can bear as absolute total loss as diversification of your high risk capital.</p>
        </div>
      </div>
    </div>
    <a-invest-pop-up :invest-data="currentPool" ref="invest"/>
  </div>
</template>

<script>
import AInvestPopUp from "@/components/_shared/AInvestPopUp";
import ACountDownTimer from "@/components/_shared/ACountDownTimer";
import VueFriendlyIframe from "vue-friendly-iframe";
import { get, isEmpty } from "lodash";
import moment from "moment";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  middleware: "authentication",
  layout: "profile",
  head() {
    return {
      title: "Pooling | Folex"
    };
  },
  components: {
    AInvestPopUp,
    ACountDownTimer,
    VueFriendlyIframe
  },
  data() {
    return {
      pooling: [],
      // timeToInvest: "",
      iframe: {
        src:
          "https://make-it.capital/wp-content/plugins/performance-dashboard/extern.php?id=5ca10013049b1",
        loading: true
      },
      isLoading: true,
      currentPool: {}
    };
  },
  mounted() {
    this.loadPooling().then(res => {
      this.isLoading = false;
    });
  },
  watch: {
    poolingList: {
      handler(newValue, oldValue) {
        this.pooling = newValue;
      },
      deep: true,
      immediate: true
    },
    pooling: {
      handler(newValue, oldValue) {
        if (isEmpty(newValue)) return;
        const {
          currencyShortName,
          currencyAmount,
          id,
          walletId
        } = this.getCurrentActivePool;
        this.currentPool = {
          currencyShortName,
          amount: currencyAmount,
          poolId: id,
          walletId
        };
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapState("pooling", ["poolingList"]),
    ...mapGetters("pooling", ["getCurrentActivePool"]),
    isNoPooling() {
      return isEmpty(this.pooling) && !this.isLoading;
    },
    currentActiveExpired() {
      return this.isExpired(this.currentActive);
    },
    currentActive() {
      return this.pooling.find(pool => pool.isActive === true);
    }
  },
  methods: {
    ...mapActions("pooling", ["loadPooling", "payOut"]),
    makePayOut() {
      return this.payOut();
    },
    timeToInvest(time) {
      const timeLest = moment;
      return {
        days: moment(time).format("DD"),
        hours: moment(time).format("HH"),
        minutes: moment(time).format("mm"),
        seconds: moment(time).format("ss")
      };
    },
    changeActivePool(index) {
      this.$refs.invest.isOpen = false;
      this.pooling = this.pooling.map((pool, i) => {
        pool.isActive = i === index;
        return pool;
      });
    },
    durationDifference(time) {
      const now = moment(new Date()); //todays date
      const end = moment(time); // another date
      return moment.duration(end.diff(now)); // if time < 0 === 'expired'
    },
    disablePoolInvest(pool) {
      return (
        !pool.currencyAmount ||
        pool.investmentStatus >= 100 ||
        this.isExpired(pool)
      );
    },
    makeExpired(pool) {
      console.log(pool);
    },
    isExpired(pool) {
      const difference = this.durationDifference(get(pool, "timeToInvest"));
      const daysLeft = difference.asDays() || 1;
      return daysLeft <= 0;
    },
    openModal(ref) {
      this.$refs[ref].open();
    },
    closeModal(ref) {
      this.$refs[ref].close();
    }
  }
};
</script>

<style scoped>
.btn-help {
  position: fixed;
  right: 30px;
  margin-top: 30px;
  background-color: transparent;
  color: #009e0d;
  font-size: 42px;
  cursor: pointer;
  transform-origin: center;
  transition: all .2s;
  z-index: 21;
}
.btn-help:hover {
  transform: scale(1.1);
  color: #00800b;
}

.pooling-iframe {
  position: relative;
}
.desclimer {
  margin-top: 50px;
}
.desclimer__logos {
  justify-content: space-around;
  width: 80%;
  margin: 50px auto;
}

.desclimer__description {
  width: 90%;
  margin: 0 auto;
  text-align: left;
  font-size: 14px;
}
.desclimer__title {
  font-size: 18px;
  font-weight: 800;
  padding: 12px 0;
}
.pooling-wrapper-content {
  min-height: 200px;
}
.wrapper-pooling-main {
  width: 100%;
}
.single-pool-wrapper {
  width: 40%;
}
.pool-menu-wrapper {
  margin-top: 50px;
}
.pool-menu-inner {
  width: 1025px;
  overflow-x: auto;
}
.pool-menu-inner.w--current {
  height: 50px;
  background-color: #eda55d;
}
.pool-menu-inner {
}
.pool-menu-inner a {
  border-bottom: 2px solid #eda55d;
  border-collapse: collapse;
}
.pool-menu1 div {
  text-align: center;
  width: max-content;
}
</style>