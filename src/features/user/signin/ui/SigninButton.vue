<template>
  <el-button type="primary" color="black" size="large" @click="handleClick">
    Войти
  </el-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from "@/entities/user/model/user.store.ts";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import { getNode } from "@formkit/core";
import { formErrorHandler, signupFormData } from "@/shared";
import { UserService } from "@/entities/user";

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
      if (!form) return;

      try {
        const res = await UserService.signin(form.value);
        if (!res) return;
        const [user] = res.data;
        userStore.setUser(user);
        toast.success("Вход выполнен успешно");
        await router.push("/");
      } catch (error) {
        formErrorHandler(error, toast, form);
      }
    };
    return { handleClick };
  },
});
</script>

<style scoped></style>
