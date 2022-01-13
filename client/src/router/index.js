import Vue from 'vue';
import VueRouter from 'vue-router';

// GUARD
import store from '@/store';
import * as actionTypes from '@/store/modules/auth/types/actions';
import AuthGuard from '@/components/Admin/guard/AuthGuard.vue';
import LoginGuard from '@/components/Admin/guard/LoginGuard.vue';
import PermissionGuard from '@/components/Admin/guard/PermissionGuard.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'main-page',
		component: () => import('@/views/Main/Main.vue'),
	},
	{
		path: '/speciality/:id',
		name: 'main-speciality-page',
		component: () => import('@/views/Main/Speciality.vue'),
	},
	{
		path: '/news-:id',
		name: 'main-news-page',
		component: () => import('@/views/Main/News.vue'),
	},
	{
		path: '/student',
		name: 'main-student',
		component: () => import('../views/Main/Student.vue'),

		children:[
			{
				path: 'shedule',
				name: 'main-student-shedule',
				component: () => import('../views/Main/Student/Shedule.vue'),
			  },
		]
	},
	{
		path: '/page/:id',
		name: 'main-dynamic-page',
		component: () => import('@/views/Main/DynamicPage.vue'),
	},
	{
		path: '/search/:query',
		name: 'search',
		component: () => import('@/views/Main/Search.vue'),	
	},
	{
		path: '',
		component: AuthGuard,
		children: [
			{
				path: '/admin',
				name: 'admin-login',
				component: () => import('@/views/Admin/Login.vue'),
				meta: { requiresAuth: false },
			},
		],
	},
	{
		path: '',
		component: LoginGuard,
		children: [
			{
				path: '/admin',
				name: 'admin-page-main',
				component: () => import('@/views/Admin/Admin.vue'),
			},
			{
				path: '/admin-permission',
				name: 'admin-permission-guard',
				component:PermissionGuard
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
			{
				path: '/admin-profile',
				name: 'admin-page-profile',
				component: () => import('@/views/Admin/Profile.vue'),
			},
			{
				path: '/admin-specialities',
				name: 'admin-page-specialities',
				component: () => import('@/views/Admin/Specialities.vue'),
			},
			{
				path: '/admin-dynamic-page/:id',
				name: 'admin-dynamic-page',
				component: () => import('@/views/Admin/Dynamic/Page.vue'),
			},
		],
	},

];
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	
});

export default router;
