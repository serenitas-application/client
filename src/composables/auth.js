import { ACCOUNT_LS } from '../common/consts/local-storage';
import { useAccountStore } from '../stores/account';

export function useAuth() {
  const account = useAccountStore();

  async function login(payload) {
    account.setAccount(payload);
    localStorage.setItem(ACCOUNT_LS, JSON.stringify(payload));
  }

  async function logout() {
    account.resetAccount();
    localStorage.removeItem(ACCOUNT_LS);
  }

  function getAccountInfo() {
    const account = localStorage.getItem(ACCOUNT_LS);
    if (!account) return;
    return JSON.parse(account);
  }

  return { login, logout, getAccountInfo };
}
