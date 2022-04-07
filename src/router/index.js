import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue')
    },
    {
        path: '/home',
        redirect: { path: '/' }
    },
    {
        path: '/Schedules',
        name: 'Schedules',
        component: () => import('../views/Schedules.vue')
    },
    {
        path: '/Variances',
        name: 'Variances',
        component: () => import('../views/Variances.vue')
    },
    {
        path: '/Homerooms',
        name: 'Homerooms',
        component: () => import('../views/Homerooms.vue')
    },
    {
        path: '/Users',
        name: 'Users',
        component: () => import('../views/Users.vue')
    }
]

export default new Router({
    mode: 'history',
    routes
})
