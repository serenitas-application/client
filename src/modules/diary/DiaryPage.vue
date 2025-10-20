<script setup>
import { ref, watch } from 'vue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { apiClient } from '../../api';
import { useMessage } from 'naive-ui';
import DiaryForm from './DiaryForm.vue';
import { formatDateToYMD } from '../../common/utils/dates';
import DiaryCreate from './DiaryCreate.vue';
import { SecretKeyCheck } from '../common/secret-key';
import DiaryActionsPanel from './DiaryActionsPanel.vue';
import DiaryEdit from './DiaryEdit.vue';
import { modsList } from './action-mods';
import DiaryDelete from './DiaryDelete.vue';

const qc = useQueryClient();
const message = useMessage();

const mode = ref(modsList.create);

const selectedDate = ref(Date.now());
const isDiaryPrivate = ref(false);
const hasRecord = ref(false);
const isFormReadonly = ref(false);

const diaryDateRecords = ref([]);
const diary = ref({
  id: 1,
  title: String(new Date(selectedDate.value)),
  content: '',
  decryptedContent: '',
  originContent: '',
  secret: '',
});

const getDiaryRecords = async () => {
  const result = await apiClient.diary.getDiaryRecords();
  if (!result.data) message.error(result.message, { duration: 5000 });
  return result.data;
};

const getDiaryByDate = async () => {
  const date = formatDateToYMD(selectedDate.value);
  const result = await apiClient.diary.getDiaryByDate(date);
  if (result.message && !result.data) {
    message.error(result.message, { duration: 5000 });
  }
  return result.data;
};

const { isLoading: recordsLoading } = useQuery({
  queryKey: ['diaryRecords'],
  retry: false,
  queryFn: async () => {
    const data = await getDiaryRecords();
    diaryDateRecords.value = data.map((i) => i.createDate);
    return data;
  },
});

const { data: diaryData, isLoading } = useQuery({
  queryKey: ['diary', () => selectedDate.value],
  retry: false,
  refetchOnWindowFocus: false,
  queryFn: async () => {
    const data = await getDiaryByDate();
    if (!data) {
      hasRecord.value = false;
      isFormReadonly.value = false;

      diary.value.id = 0;
      diary.value.title = String(new Date());
      diary.value.content = '';
      diary.value.originContent = '';

      return data;
    }

    diary.value.id = data.id;
    diary.value.title = data?.title;
    diary.value.content = data?.content;
    diary.value.originContent = data?.content;

    isDiaryPrivate.value = data?.isPrivate;
    mode.value = modsList.view;
    hasRecord.value = true;
    isFormReadonly.value = true;

    return data;
  },
});

async function onSuccess() {
  await qc.invalidateQueries({ queryKey: ['diary'] });
}

watch(mode, (newMode, oldMode) => {
  if (oldMode === modsList.edit && diary.value.decryptedContent) {
    diary.value.content = diary.value.decryptedContent;
  }
  if (newMode === modsList.edit) {
    isFormReadonly.value = false;
  }
});

watch(
  () => diary.value.decryptedContent,
  (decrypted) => {
    diary.value.content = decrypted;
  },
);
</script>

<template>
  <section>
    <DiaryForm
      v-model:selected-date="selectedDate"
      v-model:title="diary.title"
      v-model:content="diary.content"
      v-model:secret="diary.secret"
      :is-loading="isLoading"
      :is-readonly="isFormReadonly"
      :records-loading="recordsLoading"
      :diary-records="diaryDateRecords"
      :diary="diaryData"
    >
      <template #actions>
        <DiaryActionsPanel
          v-if="mode === modsList.view && !isDiaryPrivate"
          v-model:edit="isFormReadonly"
          v-model:mode="mode"
        />
        <DiaryCreate
          v-if="mode === modsList.create"
          v-model:title="diary.title"
          v-model:content="diary.content"
          v-model:secret="diary.secret"
          @on-success="onSuccess"
        />

        <DiaryEdit
          v-if="mode === modsList.edit"
          v-model:diary="diary"
          v-model:mode="mode"
          v-model:secret="diary.secret"
          @on-success="onSuccess"
        />
        <DiaryDelete
          :id="diary.id"
          v-model:mode="mode"
          v-model:selected-date="selectedDate"
          :title="diary.title"
          @on-success="onSuccess"
        />
      </template>

      <template #content>
        <div v-if="isDiaryPrivate" class="content">
          <SecretKeyCheck
            v-model:private="isDiaryPrivate"
            v-model:encrypted="diary.originContent"
            v-model:decrypted="diary.decryptedContent"
            class="card"
          />
        </div>
      </template>
    </DiaryForm>
  </section>
</template>

<style scoped>
.card {
  max-width: 400px;
}
.content {
  display: grid;
  place-items: center;
  height: 100%;
}
</style>
