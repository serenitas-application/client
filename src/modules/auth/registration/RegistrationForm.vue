<script setup>
import { computed, ref } from 'vue';
import { RoutePaths } from '../../../router/routes';
import { apiClient } from '../../../api';
import { useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';
import {
  LockClosedOutline,
  MailOutline,
  PersonOutline,
} from '@vicons/ionicons5';
import AuthForm from '../common/AuthForm.vue';

const formStages = {
  user: 'user',
  password: 'password',
};

const message = useMessage();
const router = useRouter();

const username = ref('');
const email = ref('');
const password = ref('');
const repeat = ref('');
const showPassword = ref(false);

const activeStage = ref(formStages.user);

const isNextDisabled = computed(() => !username.value || !email.value);

const isPasswordsEquals = computed(() => password.value === repeat.value);

const isSubmitDisabled = computed(() => {
  return (
    !email.value ||
    !password.value ||
    !username.value ||
    !repeat.value ||
    !isPasswordsEquals.value
  );
});

const onRegistration = async () => {
  const payload = {
    username: username.value,
    email: email.value,
    password: password.value,
  };
  const res = await apiClient.auth.registration(payload);
  if (!res.data) {
    return message.error(res.message);
  }
  router.push(RoutePaths.main);
};

const onFormNavigate = (value) => {
  activeStage.value = value;
};
</script>

<template>
  <AuthForm>
    <template #body>
      <transition name="fade" mode="out-in">
        <div v-if="activeStage === formStages.user" class="flex col g-16">
          <div class="fields flex col g-16">
            <n-input
              v-model:value="username"
              size="large"
              type="text"
              placeholder="Username"
              @keyup.enter="onFormNavigate(formStages.password)"
            >
              <template #prefix>
                <n-icon :component="PersonOutline" class="input-icon" />
              </template>
            </n-input>

            <n-input
              v-model:value="email"
              size="large"
              type="email"
              pattern=".+@.+"
              autocomplete="email"
              placeholder="Email"
              @keyup.enter="onFormNavigate(formStages.password)"
            >
              <template #prefix>
                <n-icon :component="MailOutline" class="input-icon" />
              </template>
            </n-input>
          </div>

          <n-button
            ghost
            size="large"
            type="primary"
            class="w-full"
            :disabled="isNextDisabled"
            @click="onFormNavigate(formStages.password)"
          >
            Next >
          </n-button>
        </div>

        <div
          v-else-if="activeStage === formStages.password"
          class="flex col g-16"
        >
          <div class="fields flex col g-16">
            <n-input
              v-model:value="password"
              :type="showPassword ? 'text' : 'password'"
              size="large"
              placeholder="Password"
              :minlength="4"
              :maxlength="16"
            >
              <template #prefix>
                <n-icon :component="LockClosedOutline" class="input-icon" />
              </template>
            </n-input>

            <n-input
              v-model:value="repeat"
              :type="showPassword ? 'text' : 'password'"
              size="large"
              placeholder="Repeat"
              :minlength="4"
              :maxlength="16"
            >
              <template #prefix>
                <n-icon :component="LockClosedOutline" class="input-icon" />
              </template>
            </n-input>

            <div class="flex g-12 i-center">
              <n-checkbox v-model:checked="showPassword" size="large" />
              <n-text> Show password</n-text>
            </div>
          </div>
          <div class="flex col g-16">
            <n-button
              type="primary"
              class="w-full"
              size="large"
              attr-type="submit"
              :disabled="isSubmitDisabled"
              @click="onRegistration"
            >
              Sign Up
            </n-button>
            <n-button
              size="large"
              type="primary"
              class="w-full"
              ghost
              @click="onFormNavigate(formStages.user)"
            >
              Back
            </n-button>
          </div>
        </div>
      </transition>
      <n-p align="center">
        Already have an account?
        <router-link :to="RoutePaths.login.path">
          <n-text type="primary" strong> Sign in </n-text>
        </router-link>
      </n-p>
    </template>
  </AuthForm>
</template>

<style scoped>
.fields {
  margin: 8px 0;
}
</style>
