<script setup>
import { ref } from 'vue';
import { decryptFromLatin } from '../../../crypto';

const isPrivate = defineModel('private', {
  type: Boolean,
});
const encryptedData = defineModel('encrypted', {
  type: String,
});
const decryptedData = defineModel('decrypted', {
  type: String,
});

const secretKey = ref('');
const error = ref('');

const decryptContent = async () => {
  const result = await decryptFromLatin(encryptedData.value, secretKey.value);
  if (!result) return (error.value = 'Sorry, try again');
  decryptedData.value = result;
  error.value = '';
  isPrivate.value = false;
};
</script>

<template>
  <n-card title="Locked" class="flex col g-8">
    <n-form>
      <n-p>Please, enter the <b>secret key</b> to unlock current content</n-p>
      <n-input
        v-model:value="secretKey"
        class="inp"
        type="password"
        placeholder="Enter secret key"
      />
      <n-text type="error">{{ error }}</n-text>
      <div class="flex j-end a-center">
        <n-button
          type="primary"
          attr-type="submit"
          ghost
          :disabled="!secretKey"
          @click="decryptContent"
        >
          Unlock
        </n-button>
      </div>
    </n-form>
  </n-card>
</template>

<style scoped>
.inp {
  margin: 24px 0;
}
</style>
