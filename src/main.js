import { createApp } from "vue";
import "./assets/style/main.css";
import App from "./App.vue";
import router from "./infrastructure/router";
import { registerServiceWorker } from "@/shared/utils/serviceWorkerRegistration";

const app = createApp(App);
app.use(router);
app.mount("#app");

if (import.meta.env.PROD) {
  registerServiceWorker();
}
