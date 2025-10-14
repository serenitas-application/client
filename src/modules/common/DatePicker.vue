<script setup>
import { ref } from 'vue';
import { NDatePicker, NPopover, NIcon, NButton } from 'naive-ui';
import { CalendarClearOutline } from '@vicons/ionicons5';

const selectedDate = defineModel({
  type: String,
});

const showCalendar = ref(false);

const allowedDates = ['2025-10-10', '2025-10-12', '2025-10-14'];

const disableNotAllowedDates = (ts) => {
  const date = new Date(ts);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const formatted = `${y}-${m}-${d}`;

  return !allowedDates.includes(formatted);
};

const handleDateSelect = (value) => {
  selectedDate.value = value;
  showCalendar.value = false;
};
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
        :on-panel-update="handlePanelUpdate"
        :is-date-disabled="disableNotAllowedDates"
        @update:value="handleDateSelect"
      />
    </div>
  </n-popover>
</template>
