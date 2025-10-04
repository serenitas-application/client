<script setup>
import { computed, ref } from "vue";
import { RoutePaths } from "../../../router/routes";
import { apiClient } from "../../../api";
import { useMessage } from "naive-ui";
import { useRouter } from "vue-router";
import { MailOutline, LockClosedOutline } from "@vicons/ionicons5";
import { useAuth } from "../../../composables/auth";
import AuthForm from "../common/AuthForm.vue";

const message = useMessage();
const auth = useAuth();
const router = useRouter();

const email = ref("");
const password = ref("");

const isDisabled = computed(() => {
  return !email.value || !password.value;
});

const onLogin = async () => {
  const res = await apiClient.auth.login({ email: email.value, password: password.value });
  if (!res.data) {
    return message.error(res.message, { duration: 5000 });
  }
  auth.login(res.data);
  router.push(RoutePaths.main);
};
</script>

<template>
  <AuthForm>
    <template #body>
      <n-input v-model:value="email" size="large" type="email" pattern=".+@.+" autocomplete="email" placeholder="Email">
        <template #prefix>
          <n-icon :component="MailOutline" class="input-icon" />
        </template>
      </n-input>
      <n-input v-model:value="password" size="large" type="password" show-password-on="click" placeholder="Password">
        <template #prefix>
          <n-icon :component="LockClosedOutline" class="input-icon" />
        </template>
      </n-input>

      <div class="flex col g-20">
        <n-p>
          <router-link :to="RoutePaths.registration.path">
            <n-text type="primary" strong>Forgot password?</n-text>
          </router-link>
        </n-p>
        <n-button size="large" type="primary" class="w-full" attr-type="submit" :disabled="isDisabled" @click="onLogin">
          Sign In
        </n-button>
        <n-p align="center">
          Don't have an account?
          <router-link :to="RoutePaths.registration.path">
            <n-text type="primary" strong>Sign up</n-text>
          </router-link>
        </n-p>
      </div>
    </template>
  </AuthForm>
</template>
