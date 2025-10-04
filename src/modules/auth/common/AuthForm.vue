<script setup lang="ts">
import { appColors } from "../../../common/themes/themeConfig";
import SerenitasLogo from "../../../assets/serenitas_logo.svg";
</script>

<template>
  <n-form class="flex col g-16">
    <div class="flex i-center g-8">
      <n-icon size="40" :color="appColors.primary">
        <SerenitasLogo />
      </n-icon>
      <slot name="title">
        <div>
          <n-h2 class="m-0">Serenitas</n-h2>
          <n-p class="m-0">Your private space for clarity</n-p>
        </div>
      </slot>
    </div>
    <slot name="body"></slot>
  </n-form>
</template>
