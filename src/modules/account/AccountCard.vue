<script setup>
import { useAccountStore } from '../../stores/account';

const account = useAccountStore();
</script>

<template>
  <n-card>
    <div class="flex a-center g-12">
      <n-p style="font-weight: 600"> Username: </n-p>
      <n-p>{{ account.account.username }}</n-p>
    </div>
    <div class="flex a-center g-12">
      <n-p style="font-weight: 600"> Email: </n-p>
      <n-p>{{ account.account.email }}</n-p>
    </div>
    <div class="flex a-center g-12">
      <n-p style="font-weight: 600"> Create date: </n-p>
      <n-p>{{ new Date(account.account.createdDate).toDateString() }}</n-p>
    </div>
  </n-card>
</template>
