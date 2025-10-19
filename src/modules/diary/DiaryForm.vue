<script setup>
import { computed } from 'vue';
import { formatDateWithWeekday } from '../../common/utils/dates';
import { DatePicker } from '../common';
import { SecretKeySet } from '../common/secret-key';

const {
  diaryRecords = [],
  diary = null,
  isLoading,
} = defineProps({
  diaryRecords: { type: Array },
  diary: { type: Object },
  isLoading: { type: Boolean },
});

defineEmits({ onClick: null });

const selectedDate = defineModel('selectedDate', { type: Number });
const title = defineModel('title', { type: [String, Number, Date] });
const content = defineModel('content', { type: String });
const secretKey = defineModel('secret', { type: String });

const diaryTitle = computed(() =>
  formatDateWithWeekday(title.value ?? selectedDate.value),
);

const isContentReadonly = computed(() => !!diary && !!diary.content);
</script>

<template>
  <n-form class="diary-form">
    <div class="flex i-center j-between">
      <div class="flex i-center j-between g-12 relative">
        <n-h3 style="font-weight: 600" class="m-0">
          {{ diaryTitle }}
        </n-h3>
        <DatePicker
          v-model:title="title"
          v-model:selected-date="selectedDate"
          :allowed-dates="diaryRecords"
        />
      </div>
      <div class="flex a-center g-12">
        <SecretKeySet v-if="!isContentReadonly" v-model:secret="secretKey" />
        <slot name="actions" />
      </div>
    </div>

    <n-divider class="line" />

    <div class="content">
      <n-spin :show="isLoading" class="spin">
        <slot name="content">
          <n-input
            v-model:value="content"
            type="textarea"
            placeholder="Write here your minds..."
            class="textarea clear-input"
            :bordered="false"
            :resizable="false"
            :readonly="isContentReadonly"
          />
        </slot>
      </n-spin>
    </div>
  </n-form>
</template>

<style scoped>
.diary-form {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--header-height));
}
.textarea {
  width: 100%;
  height: 100%;
}
.content {
  display: grid;
  height: 100%;
}
.spin :deep(.n-spin-content) {
  height: 100%;
}
:deep(textarea[readonly]) {
  cursor: default !important;
}
</style>
