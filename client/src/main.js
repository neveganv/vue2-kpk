import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

// router
Vue.use(VueRouter)

// axios
Vue.use(VueAxios, axios)

new Vue({
  render: h => h(App),
}).$mount('#app')
