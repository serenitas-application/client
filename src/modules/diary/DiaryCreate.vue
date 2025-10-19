<script setup>
import { SaveOutline } from '@vicons/ionicons5';
import { useMutation } from '@tanstack/vue-query';
import { apiClient } from '../../api';
import { useMessage } from 'naive-ui';
import { encryptToLatin } from '../../crypto';

const message = useMessage();

const title = defineModel('title', { type: [String, Number, Date] });
const content = defineModel('content', { type: String });
const secret = defineModel('secret', { type: String });

const emit = defineEmits({
  onSuccess: null,
});

const prepareContentForSave = async () => {
  if (!secret.value) return content.value;
  return await encryptToLatin(content.value, secret.value);
};

const { mutate: createDiaryNote, isPending: isLoading } = useMutation({
  mutationFn: async () => {
    const res = await apiClient.diary.create({
      title: new Date(title.value),
      content: await prepareContentForSave(),
      isPrivate: !!secret.value,
    });

    if (!res.data) throw new Error(res.message);
    message.success('Created', { duration: 5000 });
    emit('onSuccess');
    return res.data;
  },
  onError: (err) => {
    message.error(err.message, { duration: 5000 });
  },
});
</script>

<template>
  <n-button
    type="primary"
    class="g-4"
    :disabled="isLoading"
    @click="createDiaryNote"
  >
    <template #icon>
      <n-icon>
        <SaveOutline />
      </n-icon>
    </template>
    Save
  </n-button>
</template>
