import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './Route'

Vue.config.productionTip = false;
Vue.prototype.$token = localStorage;
Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
