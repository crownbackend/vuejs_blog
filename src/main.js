import Vue from 'vue'
import App from './App.vue'
import router from './Route'

Vue.config.productionTip = false;

Vue.prototype.$token = localStorage;
Vue.prototype.$hostName = "https://127.0.0.1:8000/api";

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
