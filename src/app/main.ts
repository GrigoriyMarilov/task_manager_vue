import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import { createPinia } from "pinia";
import "@formkit/themes/genesis";
import App from "./App.vue";
import { router } from "./router/router.ts";
import { plugin, defaultConfig } from "@formkit/vue";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "../style.css";

const pinia = createPinia();
const app = createApp(App);

//Иконки
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router);
app.use(ToastPlugin);
app.use(pinia);
app.use(ElementPlus);
app.use(plugin, defaultConfig());
app.mount("#app");
