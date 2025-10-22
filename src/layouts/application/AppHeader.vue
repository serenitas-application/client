<script setup>
import ThemeSwitcher from '../../modules/common/ThemeSwitcher.vue';
import { apiClient } from '../../api';
import { useAuth } from '../../composables/auth';
import { useRouter } from 'vue-router';
import { RoutePaths } from '../../router/routes';
import { LogOutIcon } from 'lucide-vue-next';
import AppIcon from '../../modules/common/AppIcon.vue';

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
          <AppIcon
            :icon="LogOutIcon"
            :size="22"
            class="pointer"
            @click="onLogout"
          />
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
