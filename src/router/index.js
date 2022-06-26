import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

let routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '*',
        component: () =>
            import ('../views/404.vue')
    },
    {
        path: '*/section',
        component: () =>
            import ('../pages/add/section.vue')
    },
    {
        path: '/users',
        name: 'users',
        component: () =>
            import ('../views/users.vue')
    },
    {
        path: '/Settings',
        name: 'settings',
        component: () =>
            import ('../pages/settings/settings.vue')
    },
    {
        path: '/Settings/General',
        name: 'General',
        component: () =>
            import ('../pages/settings/general.vue')
    },
    {
        path: '/Settings/Administrator',
        name: 'Administrator',
        component: () =>
            import ('../views/users.vue')
    },
    {
        path: '/Settings/Backups',
        name: 'Backups',
        component: () =>
            import ('../pages/settings/backups.vue')
    },
    {
        path: '/users/add',
        name: 'users',
        component: () =>
            import ('../pages/add/users.vue'),
    },
    {
        path: '/Fitness/add',
        name: 'Fitness',
        component: () =>
            import ('../pages/add/sections.vue'),
    },
    {
        path: '/Fitness',
        name: 'Fitness',
        component: () =>
            import ('../views/sections.vue'),
    },
    {
        path: '/uploader',
        name: 'uploader',
        component: () =>
            import ('../components/uploader.vue'),
    },
    {
        path: '/foods/add',
        name: 'foods/add',
        component: () =>
            import ('../pages/add/foods.vue'),
    },
    {
        path: '/foods',
        name: 'foods',
        component: () =>
            import ('../views/foods.vue'),
    },
    {
        path: '/foods/setup',
        name: 'foods/setup',
        component: () =>
            import ('../pages/setup/food-setup.vue'),
    },
    {
        path: '/Coaches/add',
        name: 'Coaches',
        section: "",
        component: () =>
            import ('../pages/add/sections.vue'),
    },
    {
        path: '/Culture/add',
        name: 'Culture',
        section: "",
        component: () =>
            import ('../pages/add/sections.vue'),
    },
    {
        path: '/Coaches',
        name: 'Coaches',
        component: () =>
            import ('../views/sections.vue'),
    },
    {
        path: '/Culture',
        name: 'Culture',
        component: () =>
            import ('../views/sections.vue'),
    },
    {
        path: '/Workouts',
        name: 'Workouts',
        component: () =>
            import ('../views/sections.vue'),
    },
    {
        path: '/Workouts/add',
        name: 'workouts',
        section: "",
        component: () =>
            import ('../pages/add/sections.vue'),
    },
    {
        path: '/edit',
        name: 'updates',
        component: () =>
            import ('../pages/edit/update.vue'),
    },
    {
        path: '/helpers',
        name: 'helpers',
        component: () =>
            import ('../html.vue'),
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router