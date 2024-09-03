<template>
  <el-button type="primary" color="black" @click="handleClick">
    Зарегестрироваться
  </el-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UserService } from "@/entities/user";
import { formErrorHandler, signupFormData } from "@/shared";

import { useUserStore } from "@/entities/user/model/user.store.ts";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import { getNode } from "@formkit/core";

export default defineComponent({
  props: {
    formId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const userStore = useUserStore();
    const router = useRouter();
    const toast = useToast();
    const form = getNode<signupFormData>(props.formId);

    const handleClick = async () => {
      if (form) {
        try {
          if (!form.context?.state.valid) {
            toast.error(
              "Форма содержит ошибки. Пожалуйста, исправьте их перед отправкой.",
            );
            return;
          }
          const res = await UserService.signup(form.value);

          if (!res) return;
          userStore.setUser(res.data);

          await router.push("/");
          toast.success("Успешная регистрация");
        } catch (error) {
          formErrorHandler(error, toast, form);
        }
      }
    };

    return { handleClick };
  },
});
</script>
