import VueRouter from 'vue-router'
import Vue from "vue";
import Article from './components/Article';
import Login from './components/Login';
import Register from './components/Register';
import Error from './components/Error';
import AdminArticle from './components/admin/Article'
import AdminNewArticle from './components/admin/New'
import AdminEditArticle from './components/admin/Edit'
import AdminShowArticle from './components/admin/Show'

const routes = [
    { path: '/articles', component: Article, name: 'articles' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/', component: Article, name: 'home' },
    { path: '/admin', component: AdminArticle, name: 'adminArticle' },
    { path: '/admin/article/new', component: AdminNewArticle, name: 'adminNewArticle' },
    { path: '/admin/article/:id/edit', component: AdminEditArticle, name: 'adminEditArticle' },
    { path: '/admin/article/:id/show', component: AdminShowArticle, name: 'adminShowArticle' },
    { path: '/*', component: Error, name: 'error' }
];

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: routes
});

export default router