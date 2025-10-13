<template>
  <n-popover
    v-model:show="showCalendar"
    trigger="click"
    placement="bottom-start"
    :show-arrow="false"
  >
    <template #trigger>
      <n-button style="padding: 0 8px" quaternary circle>
        <template #icon>
          <n-icon size="24">
            <CalendarClearOutline />
          </n-icon>
        </template>
      </n-button>
    </template>

    <div>
      <n-date-picker
        v-model:value="selectedDate"
        panel
        type="date"
        :on-panel-update="handlePanelUpdate"
        @update:value="handleDateSelect"
      />
    </div>
  </n-popover>
</template>

<script setup>
import { NDatePicker, NPopover, NIcon, NButton } from 'naive-ui';
import { CalendarClearOutline } from '@vicons/ionicons5';
import { ref } from 'vue';

const selectedDate = defineModel({
  type: String,
});
const showCalendar = ref(false);

const handleDateSelect = (value) => {
  selectedDate.value = value;
  showCalendar.value = false;
  // Після вибору дати, ви можете закрити дропдаун,
  // якщо у вас є прямий доступ до методу закриття NPopover.
  // Або керувати видимістю через v-model:show на NPopover.
};

// Примітка: Naive UI сам закриє NPopover, якщо користувач обрав дату.
// Однак, якщо ви хочете явно керувати закриттям,
// вам потрібно використовувати `v-model:show` на `n-popover`.

// Якщо ви використовуєте v-model:show на n-popover:
// const showCalendar = ref(false);
// const handleDateSelect = (value) => {
//   selectedDate.value = value;
//   showCalendar.value = false; // Закрити після вибору
// };
</script>
