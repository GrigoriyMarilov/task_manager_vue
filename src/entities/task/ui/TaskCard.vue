<template>
  <div class="relative">
    <RouterLink :to="taskPath">
      <el-card
        class="p-4 shadow-lg rounded-lg cursor-pointer hover:bg-gray-100"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold">{{ task.name }}</h3>

          <div class="text-gray-500 text-sm">
            До: {{ formatDate(task.deadline) }}
            <span :class="statusClass"
              >{{ task.status ? "Выполнена" : "Не выполнена" }}
            </span>
          </div>
        </div>

        <div class="text-gray-600 mb-4">
          <p class="text-sm">{{ task.description }}</p>
        </div>
      </el-card>
    </RouterLink>
    <div class="absolute bottom-4 right-4">
      <slot name="feature-buttons" :task="task" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { Task } from "@/entities/task";

export default defineComponent({
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
  setup({ task }) {
    const taskPath = computed(() => "/task/" + task.index);

    const formatDate = (isoDate: Date) => {
      const date = new Date(isoDate);
      return date.toLocaleString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const statusClass = computed(() =>
      task.status ? "text-green-500" : "text-red-500",
    );

    return { task, formatDate, statusClass, taskPath };
  },
});
</script>

<style lang="scss" scoped></style>
