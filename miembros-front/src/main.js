import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
// Agregamos la URL base de nuestra API
// DESARROLLO: http://localhost:3002/api
// PRODUCCIÓN: https://guillepaivag--mevn-bluuweb.herokuapp.com
axios.defaults.baseURL = 'http://localhost:3002/api'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
