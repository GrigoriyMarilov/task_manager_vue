import { $api } from "@/shared";
import { CreateTaskDto } from "@/entities/task/dto/createTask.dto.ts";

import { GetAllTaskDto } from "@/entities/task/dto/getAllTask.dto.ts";
import { Task } from "@/entities/task";
import { EditTaskDto } from "@/entities/task/dto/editTask.dto.ts";

export class TaskService {
  static async getAllTasks(params: GetAllTaskDto) {
    return await $api.get<Task[]>("task", { params: params });
  }

  static async createTask(data: CreateTaskDto) {
    return await $api.post("task", data);
  }

  static async deleteTask(id: string, userId: string) {
    return await $api.delete(`user/${userId}/task/${id}`);
  }

  static async getTask(id: string) {
    return await $api.get<Task>(`task/${id}`);
  }

  static async editTask(data: EditTaskDto) {
    const id = data.index;
    return await $api.put(`task/${id}`, data);
  }
}
