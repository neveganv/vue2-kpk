<template>
	<AdminWrapper>
		<AdminComponent />
	</AdminWrapper>
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

<style></style>
