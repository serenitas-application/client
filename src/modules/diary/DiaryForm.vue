<script setup>
import { SaveOutline } from '@vicons/ionicons5';
import { computed, ref } from 'vue';
import { formatDateWithWeekday } from '../../common/utils/dates';
import { DatePicker } from '../common';
import DiarySecretKey from './DiarySecretKey.vue';
import { apiClient } from '../../api';
import { useMutation } from '@tanstack/vue-query';
import { useMessage } from 'naive-ui';
import { encryptToLatin } from '../../crypto';

const message = useMessage();

const title = ref(new Date());
const content = ref('');
const secretKey = ref('');

const diaryTitle = computed(() => formatDateWithWeekday(title.value));
const isDisabled = computed(() => !content.value);

const prepareContentForSave = async () => {
  if (!secretKey.value) return content.value;
  return await encryptToLatin(content.value, secretKey.value);
};

const { mutate: createDiaryNote, isPending: isLoading } = useMutation({
  mutationFn: async () => {
    const res = await apiClient.diary.create({
      title: title.value,
      content: await prepareContentForSave(),
    });

    if (!res.data) throw new Error(res.message);
    return res.data;
  },
  onError: (err) => {
    message.error(err.message, { duration: 5000 });
  },
});
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
          :disabled="isDisabled || isLoading"
          @click="createDiaryNote"
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
