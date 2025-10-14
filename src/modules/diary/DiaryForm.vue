<script setup>
import { SaveOutline } from '@vicons/ionicons5';
import { computed, ref } from 'vue';
import { formatDateWithWeekday } from '../../common/utils/dates';
import { DatePicker } from '../common';
import DiarySecretKey from './DiarySecretKey.vue';

const title = ref(new Date());
const content = ref('');
const secretKey = ref('');

const diaryTitle = computed(() => formatDateWithWeekday(title.value));
const isDisabled = computed(() => !content.value);
</script>

<template>
  <n-form class="journal-form">
    <div class="flex i-center j-between">
      <div class="flex i-center j-between g-12 relative">
        <n-h3 style="font-weight: 600" class="m-0">
          {{ diaryTitle }}
        </n-h3>
        <DatePicker v-model="title" />
      </div>

      <div class="flex i-center g-8">
        <DiarySecretKey v-model:secret="secretKey" />
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
          Save
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
  </n-form>
</template>
