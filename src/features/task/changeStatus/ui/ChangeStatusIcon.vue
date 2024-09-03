<template>
  <el-button
    v-if="!task.status"
    type="primary"
    :icon="Check"
    circle
    size="large"
    @click="handleClick"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, toRaw } from "vue";
import { Check } from "@element-plus/icons-vue";
import { Task, TaskService, useTaskStore } from "@/entities/task";
import { useToast } from "vue-toast-notification";

export default defineComponent({
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
  setup({ task }) {
    const toast = useToast();
    const updateTask = useTaskStore().updateTask;
    const handleClick = async () => {
      try {
        const taskObject = toRaw(task);

        const res = await TaskService.editTask({
          ...taskObject,
          status: !taskObject.status,
        });

        toast.success("Задача выполнена");
        updateTask(res.data, res.data.index);
      } catch (err) {}
    };
    return { task, Check, handleClick };
  },
});
</script>

<style scoped></style>
