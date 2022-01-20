import { createApp } from 'vue'


const remote = require("electron").remote
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
const ipcMain = require('electron').ipcMain
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fab,fas)
import 'bootstrap';
window.axios = require('axios');
import App from './App.vue'

const app = createApp(App)
app.config.globalProperties.elc = remote

app.use(store).component("font-awesome-icon", FontAwesomeIcon).use(router).mount('#app')

