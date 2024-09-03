<template>
  <el-card class="w-80">
    <FormKit type="form" id="singup" :actions="false">
      <h1 class="text-2xl font-bold mb-2">Регистрация</h1>

      <FormKit
        type="text"
        name="name"
        label="Ваше имя"
        placeholder="Григорий Марилов"
        validation="required"
        :validation-messages="{
          required: 'Обязательно поле',
        }"
      />
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
      <div class="double">
        <FormKit
          type="password"
          name="password"
          label="Пароль"
          validation="required|length:6|matches:/[^a-zA-Z]/"
          :validation-messages="{
            required: 'Обязательно поле',
            length: 'Попробуй сделать пароль длиннее',
            matches: 'Нужны буквы и цифры',
          }"
          placeholder="Пароль"
          help="Придумайте пароль"
        />
        <FormKit
          type="password"
          name="password_confirm"
          label="Подтверждение пароля"
          placeholder="Пароль"
          validation="required|confirm"
          :validation-messages="{
            required: 'Обязательно поле',
            confirm: 'не совпадает',
          }"
          help="Подтвердите пароль"
        />
      </div>

      <div class="flex flex-col items-center gap-4">
        <RouterLink to="signin">Уже есть аккаунт?</RouterLink>
        <signup-button form-id="singup" />
      </div>
    </FormKit>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SignupButton from "@/features/user/signup/ui/SignupButton.vue";

export default defineComponent({
  components: { SignupButton },
  setup() {},
});
</script>

<style scoped></style>
