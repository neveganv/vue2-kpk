<template>
	<div class="body">
		<AdminWrapper>
			<AdminComponent />
		</AdminWrapper>
	</div>
</template>

<script>
import AdminComponent from '@/components/Admin/main/AdminComponent';
import AdminWrapper from '@/components/Admin/Layout/AdminWrapper.vue';

export default {
	components: {
		AdminComponent,
		AdminWrapper,
	},
};
</script>

<style>
body,html {
	overflow: hidden !important;
}
</style>
