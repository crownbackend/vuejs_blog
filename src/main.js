import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Article from './components/Article';
import Login from './components/Login';
import Register from './components/Register';
import Error from './components/Error';

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/articles', component: Article, name: 'articles' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/', component: Article, name: 'home' },
  { path: '/*', component: Error, name: 'error' }
]

const router = new VueRouter({
  routes: routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
