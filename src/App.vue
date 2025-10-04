<script setup>
import { useRoute } from "vue-router";
import { useUISettingsStore } from "./stores/uiSettings";
import { darkTheme, lightTheme } from "naive-ui";
import { computed } from "vue";
import { DefaultLayout } from "./layouts/default";
import { ApplicationLayout } from "./layouts/application";
import { appThemeList } from "./common/themes";

const uiSettingsStore = useUISettingsStore();
const route = useRoute();
const layouts = { default: DefaultLayout, application: ApplicationLayout };

const themeList = {
  dark: darkTheme,
  light: lightTheme,
};

const currentLayout = computed(() => {
  const key = route.meta.layout || "default";
  return layouts[key] ?? layouts.default;
});
</script>

<template>
  <n-config-provider :theme="themeList[uiSettingsStore.theme]" :theme-overrides="appThemeList[uiSettingsStore.theme]">
    <n-message-provider>
      <component :is="currentLayout">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" :key="$route.fullPath" />
          </transition>
        </router-view>
      </component>
    </n-message-provider>
  </n-config-provider>
</template>
