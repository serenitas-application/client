<script setup>
import { computed } from 'vue';
import { formatDateWithWeekday } from '../../common/utils/dates';
import AppIcon from '../common/AppIcon.vue';
import { SquareArrowOutUpRightIcon } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { RoutePaths } from '../../router/routes';

const router = useRouter();

const currentDate = computed(
  () => formatDateWithWeekday(Date.now()).split(',')[1],
);

const toDiaryPage = () => {
  router.push(RoutePaths.diary.name);
};
</script>

<template>
  <n-card class="widget">
    <div class="flex j-between i-center g-8">
      <n-h3 class="m-0">Diary</n-h3>
      <AppIcon
        role="button"
        :icon="SquareArrowOutUpRightIcon"
        class="pointer"
        @click="toDiaryPage"
      />
    </div>
    <n-divider class="m-0 line" />

    <div class="flex col g-4">
      <div class="flex j-between i-center">
        <n-p> First record date: </n-p>
        <n-p strong>{{ currentDate }}</n-p>
      </div>
      <div class="flex j-between i-center">
        <n-p> Last record date: </n-p>
        <n-p strong>{{ currentDate }}</n-p>
      </div>
      <div class="flex j-between i-center">
        <n-p>Encrypted records:</n-p>
        <n-p strong>12</n-p>
      </div>
      <div class="flex j-between i-center">
        <n-p>Open records:</n-p>
        <n-p strong>8</n-p>
      </div>
    </div>
    <n-divider class="m-0 line" />
    <div class="flex j-between i-center">
      <n-p style="font-weight: 600"> Total records: </n-p>
      <n-p strong> 20 </n-p>
    </div>
  </n-card>
</template>

<style scoped>
.widget {
  width: fit-content;
  min-width: 320px;
}
</style>
