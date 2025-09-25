import "./css/reset.css";
import "./css/ui-utils.css";
import "./css/components.css";
import App from "./App.vue";
import naive from "naive-ui";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router/router";
import { VueQueryPlugin } from "@tanstack/vue-query";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(VueQueryPlugin);
app.use(naive);
app.use(router);
app.mount("#app");
