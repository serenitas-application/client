<script setup>
import { SaveOutline, SparklesOutline } from '@vicons/ionicons5';
import { computed, ref } from 'vue';
import DatePicker from './DatePicker.vue';
import { formatDateWithWeekday } from '../../common/utils/dates';

const date = ref(new Date());

const diaryTitle = computed(() => formatDateWithWeekday(date.value));
</script>

<template>
  <n-form class="journal-form">
    <div class="flex i-center j-between">
      <div class="flex i-center j-between g-12 relative">
        <n-h2 style="font-weight: 600" class="m-0">{{ diaryTitle }}</n-h2>

        <DatePicker v-model="date" />
      </div>

      <div class="flex i-center g-8">
        <n-button type="error" class="g-4">
          <template #icon>
            <n-icon>
              <SparklesOutline />
            </n-icon>
          </template>
          Clear
        </n-button>
        <n-button
          type="primary"
          class="g-4"
          :disabled="isDisabled"
          @click="create"
        >
          <template #icon>
            <n-icon>
              <SaveOutline />
            </n-icon>
          </template>
          Create
        </n-button>
      </div>
    </div>
    <n-divider class="line" />
    <n-input
      v-model:value="content"
      type="textarea"
      placeholder="Write here your minds..."
      class="textarea clear-input"
      :bordered="false"
      :resizable="false"
    />
    <!-- <div class="flex i-center">
      <div class="flex i-center g-8 input-label">
        <n-icon size="14" class="flex">
          <KeyOutline />
        </n-icon>
        <n-p>Secret key</n-p>
      </div>
      <n-input
        placeholder="Secret key..."
        class="input"
        type="password"
        show-password-on="click"
      />
    </div>

    <div class="flex j-between i-center title-header">
      <div class="flex i-center g-8">
        <n-button type="error" class="g-4">
          <template #icon>
            <n-icon>
              <SparklesOutline />
            </n-icon>
          </template>
          Clear
        </n-button>
        <n-button
          type="primary"
          class="g-4"
          :disabled="isDisabled"
          @click="create"
        >
          <template #icon>
            <n-icon>
              <SaveOutline />
            </n-icon>
          </template>
          Create
        </n-button>
      </div>
    </div> -->
  </n-form>
</template>
