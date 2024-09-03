<template>
  <div class="h-full flex flex-col">
    <Header />
    <el-main>
      <TaskList />
    </el-main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/widgets/header/ui/Header.vue";
import TaskList from "@/widgets/taskList/ui/TaskList.vue";

export default defineComponent({
  components: { TaskList, Header },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
