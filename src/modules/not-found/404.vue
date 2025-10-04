<script setup lang="ts">
import { useRouter } from "vue-router";
import { NResult, NButton } from "naive-ui";
import { RoutePaths } from "../../router/routes";

const router = useRouter();

function goHome() {
  router.push(RoutePaths.main.path);
}
</script>

<template>
  <n-card class="not-found">
    <n-result status="404" title="404" description="Page not found">
      <template #footer>
        <n-button type="primary" @click="goHome">
          Go home
        </n-button>
      </template>
    </n-result>
  </n-card>
</template>

<style scoped>
.not-found {
  padding: 20px 60px;
  width: 90%;
  max-width: 500px;
}
</style>
