<script setup>
import { useMutation } from '@tanstack/vue-query';
import { useMessage } from 'naive-ui';
import { encryptToLatin } from '../../crypto';
import { computed } from 'vue';
import { modsList } from './action-mods';
import { apiClient } from '../../api';
import AppIcon from '../common/AppIcon.vue';
import { SaveIcon, XIcon } from 'lucide-vue-next';

const message = useMessage();

const editData = defineModel('diary', { type: Object });
const secret = defineModel('secret', { type: String });
const mode = defineModel('mode', { type: String });

const emit = defineEmits({
  onSuccess: null,
});

const isDisabled = computed(
  () => !editData.value.title || !editData.value.content,
);

const prepareContentForSave = async () => {
  if (!secret.value) return editData.value.content;
  return await encryptToLatin(editData.value.content, secret.value);
};

const cancelEdit = () => {
  mode.value = modsList.view;
};

const { mutate: editDiaryNote, isPending: isLoading } = useMutation({
  mutationFn: async () => {
    console.log(editData.value.id);
    const res = await apiClient.diary.update(editData.value.id, {
      title: new Date(editData.value.title),
      content: await prepareContentForSave(),
      isPrivate: !!secret.value,
    });

    if (!res.data) throw new Error(res.message);
    message.success('Entity updated successfully', { duration: 5000 });
    emit('onSuccess');
    return res.data;
  },
  onError: (err) => {
    message.error(err.message, { duration: 5000 });
  },
});
</script>

<template>
  <div class="flex a-center g-12">
    <n-button
      type="error"
      class="g-4"
      :disabled="isDisabled || isLoading"
      @click="cancelEdit"
    >
      <template #icon>
        <AppIcon :icon="XIcon" />
      </template>
      Cancel
    </n-button>
    <n-button
      type="primary"
      class="g-4"
      :disabled="isDisabled || isLoading"
      @click="editDiaryNote"
    >
      <template #icon>
        <AppIcon :icon="SaveIcon" />
      </template>
      Save
    </n-button>
  </div>
</template>
