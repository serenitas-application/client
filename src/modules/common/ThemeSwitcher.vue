<script setup>
import { computed } from 'vue';
import AppIcon from './AppIcon.vue';
import { MoonIcon, SunIcon } from 'lucide-vue-next';
import { useUISettingsStore } from '../../stores/uiSettings';

const uiSettingsStore = useUISettingsStore();

const isThemeDark = computed(() => uiSettingsStore.theme === 'dark');
</script>

<template>
  <div>
    <n-tooltip trigger="hover">
      <template #trigger>
        <AppIcon
          v-if="isThemeDark"
          class="pointer"
          :icon="MoonIcon"
          @click="uiSettingsStore.switchTheme"
        />
        <AppIcon
          v-else
          class="pointer"
          :icon="SunIcon"
          @click="uiSettingsStore.switchTheme"
        />
      </template>
      Change theme
    </n-tooltip>
  </div>
</template>
