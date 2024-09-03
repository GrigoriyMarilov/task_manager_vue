import { defineStore } from "pinia";
import { Task } from "@/entities/task/model/task.types.ts";
import { ref } from "vue";

export const useTaskStore = defineStore("task", () => {
  const initialTasks = ref<Task[]>([]);
  const tasks = ref<Task[]>([]);
  const filter = ref<string>("nearest");
  const searchQuery = ref<string>("");

  function setTasks(newTasks: Task[]) {
    tasks.value = newTasks;
    initialTasks.value = newTasks;
  }

  function updateTask(task: Task, id: string) {
    const foundInitialTaskId = initialTasks.value.findIndex(
      (t) => t.index === id,
    );

    if (foundInitialTaskId !== -1) {
      initialTasks.value.splice(foundInitialTaskId, 1, task);
    }
    applyFilters();
  }

  function deleteTask(id: string) {
    const foundInitialTaskId = initialTasks.value.findIndex(
      (t) => t.index === id,
    );

    if (foundInitialTaskId !== -1) {
      initialTasks.value.splice(foundInitialTaskId, 1);
    }
    applyFilters();
  }

  function addTask(task: Task) {
    initialTasks.value.push(task);
    applyFilters();
  }

  function applyFilters() {
    let filteredTasks = [...initialTasks.value];

    // Применение радиофильтра
    switch (filter.value) {
      case "old":
        filteredTasks = filteredTasks.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case "new":
        filteredTasks = filteredTasks.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "nearest":
        filteredTasks = filteredTasks.sort(
          (a, b) =>
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
        );
        break;
      case "completed":
        filteredTasks = filteredTasks.filter((task) => task.status);
        break;
    }

    // Применение текстового фильтра
    if (searchQuery.value) {
      const lowerCaseQuery = searchQuery.value.toLowerCase();
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.name.toLowerCase().includes(lowerCaseQuery) ||
          task.description.toLowerCase().includes(lowerCaseQuery),
      );
    }

    tasks.value = filteredTasks;
  }

  function setSearchQuery(value: string) {
    searchQuery.value = value;
    applyFilters();
  }

  function setRadioFilter(value: string) {
    filter.value = value;
    applyFilters();
  }

  return {
    tasks,
    setTasks,
    updateTask,
    deleteTask,
    addTask,
    initialTasks,
    applyFilters,
    searchQuery,
    filter,
    setSearchQuery,
    setRadioFilter,
  };
});
