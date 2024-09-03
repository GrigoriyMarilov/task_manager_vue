<template>
  <div class="p-1 w-min whitespace-nowrap">
    <el-text type="success" size="large" class="font-bold">{{
      user?.name
    }}</el-text>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from "@/entities/user/model/user.store.ts";

export default defineComponent({
  setup() {
    const user = useUserStore().user;

    return { user };
  },
});
</script>

<style scoped></style>
