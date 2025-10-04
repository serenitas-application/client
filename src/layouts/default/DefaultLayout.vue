<script setup></script>

<template>
  <n-layout content-style="display: flex; justify-content: center;height: 100vh; align-items: center;">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.fullPath" />
      </transition>
    </router-view>
  </n-layout>
</template>
