<script setup>
import { useRouter } from 'vue-router';
import { RoutePaths } from '../../../router/routes';

const router = useRouter();

const toCreatePage = () =>
  router.push({ name: RoutePaths.pages.children.create.name });
</script>

<template>
  <div class="flex">
    <n-button @click="toCreatePage">
      Add new
    </n-button>
  </div>
</template>
