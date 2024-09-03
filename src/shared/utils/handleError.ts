import { ApiError } from "@/shared";
import { ToastPluginApi } from "vue-toast-notification";
import { FormKitNode } from "@formkit/core";
import { AxiosError } from "axios";

export const formErrorHandler = (
  error: unknown,
  toast?: ToastPluginApi,
  form?: FormKitNode,
) => {
  if (error instanceof AxiosError) {
    toast && toast?.error(error.message);
    if (error.config?.url === "user") {
      form && form.setErrors("Пользователь не найден");
    }
  }
  if (error instanceof ApiError) {
    toast && toast.error(error.message);
    form && form.setErrors("", { ...error.errors });
  }
  return;
};
