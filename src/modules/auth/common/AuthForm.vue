<script setup lang="ts">
import AppLogo from '../../common/AppLogo.vue';
</script>

<template>
  <n-form class="flex col g-16">
    <AppLogo />
    <n-divider class="m-0" />
    <slot name="body" />
  </n-form>
</template>
