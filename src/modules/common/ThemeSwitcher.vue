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
        <n-icon v-if="isThemeDark" class="pointer" :size="22" @click="uiSettingsStore.switchTheme">
          <MoonOutline />
        </n-icon>
        <n-icon v-else class="pointer" :size="22" @click="uiSettingsStore.switchTheme">
          <SunnyOutline />
        </n-icon>
      </template>
      Change theme
    </n-tooltip>
  </div>
</template>
