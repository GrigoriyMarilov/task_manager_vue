<template>
  <CenteringLayout>
    <Widget/>
  </CenteringLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Widget from "@/widgets/singupForm/ui/Widget.vue";
import CenteringLayout from "@/shared/ui/layouts/CenteringLayout.vue";

export default defineComponent({
  components: {CenteringLayout, Widget},
  setup() {


    return {}
  }
})
</script>

<style scoped>

</style>