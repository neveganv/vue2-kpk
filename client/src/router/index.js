import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'main-page',
		component: () => import('@/views/Main/Main.vue'),
	},
	{
		path: '/admin',
		name: 'admin-page-auth',
		component: () => import('@/views/Admin/Admin.vue'),
	},
	{
		path: '/admin-news',
		name: 'admin-page-news',
		component: () => import('@/views/Admin/News.vue'),
	},
	{
		path: '/admin-shedule',
		name: 'admin-page-shedule',
		component: () => import('@/views/Admin/Shedule.vue'),
	},
];
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
