import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import "/src/assets/index.css";
import pinia from "@/stores";

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app');
