<script setup>
import { ref, watch } from 'vue';
import { NDatePicker, NPopover, NIcon, NButton } from 'naive-ui';
import { CalendarClearOutline } from '@vicons/ionicons5';
import { formatDateToYMD } from '../../common/utils/dates';

const { allowedDates = [] } = defineProps({
  allowedDates: Array,
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
              <n-icon size="24">
                <CalendarClearOutline />
              </n-icon>
            </template>
          </n-button>
        </template>
        Select entry date
      </n-tooltip>
    </template>

    <div>
      <n-date-picker
        v-model:value="selectedDate"
        panel
        type="date"
        :is-date-disabled="disableNotAllowedDates"
        @update:value="handleDateSelect"
      />
    </div>
  </n-popover>
</template>
