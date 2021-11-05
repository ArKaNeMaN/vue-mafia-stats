import "./assets/scss/vendor.scss"
import "bootstrap"

import { createApp } from 'vue'
import App from './App.vue'

let app = createApp(App);

import router from './plugins/router'
app.use(router)

import MafiaApi from './plugins/mafia-api'
app.use(MafiaApi.VueInstaller)

import Utils from './plugins/utils'
app.use(Utils.VueInstaller)

import VueAxios from 'vue-axios'
import axios from 'axios'
app.use(VueAxios, axios)

app.mount('#app')
