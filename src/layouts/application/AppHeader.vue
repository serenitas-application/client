<script setup>
import { LogOutOutline } from "@vicons/ionicons5";
import ThemeSwitcher from "../../modules/common/ThemeSwitcher.vue";
import { NIcon } from "naive-ui";
</script>

<template>
  <n-layout-header class="header flex g-8 j-end">
    <div class="flex g-12 j-end">
      <ThemeSwitcher />
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-icon class="pointer" :size="22">
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
