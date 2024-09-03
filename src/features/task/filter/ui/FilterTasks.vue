<template>
  <div class="flex flex-col">
    <el-input
      class="mx-auto"
      v-model="input"
      style="width: 240px"
      placeholder="Найти задачу"
      @input="inputHandler"
    />
    <el-radio-group v-model="filter" @change="radioHandler">
      <el-radio value="old">Старые</el-radio>
      <el-radio value="new">Новые</el-radio>
      <el-radio value="nearest">Ближайшие</el-radio>
      <el-radio value="completed">Завершенные</el-radio>
    </el-radio-group>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useTaskStore } from "@/entities/task";

export default defineComponent({
  setup() {
    const taskStore = useTaskStore();
    const input = computed({
      get: () => taskStore.searchQuery,
      set: (value: string) => taskStore.setSearchQuery(value),
    });
    const filter = computed({
      get: () => taskStore.filter,
      set: (value: string) => taskStore.setRadioFilter(value),
    });

    const inputHandler = () => {
      taskStore.applyFilters();
    };

    const radioHandler = () => {
      taskStore.applyFilters();
    };

    return { input, inputHandler, filter, radioHandler };
  },
});
</script>

<style scoped></style>
