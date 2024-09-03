<template>
  <el-button text type="danger" @click="handleClick">
    <el-text type="danger" class="font-bold"> Выйти</el-text>
  </el-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/entities/user";

export default defineComponent({
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const handleClick = () => {
      userStore.deleteUser();
      router.push("/signin");
    };
    return { handleClick };
  },
});
</script>

<style scoped></style>
