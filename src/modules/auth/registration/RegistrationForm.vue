<script setup>
import { computed, ref } from 'vue';
import { RoutePaths } from '../../../router/routes';
import { apiClient } from '../../../api';
import { useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';
import {
  AtSign,
  ChevronLeft,
  ChevronRight,
  Fingerprint,
  LockIcon,
  User,
} from 'lucide-vue-next';
import AuthForm from '../common/AuthForm.vue';
import AppIcon from '../../common/AppIcon.vue';
import { useMutation } from '@tanstack/vue-query';
import PasswordRequirements from './PasswordRequirements.vue';

const formStages = {
  user: 'user',
  comfirm: 'comfirm',
  password: 'password',
};

const message = useMessage();
const router = useRouter();

const username = ref('');
const email = ref('');
const token = ref('');
const password = ref('');
const repeat = ref('');
const isPasswordValid = ref(false);
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
    !isPasswordValid.value ||
    !isPasswordsEquals.value
  );
});

const { mutate: onRegistration, isPending: isLoading } = useMutation({
  mutationFn: async () => {
    const payload = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
    const res = await apiClient.auth.registration(payload);
    if (!res.data) {
      throw new Error(res.message);
    }
    router.push(RoutePaths.main);
  },
  onSuccess: () => {
    router.push(RoutePaths.login.path);
  },
  onError: (err) => {
    message.error(err.message || 'Something went wrong', { duration: 5000 });
  },
});

const { mutate: onSendToken, isPending: isSendTokenLoading } = useMutation({
  mutationFn: async () => {
    const res = await apiClient.auth.sendToken({
      email: email.value,
      lang: 'en',
    });
    if (!res.ok) {
      throw new Error(res.message);
    }
    return res.data;
  },
  onSuccess: () => {
    return onFormNavigate(formStages.comfirm);
  },
  onError: (err) => {
    message.error(err.message || 'Something went wrong', { duration: 5000 });
  },
});

const { mutate: onVerifyToken, isPending: isVerifyTokenLoading } = useMutation({
  mutationFn: async () => {
    const res = await apiClient.auth.verifyToken({
      email: email.value,
      token: token.value,
    });
    if (!res.ok) {
      throw new Error(res.message);
    }
    return res.data;
  },
  onSuccess: () => {
    return onFormNavigate(formStages.password);
  },
  onError: (err) => {
    message.error(err.message || 'Something went wrong', { duration: 5000 });
  },
});

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
              type="text"
              placeholder="Username"
              @keyup.enter="onSendToken"
            >
              <template #prefix>
                <AppIcon :icon="User" class="input-icon" />
              </template>
            </n-input>

            <n-input
              v-model:value="email"
              type="email"
              pattern=".+@.+"
              autocomplete="email"
              placeholder="Email"
              @keyup.enter="onSendToken"
            >
              <template #prefix>
                <AppIcon :icon="AtSign" class="input-icon" />
              </template>
            </n-input>
          </div>

          <n-button
            type="primary"
            class="w-full"
            :disabled="isNextDisabled || isSendTokenLoading"
            @click="onSendToken"
          >
            Next <AppIcon :icon="ChevronRight" :size="16" />
          </n-button>
        </div>

        <div
          v-else-if="activeStage === formStages.comfirm"
          class="flex col g-16"
        >
          <n-p>
            We’ve sent a verification code to your email. Please check your
            inbox and enter the code to continue
          </n-p>
          <div class="fields flex col g-16">
            <n-input
              v-model:value="token"
              type="text"
              placeholder="Email code"
              @keyup.enter="onFormNavigate(formStages.password)"
            >
              <template #prefix>
                <AppIcon :icon="Fingerprint" class="input-icon" />
              </template>
            </n-input>
          </div>

          <div class="flex col g-16">
            <n-button
              type="primary"
              class="w-full"
              :disabled="isNextDisabled || isVerifyTokenLoading"
              @click="onVerifyToken"
            >
              Next <AppIcon :icon="ChevronRight" :size="16" />
            </n-button>

            <n-button
              type="primary"
              class="w-full"
              ghost
              @click="onFormNavigate(formStages.user)"
            >
              <AppIcon :icon="ChevronLeft" :size="16" /> Back
            </n-button>
          </div>
        </div>

        <div
          v-else-if="activeStage === formStages.password"
          class="flex col g-16"
        >
          <div class="fields flex col g-16">
            <n-input
              v-model:value="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              :minlength="4"
              :maxlength="16"
            >
              <template #prefix>
                <AppIcon :icon="LockIcon" class="input-icon" />
              </template>
            </n-input>

            <n-input
              v-model:value="repeat"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Repeat"
              :minlength="4"
              :maxlength="16"
            >
              <template #prefix>
                <AppIcon :icon="LockIcon" class="input-icon" />
              </template>
            </n-input>

            <div class="flex j-between a-center g-8">
              <PasswordRequirements
                v-model="password"
                v-model:valid="isPasswordValid"
              />
              <div class="flex g-12 i-center">
                <n-checkbox v-model:checked="showPassword" size="large" />
                <n-text> Show password</n-text>
              </div>
            </div>
          </div>
          <div class="flex col g-16">
            <n-button
              type="primary"
              class="w-full"
              attr-type="submit"
              :disabled="isSubmitDisabled || isLoading"
              @click="onRegistration"
            >
              Sign Up
            </n-button>
            <n-button
              type="primary"
              class="w-full"
              ghost
              @click="onFormNavigate(formStages.user)"
            >
              <AppIcon :icon="ChevronLeft" :size="16" /> Back
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
