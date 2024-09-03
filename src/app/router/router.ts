import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/entities/user/model/user.store.ts";
import { getCookie } from "@/shared";
import { UserService } from "@/entities/user";

const signInPage = () => import("@/pages/signIn");
const signUpPage = () => import("@/pages/signUp");
const homePage = () => import("@/pages/home");

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/signin",
      component: signInPage,
    },
    {
      path: "/signup",
      component: signUpPage,
    },
    {
      path: "/",
      component: homePage,
      meta: { guard: true },
    },
  ],
});

router.beforeEach(async (to, _, next) => {
  const userStore = useUserStore();

  // Если маршрут не требует аутентификации, просто пропускаем
  if (!to.meta.guard) {
    return next();
  }

  const email = getCookie("email");
  const password = getCookie("password");

  // Если куки не найдены, перенаправляем на страницу входа
  if (!email || !password) {
    return next({ path: "/signin" });
  }

  // Пытаемся выполнить аутентификацию
  try {
    const res = await UserService.signin({ email, password });
    if (res && res.data) {
      const [user] = res.data;
      userStore.setUser(user);
    } else {
      return next({ path: "/signin" });
    }
  } catch (error) {
    return next({ path: "/signin" });
  }

  // Если пользователь аутентифицирован, пропускаем его
  if (userStore.user) {
    return next();
  } else {
    return next({ path: "/signin" });
  }
});
