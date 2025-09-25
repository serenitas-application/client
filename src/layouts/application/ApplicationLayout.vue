<script setup lang="ts">
import AppHeader from "./AppHeader.vue";
import AppSidebar from "./AppSidebar.vue";
</script>

<template>
  <n-layout has-sider class="app-layout">
    <AppSidebar />
    <n-layout>
      <AppHeader />
      <n-layout-content content-class="app-content">
        <router-view></router-view>
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
