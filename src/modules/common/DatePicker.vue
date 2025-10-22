<script setup>
import { ref, watch } from 'vue';
import { formatDateToYMD } from '../../common/utils/dates';
import AppIcon from './AppIcon.vue';
import { CalendarIcon } from 'lucide-vue-next';

const { allowedDates = [], isLoading } = defineProps({
  allowedDates: Array,
  isLoading: Boolean,
});
const selectedDate = defineModel('selectedDate', {
  type: Number,
});

const showCalendar = ref(false);
const dates = ref([]);

const disableNotAllowedDates = (ts) => {
  const formatted = formatDateToYMD(ts);

  return !dates.value.includes(formatted);
};

const handleDateSelect = (value) => {
  selectedDate.value = value;
  showCalendar.value = false;
};

watch(
  () => allowedDates,
  (value) => {
    if (!value?.length) return;
    dates.value = [formatDateToYMD(Date.now()), ...value];
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <n-popover
    v-model:show="showCalendar"
    trigger="click"
    placement="bottom-start"
    :show-arrow="true"
  >
    <template #trigger>
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button class="icon-button" quaternary>
            <template #icon>
              <AppIcon :icon="CalendarIcon" />
            </template>
          </n-button>
        </template>
        Select entry date
      </n-tooltip>
    </template>

    <n-spin :show="isLoading">
      <n-date-picker
        v-model:value="selectedDate"
        panel
        type="date"
        :is-date-disabled="disableNotAllowedDates"
        @update:value="handleDateSelect"
      />
    </n-spin>
  </n-popover>
</template>
