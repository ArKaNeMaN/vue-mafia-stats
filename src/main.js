import "./assets/scss/vendor.scss"
import "bootstrap"

import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import mafiaApi from './plugins/mafia-api'

createApp(App)
    .use(router)
    .use(mafiaApi.VueInstaller)
    .use(VueAxios, axios)
    .mount('#app')
