<template>

		<PrepareCourseComponent />

</template>

<script>
import AdminWrapper from '@/components/Admin/Layout/AdminWrapper.vue';
import PrepareCourseComponent from '@/components/Admin/prepareCourse/PrepareCourseComponent';

export default {
	components: {
		PrepareCourseComponent,
		AdminWrapper,
	},
};
</script>

<style>
body,html {
	overflow: hidden !important;
}</style>
