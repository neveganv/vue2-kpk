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

export default {
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
				if (e.includes('/admin')) {
					this.isAdminWrap = true;
				} else {
					this.isAdminWrap = false;
				}
				console.log(e);
				console.log(e.includes('admin'));
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
