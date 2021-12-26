<template>
	<RouterView />
</template>

<script>
// eslint-disable-next-line import/no-cycle
import store from '@/store';

export default {
	name: 'AuthGuard',
	beforeRouteEnter(to, from, next) {
		if (store.state.auth.user) {
			next({ name: 'admin-permission-guard' });
		} else {
			next();
		}
	},
};
</script>

<style scoped></style>
