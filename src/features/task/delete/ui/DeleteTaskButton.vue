<template>
  <el-button
    type="danger"
    :icon="Delete"
    circle
    size="large"
    @click="handleClick"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Delete } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import { TaskService, useTaskStore } from "@/entities/task";
import { useToast } from "vue-toast-notification";
import { useUserStore } from "@/entities/user";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup({ id }) {
    const toast = useToast();
    const user = useUserStore().user;
    const deleteTask = useTaskStore().deleteTask;
    const handleClick = async () => {
      ElMessageBox.confirm("Вы хотите удалить задачу?")
        .then(async () => {
          try {
            if (!user) return;
            await TaskService.deleteTask(id, user?.id);
            deleteTask(id);
            toast.success("Задача успешно удалена");
          } catch (err) {
            toast.error("Не удалось удалить задачу");
          }
        })
        .catch(() => {});
    };

    return { id, Delete, handleClick };
  },
});
</script>

<style scoped></style>
