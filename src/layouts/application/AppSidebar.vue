<script setup>
import {
  BookmarkOutline,
  CaretDownOutline,
  HomeOutline,
  BookOutline,
  DocumentTextOutline,
  SettingsOutline,
  PersonOutline,
} from "@vicons/ionicons5";
import { NIcon } from "naive-ui";
import { h, ref } from "vue";
import { RouterLink } from "vue-router";
import { useUISettingsStore } from "../../stores/uiSettings";
import { RoutePaths } from "../../router/routes";
import { useRoute } from "vue-router";

const titleOptions = [
  {
    label: () => h("h1", { style: "font-size: 22px; font-weight: bold" }, "Serenitas"),
    key: "serenitas",
    icon: () => h("span", { style: "font-size: 26px;" }, "🍀"),
  },
];

const menuOptions = [
  {
    label: "Home",
    key: RoutePaths.main.name,
    to: RoutePaths.main.path,
  },
  {
    label: "Account",
    key: RoutePaths.account.name,
    to: RoutePaths.account.path,
  },
  {
    label: "Daily Diary",
    key: RoutePaths.diary.name,
    to: RoutePaths.diary.path,
  },
  {
    label: "Notes",
    key: RoutePaths.notes.name,
    to: RoutePaths.notes.path,
  },
  {
    label: "Settings",
    key: RoutePaths.settings.name,
    to: RoutePaths.settings.path,
  },
];

const route = useRoute();
const uiSettings = useUISettingsStore();

const activeTab = ref(route.name);

function renderMenuLabel(option) {
  if ("to" in option) {
    return h(RouterLink, { to: option.to }, { default: () => option.label });
  }
  return option.label;
}

function renderMenuIcon(option) {
  const map = {
    home: HomeOutline,
    account: PersonOutline,
    diary: BookOutline,
    notes: DocumentTextOutline,
    settings: SettingsOutline,
  };

  const Icon = map[option.key] || BookmarkOutline;
  return h(NIcon, null, { default: () => h(Icon) });
}

function expandIcon() {
  return h(NIcon, null, { default: () => h(CaretDownOutline) });
}

const handleUpdateValue = (key) => {
  activeTab.value = key;
};
</script>

<template>
  <n-layout-sider
    bordered
    content-class="app-sidebar"
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed="uiSettings.sidebarState"
    show-trigger
    @collapse="uiSettings.toggleSidebar(true)"
    @expand="uiSettings.toggleSidebar(false)"
  >
    <n-menu
      :collapsed="uiSettings.sidebarState"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="titleOptions"
      :expand-icon="expandIcon"
      style="pointer-events: none"
    />
    <n-menu
      :collapsed="uiSettings.sidebarState"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
      :render-label="renderMenuLabel"
      :render-icon="renderMenuIcon"
      :expand-icon="expandIcon"
      :value="activeTab"
      @update:value="handleUpdateValue"
    />
  </n-layout-sider>
</template>
