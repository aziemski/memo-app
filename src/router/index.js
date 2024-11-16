import {createRouter, createWebHistory} from 'vue-router'
import HomePage from '@/views/HomePage.vue';
import CategoryEdit from '@/views/CategoryEdit.vue';
import CategoryList from '@/views/CategoryList.vue';
import EditEvent from '@/views/EditEvent.vue';
import UserLogin from '@/views/UserLogin.vue';
import UserSignup from '@/views/UserSignup.vue';

const routes = [
    {
        path: '/', component:
        HomePage,
        name: 'HomePage'
    },
    {
        path: '/categories',
        component: CategoryList,
        name: 'CategoryList'
    },
    {
        path: '/categories/edit/:id',
        component: CategoryEdit,
        name: 'CategoryEdit'
    },
    {
        path: '/events/add',
        component: EditEvent,
        props: {mode: 'add'},
        name: 'AddEvent'
    },
    {
        path: '/events/edit/:id',
        component: EditEvent,
        props: {mode: 'edit'},
        name: 'EditEvent'
    },
    {
        path: '/login',
        component: UserLogin,
        name: 'UserLogin',
    },
    {
        path: '/signup',
        component: UserSignup,
        name: 'UserSignup'
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;

