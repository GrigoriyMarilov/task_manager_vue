<template>
  <el-button
    type="primary"
    color="black"
    size="large"
    @click="dialogVisible = true"
  >
    Создать задачу
  </el-button>

  <el-dialog v-model="dialogVisible" title="Создать новую задачу" width="500">
    <FormKit
      type="form"
      id="createTask"
      submit-label="createTask"
      :actions="false"
    >
      <FormKit
        type="text"
        name="name"
        :classes="{
          wrapper: 'max-w-full w-full!',
        }"
        label="Название"
        placeholder="Помыть посуду"
        validation="required"
        :validation-messages="{
          required: 'Обязательно поле',
        }"
      />

      <FormKit
        type="textarea"
        name="description"
        :classes="{
          wrapper: 'max-w-full w-full!',
          input: 'resize-none',
        }"
        label="Описание"
        placeholder="Помыть посуду: 2 кружки, тарелку, ложку"
      />

      <FormKit
        type="checkbox"
        :classes="{
          wrapper: 'position-relative',
        }"
        label="Задача уже выполнена"
        name="status"
        :value="false"
      />

      <FormKit
        :classes="{
          wrapper: 'max-w-full w-full',
        }"
        :type="datePicker"
        name="deadline"
        label="Дедлайн"
        help="Когда задача должна быть выполнена?"
        validation="required"
        :validation-messages="{
          required: 'Обязательно поле',
        }"
      />
      <CreateTaskButton form-id="createTask" @success="dialogVisible = false" />
    </FormKit>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SigninButton from "@/features/user/signin/ui/SigninButton.vue";
import CreateTaskButton from "@/features/task/create";
import { createInput } from "@formkit/vue";
import { DatePicker } from "@/shared";

export default defineComponent({
  components: { CreateTaskButton, SigninButton },
  setup() {
    const dialogVisible = ref(false);
    const datePicker = createInput(DatePicker);

    return { dialogVisible, datePicker };
  },
});
</script>

<style scoped></style>
