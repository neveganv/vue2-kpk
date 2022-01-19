<template>
	<VApp>
		<AdminWrapper v-if="isAdminWrap">
			<RouterView />
		</AdminWrapper>
		<RouterView v-else />
	</VApp>
</template>

<script>
import AdminWrapper from '@/components/Admin/Layout/AdminWrapper.vue';
import user from '@/mixins/user';

export default {
	mixins:[user],
	name: 'App',
	data:()=> ({
		isAdminWrap: false,
	}),
	components: {
		AdminWrapper,
	},
	watch: {
		'$route.path': {
			handler(e) {
					console.log(e)
				if (e.includes('/admin') && localStorage.token && this.getUser) {
					this.isAdminWrap = true;
				} else {
					this.isAdminWrap = false;
				}
			},
		},
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
html,
body {
	font-weight: 400;
}
</style>
