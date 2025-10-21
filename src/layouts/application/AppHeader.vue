<script setup>
import { LogOutOutline } from '@vicons/ionicons5';
import ThemeSwitcher from '../../modules/common/ThemeSwitcher.vue';
import { NIcon } from 'naive-ui';
import { apiClient } from '../../api';
import { useAuth } from '../../composables/auth';
import { useRouter } from 'vue-router';
import { RoutePaths } from '../../router/routes';

const router = useRouter();
const auth = useAuth();

const onLogout = async () => {
  await apiClient.auth.logout();
  auth.logout();
  router.push(RoutePaths.login.path);
};
</script>

<template>
  <n-layout-header class="header flex g-8 j-end">
    <div class="flex g-12 j-end">
      <ThemeSwitcher />
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-icon class="pointer" :size="22" @click="onLogout">
            <LogOutOutline />
          </n-icon>
        </template>
        Sign out
      </n-tooltip>
    </div>
  </n-layout-header>
</template>

<style>
.header {
  padding: 12px;
}
</style>
