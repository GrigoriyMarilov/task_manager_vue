<template>
  <el-button type="primary" color="black" size="large" @click="handleCLick">
    Обновить
  </el-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getNode } from "@formkit/core";
import { Task, TaskService, useTaskStore } from "@/entities/task";
import { formErrorHandler } from "@/shared";
import { useToast } from "vue-toast-notification";

export default defineComponent({
  props: {
    formId: {
      type: String,
      required: true,
    },
  },
  emits: ["success"],
  setup({ formId }, { emit }) {
    const form = getNode<Task>(formId);
    const toast = useToast();
    const updateTask = useTaskStore().updateTask;
    const handleCLick = async () => {
      try {
        if (!form) return;
        if (!form.context?.state.valid) {
          toast.error(
            "Форма содержит ошибки. Пожалуйста, исправьте их перед отправкой.",
          );
          return;
        }
        const res = await TaskService.editTask({
          ...form?.value,
        });
        updateTask(res.data, res.data.index);
        toast.success("Задача обновлена");
        emit("success", res.data);
      } catch (error) {
        formErrorHandler(error, toast, form);
      }
    };
    return { handleCLick };
  },
});
</script>

<style scoped></style>
