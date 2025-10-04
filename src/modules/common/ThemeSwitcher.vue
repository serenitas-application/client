<script setup>
import { computed } from "vue";
import { useUISettingsStore } from "../../stores/uiSettings";
import { SunnyOutline, MoonOutline } from "@vicons/ionicons5";

const uiSettingsStore = useUISettingsStore();

const isThemeDark = computed(() => uiSettingsStore.theme === "dark");
</script>

<template>
  <div>
    <n-tooltip trigger="hover">
      <template #trigger>
        <n-icon class="pointer" :size="22" v-if="isThemeDark" @click="uiSettingsStore.switchTheme">
          <MoonOutline />
        </n-icon>
        <n-icon class="pointer" :size="22" v-else @click="uiSettingsStore.switchTheme">
          <SunnyOutline />
        </n-icon>
      </template>
      Change theme
    </n-tooltip>
  </div>
</template>
