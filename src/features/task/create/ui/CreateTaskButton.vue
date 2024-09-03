<template>
  <el-button type="primary" color="black" @click="handleClick">
    Создать Задачу
  </el-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getNode } from "@formkit/core";
import { Task, TaskService, useTaskStore } from "@/entities/task";
import { formErrorHandler } from "@/shared";
import { useToast } from "vue-toast-notification";
import { useUserStore } from "@/entities/user";

export default defineComponent({
  props: {
    formId: {
      type: String,
      required: true,
    },
  },
  emits: ["success"],
  setup({ formId }, { emit }) {
    const form = getNode<Partial<Task>>(formId);
    const user = useUserStore().user;
    const addTask = useTaskStore().addTask;
    const toast = useToast();

    const handleClick = async () => {
      try {
        if (!form || !user) return;
        if (!form.context?.state.valid) {
          toast.error(
            "Форма содержит ошибки. Пожалуйста, исправьте их перед отправкой.",
          );
          return;
        }
        const res = await TaskService.createTask({
          ...form.value,
          userId: user.id,
          createdAt: new Date().getTime(),
        });
        toast.success("Задача успешно создана");
        addTask(res.data);
        emit("success", res.data);
      } catch (error) {
        formErrorHandler(error, toast, form);
      }
    };
    return { handleClick };
  },
});
</script>

<style scoped></style>
