<template>
	<AdminWrapper>
		 <PageComponent />
	</AdminWrapper>
</template>

<script>
import AdminWrapper from '@/components/Admin/Layout/AdminWrapper.vue';
import PageComponent from '@/components/Admin/Dynamic/PageComponent';

export default {
	components: {
		PageComponent,
		AdminWrapper,
	},
};
</script>

<style></style>
