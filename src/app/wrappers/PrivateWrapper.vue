<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import { useUserStore } from "@/entities/user/model/user.store.ts";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const user = useUserStore();
    const router = useRouter();
    onBeforeMount(() => {
      if (!user.user) {
        return router.push("signin");
      }
    });

    return {};
  },
});
</script>

<style scoped></style>
