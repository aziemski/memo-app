import {createRouter, createWebHistory} from 'vue-router'
import HomePage from '@/views/HomePage.vue';
import AddEvent from '@/views/AddEvent.vue';
import EditEvent from '@/views/EditEvent.vue';

const routes = [
    {path: '/', component: HomePage, name: 'HomePage'},
    {path: '/events/add', component: AddEvent, name: 'AddEvent'},
    {path: '/events/edit/:id', component: EditEvent, name: 'EditEvent'},
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;

