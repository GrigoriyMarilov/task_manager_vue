import { defineStore } from "pinia";
import { User } from "@/entities/user/model/user.types.ts";
import { deleteCookie, setCookie } from "@/shared";

export const useUserStore = defineStore("userStore", {
  state: (): { user: User | null } => ({
    user: null,
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
      setCookie("email", user.email, 14);
      setCookie("password", user.password, 14);
    },
    deleteUser() {
      this.user = null;
      deleteCookie("email");
      deleteCookie("password");
    },
  },
});
