<template>
  <div class="dashboard-wrapper-light-mining">
    <!-- <div class="center full-height-page-wrapper mt-4">
      <div class="wallet-wrapper mt-4">
        <div class="settings-form-wrapper w-form w-100">
          <div class="settings-wrapper-main">
            <div class="module-wrapper custom-width overflow-initial">
              <div class="module-header">
                <div class="module-title">Ranking</div>
              </div>
              <div class="module-content round-border d-flex justify-around grey-bottom mb-4">
                <div class="ranking-item">
                  <div class="ranking-header mx-4 my-4">My Daily Ranking</div>
                  <div class="ranking-footer mb-4">{{ myRankingInfo.dailyRanking }} FLX</div>
                </div>
                <div class="ranking-item">
                  <div class="ranking-header mx-4 my-4">Daily Points</div>
                  <div class="ranking-footer mb-4">{{ myRankingInfo.dailyPoints }} FLX</div>
                </div>
                <div class="ranking-item">
                  <div class="ranking-header mx-4 my-4">Last-week Ranking | Reward</div>
                  <div class="ranking-footer mb-4">{{ myRankingInfo.lastWeekRanking }} FLX</div>
                </div>
                <div class="ranking-item">
                  <div class="ranking-header mx-4 my-4">Total Reward</div>
                  <div class="ranking-footer mb-4">{{ myRankingInfo.totalReward }} FLX</div>
                </div>
              </div>
              <div style="overflow: visible;" class="ranking-tabs module-content p-none mt-4">
                <ui-tabs @tab-change="isLoading = false;" type="text" class="single-tab">
                  <ui-tab title="Weekly Ranking">
                    <a-weekly-ranking
                      :is-loading="isLoading"
                      @loadByLeague="loadByLeague"
                      @loadMore="loadMore"
                      @loadLess="loadLess"
                      :weekly-ranking="weeklyRanking"
                    />
                  </ui-tab>
                  <ui-tab title="Reward History" class="single-tab">
                    <a-reward-history
                      :is-loading="isLoading"
                      @loadByLeague="loadByLeague"
                      @loadMore="loadMore"
                      @loadLess="loadLess"
                      @loadHistoryByDate="loadHistoryByDate"
                      :reward-history="rewardHistory"
                    />
                  </ui-tab>
                  <ui-tab title="My Reward" class="single-tab">
                    <a-reward
                      :is-loading="isLoading"
                      @loadMore="loadMore"
                      @loadLess="loadLess"
                      :reward="myReward"
                    />
                  </ui-tab>
                </ui-tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>-->
  </div>
</template>
<script>
import { get } from "lodash";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import AWeeklyRanking from "@/components/_sections/mining/AWeeklyRanking";
import ARewardHistory from "@/components/_sections/mining/ARewardHistory";
import AReward from "@/components/_sections/mining/AReward";

export default {
  middleware: "authentication",
  layout: "profile",
   head () {
    return {
      title: 'Mining | Folex'
    }
  },
  components: {
    AWeeklyRanking,
    ARewardHistory,
    AReward
  },
  data() {
    return {
      isLoading: true,
      myRankingInfo: {
        dailyLeague: 0,
        dailyPoints: 0,
        dailyRanking: 0,
        lastWeekRanking: 0,
        lastWeekReward: 0,
        totalReward: 0
      },
      weeklyRanking: {
        items: [],
        next: null,
        page: 1
      },
      rewardHistory: {
        items: [],
        next: null,
        page: 1
      },
      myReward: {
        items: [],
        next: null,
        page: 1
      }
    };
  },
  created() {
    this.loadState().then(data => {
      this.isLoading = false;
      const { weeklyRanking, rewardHistory, myReward, myRankingInfo } = data;
      if (!weeklyRanking || !rewardHistory || !myReward || !myRankingInfo)
        return;
      this.weeklyRanking = weeklyRanking;
      this.rewardHistory = rewardHistory;
      this.myReward = myReward;
      this.myRankingInfo = myRankingInfo;
    });
  },
  methods: {
    ...mapActions("mining", [
      "loadState",
      "loadWeeklyRanking",
      "loadRewardHistory",
      "loadMyReward"
    ]),
    loadByLeague(table, league) {
      this.isLoading = true;
      const action = `load${this.upperCaseFirstLetter(table)}`;
      this[action]({ league }).then(data => {
        this.isLoading = false;
        if (!data) return;
        this[table] = data;
      });
    },
    loadMore(table) {
      this.isLoading = true;
      const action = `load${this.upperCaseFirstLetter(table)}`;
      this[action]({ isMore: true }).then(data => {
        this.isLoading = false;
        if (!data) return;
        this[table] = data;
      });
    },
    loadLess(table) {
      this.isLoading = true;
      const action = `load${this.upperCaseFirstLetter(table)}`;
      this[action]({ isMore: false }).then(data => {
        this.isLoading = false;
        if (!data) return;
        this[table] = data;
      });
    },
    loadHistoryByDate(date) {
      this.isLoading = true;
      this.loadRewardHistory({ date }).then(data => {
        this.isLoading = false;
        if (!data) return;
        this.rewardHistory = data;
      });
    }
  }
};
</script>

<style scoped>
.single-tab {
  /* height: 360px; */
}
.mined-info {
  font-size: 18px;
}
.grey-bottom {
  border-style: none none solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.4) rgba(0, 0, 0, 0.4) rgba(0, 0, 0, 0.06);
}
</style>