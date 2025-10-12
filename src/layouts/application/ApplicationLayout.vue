<script setup lang="ts">
import { onMounted } from 'vue';
import AppHeader from './AppHeader.vue';
import AppSidebar from './AppSidebar.vue';
import { apiClient } from '../../api';
import { useAuth } from '../../composables/auth';
import { useRouter } from 'vue-router';
import { RoutePaths } from '../../router/routes';
import { useMessage } from 'naive-ui';

const auth = useAuth();
const router = useRouter();
const message = useMessage();

onMounted(async () => {
  const result = await apiClient.account.getAccountInfo();
  if (!result.data) {
    await apiClient.auth.logout();
    auth.logout();
    router.push(RoutePaths.login);
    return message.error(result.message, { duration: 5000 });
  }
  auth.login(result.data);
});
</script>

<template>
  <n-layout has-sider class="app-layout">
    <AppSidebar />
    <n-layout>
      <AppHeader />
      <n-layout-content content-class="app-content">
        <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in" appear>
            <component :is="Component" :key="route.fullPath" />
          </transition>
        </router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style>
.app-layout {
  height: 100vh;
}
.app-content {
  padding: 24px;
}
</style>
