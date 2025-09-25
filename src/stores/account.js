import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAccountStore = defineStore("account", () => {
  const account = ref(null);

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
