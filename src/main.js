import "./assets/scss/vendor.scss"
import "bootstrap"

import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import MafiaApi from './plugins/mafia-api'
import Utils from './plugins/utils'

createApp(App)
    .use(router)
    .use(MafiaApi.VueInstaller)
    .use(Utils.VueInstaller)
    .use(VueAxios, axios)
    .mount('#app')
