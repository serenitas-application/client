<script setup>
import { computed } from 'vue';
import { useAccountStore } from '../../stores/account';
import { formatDateWithWeekday } from '../../common/utils/dates';

const account = useAccountStore();
const createAccountDate = computed(() => {
  return formatDateWithWeekday(account.account.createdDate);
});
</script>

<template>
  <n-card class="card">
    <div class="flex j-between i-center g-4">
      <n-p> Username: </n-p>
      <n-p>{{ account.account.username ?? '-' }}</n-p>
    </div>
    <div class="flex j-between i-center g-4">
      <n-p> Email: </n-p>
      <n-p>{{ account.account.email ?? '-' }}</n-p>
    </div>
    <div class="flex j-between i-center g-4">
      <n-p> Create date: </n-p>
      <n-p>{{ createAccountDate }}</n-p>
    </div>
  </n-card>
</template>

<style scoped>
.card {
  max-width: 500px;
}
</style>
