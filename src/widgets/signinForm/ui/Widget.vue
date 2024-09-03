<template>
  <el-card class="w-80">
    <FormKit type="form" id="signin" submit-label="signin" :actions="false">
      <h1 class="text-2xl font-bold mb-2">Вход</h1>

      <FormKit
        type="text"
        name="email"
        label="Ваша почта"
        placeholder="jane@example.com"
        validation="required|email"
        :validation-messages="{
          required: 'Обязательно поле',
          email: 'Пожалуйста укажите действительную электронную почту',
        }"
      />

      <FormKit
        type="password"
        name="password"
        label="Пароль"
        validation="required|length:6|matches:/[^a-zA-Z]/"
        :validation-messages="{
          required: 'Обязательно поле',
          length: 'Попробуй сделать пароль длиннее',
          matches: 'Нужны буквы',
        }"
        placeholder="Пароль"
        help="Придумайте пароль"
      />
      <div class="flex flex-col items-center gap-4">
        <RouterLink to="signup">Нет аккаунта?</RouterLink>
        <SigninButton form-id="signin" />
      </div>
    </FormKit>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SigninButton from "@/features/user/signin/ui/SigninButton.vue";

export default defineComponent({
  components: { SigninButton },
  setup() {
    return {};
  },
});
</script>
