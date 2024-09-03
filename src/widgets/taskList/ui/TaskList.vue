<template>
  <div class="w-full h-full">
    <div
      class="mx-auto max-w-2xl w-full overflow-y-auto flex flex-col gap-5 pb-10"
    >
      <el-pagination
        @current-change="paginationChange"
        class="mx-auto pagination"
        layout="prev, pager, next"
        :total="totalPages"
        v-model="page"
        :page-size="8"
        background
      />
      <TaskCard v-for="task in tasks" :key="JSON.stringify(task)" :task="task">
        <template v-slot:feature-buttons="{ task }">
          <DeleteTaskButton :id="task.index" />
          <el-button
            @click="dialogButtonClick(task)"
            :icon="Edit"
            circle
            type="warning"
            size="large"
          />
          <ChangeStatusIcon :task="task" />
        </template>
      </TaskCard>

      <el-dialog
        v-model="dialogVisible"
        v-if="selectedTask"
        :key="selectedTask.index"
      >
        <FormKit
          type="form"
          id="editTask"
          submit-label="createTask"
          :actions="false"
        >
          <FormKit type="hidden" name="index" :value="selectedTask.index" />
          <FormKit
            type="text"
            name="name"
            :classes="{
              wrapper: 'max-w-full w-full!',
            }"
            v-model="selectedTask.name"
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
            v-model="selectedTask.description"
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
            :value="selectedTask.status"
          />

          <FormKit
            :classes="{
              wrapper: 'max-w-full w-full',
            }"
            :modelValue="selectedTask.deadline"
            :type="datePicker"
            name="deadline"
            label="Дедлайн"
            help="Когда задача должна быть выполнена?"
            validation="required"
            :validation-messages="{
              required: 'Обязательно поле',
            }"
          />
          <EditTaskButton form-id="editTask" @success="dialogVisible = false" />
        </FormKit>
      </el-dialog>

      <div v-if="tasks.length < 1" class="text-center">
        У вас пока нет задач
      </div>
    </div>
    <div class="fixed bottom-10 right-10">
      <CreateTask />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import TaskCard from "@/entities/task/ui/TaskCard.vue";
import { Task, TaskService, useTaskStore } from "@/entities/task";
import { useUserStore } from "@/entities/user";
import { DeleteTaskButton } from "@/features/task/delete";
import { Edit } from "@element-plus/icons-vue";
import { createInput } from "@formkit/vue";
import { DatePicker } from "@/shared";
import EditTaskButton from "@/features/task/edit";
import ChangeStatusIcon from "@/features/task/changeStatus";
import CreateTask from "@/widgets/createTask/ui/CreateTask.vue";

export default defineComponent({
  computed: {
    Edit() {
      return Edit;
    },
    DeleteTaskButton() {
      return DeleteTaskButton;
    },
  },
  components: {
    CreateTask,
    DeleteTaskButton,
    TaskCard,
    EditTaskButton,
    ChangeStatusIcon,
  },
  setup() {
    const datePicker = createInput(DatePicker, { props: ["modelValue"] });
    const taskStore = useTaskStore();
    const selectedTask = ref<null | Task>(null);
    const user = useUserStore().user;
    const dialogVisible = ref(false);
    const page = ref(1);
    const totalPages = computed(() => taskStore.tasks.length);
    const tasks = computed(() =>
      taskStore.tasks.slice(page.value * 8 - 8, page.value * 8),
    );

    const dialogButtonClick = (task: Task) => {
      selectedTask.value = { ...task };
      dialogVisible.value = true;
    };

    const paginationChange = (value: number) => {
      page.value = value;
    };

    onMounted(async () => {
      if (!user) return;
      try {
        const res = await TaskService.getAllTasks({ userId: user.id });
        if (!res.data) return;
        taskStore.setTasks(res.data);
      } catch (err) {
        taskStore.setTasks([]);
      }
    });

    return {
      tasks,
      dialogButtonClick,
      dialogVisible,
      selectedTask,
      datePicker,
      page,
      totalPages,
      paginationChange,
    };
  },
});
</script>
