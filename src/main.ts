import { createApp } from 'vue'
import App from './App.vue'

import './style.css'
import router from "./router";
import { createPinia } from "pinia";
import './demos/ipc'
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
