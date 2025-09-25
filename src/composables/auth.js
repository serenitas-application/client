import { useAccountStore } from "../stores/account";

const ACCOUNT_INFO_LOCAL_STORAGE = "asldjsan";

export function useAuth() {
  const account = useAccountStore();

  async function login(payload) {
    account.setAccount(payload);
    localStorage.setItem(ACCOUNT_INFO_LOCAL_STORAGE, JSON.stringify(payload));
  }

  async function logout() {
    account.resetAccount();
    localStorage.removeItem(ACCOUNT_INFO_LOCAL_STORAGE);
  }

  return { login, logout };
}
