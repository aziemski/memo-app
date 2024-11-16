import {createRouter, createWebHistory} from 'vue-router'
import HomePage from '@/views/HomePage.vue';
import EditEvent from '@/views/EditEvent.vue';
import UserSignup from '@/views/UserSignup.vue';

const routes = [
    {
        path: '/', component:
        HomePage,
        name: 'HomePage'
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

