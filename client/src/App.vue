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
	mixins: [user],
	name: 'App',
	data: () => ({
		isAdminWrap: false,
	}),
	components: {
		AdminWrapper,
	},
	watch: {
		$route: {
			handler(e) {
				window.scrollTo(0, 0)
				console.log(e);
				if (e.name !== 'admin-login') {
					if (e.path.includes('/admin')) {
						this.isAdminWrap = true;
					} else {
						this.isAdminWrap = false;
					}
				}else{
					this.isAdminWrap = false;
				}
			},
		},
	},
};
</script>

<style lang="scss">

html,
body {
	font-weight: 400;
}
</style>
