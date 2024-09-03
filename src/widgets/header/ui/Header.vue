<template>
  <el-header class="flex justify-center p-2 relative h-auto">
    <FilterTasks />
    <div class="flex absolute right-4 items-center">
      <UserCard />
      <LogoutButton />
    </div>
  </el-header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserCard from "@/entities/user/ui/UserCard.vue";
import { LogoutButton } from "@/features/user/logout";
import FilterTasks from "@/features/task/filter";

export default defineComponent({
  components: { FilterTasks, LogoutButton, UserCard },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
