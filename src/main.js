import Vue from 'vue'
import App from './App.vue'
import store from './store/store.js'
import 'bootstrap/dist/css/bootstrap.css'

/* import 'reset-css/reset.css'
import '@/assets/scss/main.scss' */


Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
