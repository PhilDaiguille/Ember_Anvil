import { createApp } from "vue";
import "./assets/style/main.css";
import App from "./App.vue";
import router from "./infrastructure/router";
import pinia from "@/stores";
import { migrateLocalStorage } from "@/stores/migrations";
import { registerServiceWorker } from "@/shared/utils/serviceWorkerRegistration";

// Migration localStorage avant tout
migrateLocalStorage();

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");

if (import.meta.env.PROD) {
  registerServiceWorker();
}
