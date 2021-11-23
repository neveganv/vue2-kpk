<template>
	<AdminWrapper>
		<SheduleComponent />
	</AdminWrapper>
</template>

<script>
import AdminWrapper from '@/components/Admin/Layout/AdminWrapper.vue';
import SheduleComponent from '@/components/Admin/shedule/SheduleComponent';

export default {
	components: {
		SheduleComponent,
		AdminWrapper,
	},
};
</script>

<style></style>
