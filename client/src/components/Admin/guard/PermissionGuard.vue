<template>
	<RouterView />
</template>

<script>
// eslint-disable-next-line import/no-cycle
import store from '@/store';
import * as getterTypes from '@/store/modules/auth/types/getters';
import user from '@/mixins/user';

export default {
	name: 'PermissionGuard',
	mixins: [user],
	beforeRouteEnter(to, from, next) {
		if (store.state.auth) {
			if (store.state.auth.user.position == 'admin') {
				next({ name: 'admin-page-main' });
			} else if (store.state.auth.user.position == 'redaktor_novyn') {
				next({ name: 'admin-page-news' });
			} else if (store.state.auth.user.position == 'redaktor_rozkladu') {
				next({ name: 'admin-page-shedule' });
			} 
			else if (store.state.auth.user.position == 'redaktor_spetsialnostei') {
				next({ name: 'admin-page-specialities' });
			} 
			else if (store.state.auth.user.position == 'redaktor_pidhotovchykh_kursiv') {
				next({ name: 'admin-page-prepareCourse' });
			} 
			else {
				next({ name: 'admin-page-profile' });
			}
		} else {
			next({ name: 'admin-login' });
		}
	},
	mounted() {
		console.log(this.permissions || false);
	},
};
</script>

<style scoped></style>
