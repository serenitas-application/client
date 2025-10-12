import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { ACCOUNT_LS } from '../common/consts/local-storage';

export const useAccountStore = defineStore('account', () => {
  const hasAccount = localStorage.getItem(ACCOUNT_LS);

  const account = ref(!!hasAccount);

  const isAuth = computed(() => account.value);

  const setAccount = (payload) => {
    account.value = payload;
  };

  const resetAccount = () => {
    account.value = null;
  };

  return {
    account,
    setAccount,
    resetAccount,
    isAuth,
  };
});
