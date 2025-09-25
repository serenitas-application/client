import { RoutePaths, routes } from "./routes";
import { useAccountStore } from "../stores/account";
import { createWebHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const account = useAccountStore();

  if (to.meta.requiresAuth && !account.isAuth) {
    return { name: RoutePaths.login.name };
  }
  if (account.isAuth && (to.name === RoutePaths.login.name || to.name === RoutePaths.registration.name)) {
    return { name: RoutePaths.main.name };
  }
});

export default router;
