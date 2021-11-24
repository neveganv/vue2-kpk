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
		beforeEnter: (to, from, next) => {
			guard(to, from, next);
		},
	},
	{
		path: '/admin/login',
		name: 'admin-login',
		component: () => import('@/views/Admin/Login.vue'),
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

const guard = function (to, from, next) {
	// check for valid auth token

	if (localStorage.token) {
		next()
		// axios.get('/api/checkAuthToken').then(response => {
		// 	// Token is valid, so continue
		// 	next();
		// }).catch(error => {
		// 	// There was an error so redirect
		// 	next({ name: 'admin-login' })
		// })
	}
	else {
		next({ name: 'admin-login' })
	}
};

export default router;
