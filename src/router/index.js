import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue';
import EventList from '@/views/EventList.vue';


const routes = [
    { path: '/', component: HomePage },
    { path: '/events', component: EventList },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;

