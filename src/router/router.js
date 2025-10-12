import { RoutePaths, routes } from './routes';
import { useAccountStore } from '../stores/account';
import { createWebHistory, createRouter } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const account = useAccountStore();

  const isAuthPage =
    to.name === RoutePaths.login.name ||
    to.name === RoutePaths.registration.name;

  if (!account.isAuth && to.meta.requiresAuth) {
    return { name: RoutePaths.login.name };
  }

  if (account.isAuth && isAuthPage) {
    return { name: RoutePaths.main.name };
  }

  return true;
});

export default router;
