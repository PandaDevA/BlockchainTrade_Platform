<template>
  <div class="d-flex-full-center w-100 mt-4 pt-4">
     <ui-tabs type="text" class="single-tab">
                  <ui-tab @select="loadHistory('deposit')" title="Deposit">
                    <transactions-deposit
                      :is-loading="isLoading"
                    />
                  </ui-tab>
                  <ui-tab @select="loadHistory('withdrawal')" title="Withdrawal" class="single-tab">
                    <transactions-withdrawal
                      :is-loading="isLoading"
                    />
                  </ui-tab>
                </ui-tabs>
  </div>
</template>

<script>
import TransactionsDeposit from './TransactionsDeposit'
import TransactionsWithdrawal from './TransactionsWithdrawal'

export default {
  components: {
    TransactionsDeposit,
    TransactionsWithdrawal,
  },
  data() {
    return {
      isLoading: true
    };
  },
  methods: {
    loadHistory(name) {
      this.isLoading = false;
      console.log(name);
    }
  },
};
</script>

<style scoped>
.date-picker {
  width: 100px;
}
.table-pagination .left-arrow,
.table-pagination .right-arrow {
  padding-left: 5px;
  padding-right: 5px;
}
.table-pagination .left-arrow:hover,
.table-pagination .right-arrow:hover {
  background-color: #eda55d;
  color: #ffffff;
}
</style>