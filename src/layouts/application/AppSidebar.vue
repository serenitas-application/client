<script setup>
import {
  BookmarkOutline,
  CaretDownOutline,
  HomeOutline,
  DocumentTextOutline,
  SettingsOutline,
  PersonOutline,
  JournalOutline,
} from "@vicons/ionicons5";
import { NIcon } from "naive-ui";
import { computed, h } from "vue";
import { RouterLink } from "vue-router";
import { useUISettingsStore } from "../../stores/uiSettings";
import { RoutePaths } from "../../router/routes";
import { useRoute } from "vue-router";
import SerenitasLogo from "../../assets/serenitas_logo.svg";

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
    label: "Journals",
    key: RoutePaths.journals.name,
    to: RoutePaths.journals.path,
  },
  {
    label: "Settings",
    key: RoutePaths.settings.name,
    to: RoutePaths.settings.path,
  },
];

const route = useRoute();
const uiSettings = useUISettingsStore();

const titleOptions = [
  {
    label: () => h("h1", { style: "font-size: 16px; font-weight: 700" }, "Serenitas"),
    key: "serenitas",
    icon: () => h(SerenitasLogo, { style: "fill: #8E7CC3;" }),
  },
];

const currentMenuKey = computed(() => {
  const p = route.path;
  if (p === RoutePaths.main.path) return RoutePaths.main.name;
  if (p.startsWith(RoutePaths.account.path)) return RoutePaths.account.name;
  if (p.startsWith(RoutePaths.journals.path)) return RoutePaths.journals.name;
  if (p.startsWith(RoutePaths.settings.path)) return RoutePaths.settings.name;
  return undefined;
});

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
    journals: JournalOutline,
    notes: DocumentTextOutline,
    settings: SettingsOutline,
  };

  const Icon = map[option.key] || BookmarkOutline;
  return h(NIcon, null, { default: () => h(Icon) });
}

function expandIcon() {
  return h(NIcon, null, { default: () => h(CaretDownOutline) });
}
</script>

<template>
  <n-layout-sider
    bordered
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
      :collapsed-icon-size="32"
      :options="titleOptions"
      :expand-icon="expandIcon"
      style="pointer-events: none"
      class="logoc"
    />
    <n-menu
      :collapsed="uiSettings.sidebarState"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
      :render-label="renderMenuLabel"
      :render-icon="renderMenuIcon"
      :expand-icon="expandIcon"
      :value="currentMenuKey"
    />
  </n-layout-sider>
</template>
