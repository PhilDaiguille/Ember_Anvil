import { createApp } from "vue";
import "./assets/style/main.css";
import App from "./App.vue";
import router from "./infrastructure/router";

createApp(App).use(router).mount("#app");
