<template>
  <el-date-picker
    type="datetime"
    placeholder="Select date and time"
    size="large"
    style="width: 100%"
    v-model="localValue"
    @change="handleChange"
    :default-value="localValue"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    context: {
      type: Object,
      required: false,
    },
  },
  setup(props, { emit }) {
    const localValue = ref<Date | null>(
      props.context?.value ? new Date(props.context.value) : null,
    );

    const handleChange = (newValue: Date) => {
      if (newValue) {
        emit("update:modelValue", newValue.toISOString());
        if (props.context) {
          props.context.node.input(newValue.toISOString());
        }
      }
    };

    watch(
      () => props.context?.value,
      (newValue) => {
        localValue.value = newValue ? new Date(newValue) : null;
      },
    );

    return { localValue, handleChange };
  },
});
</script>
