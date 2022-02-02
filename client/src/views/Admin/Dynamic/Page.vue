<template>

		 <PageComponent />

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

<style>
body,html {
	overflow: hidden !important;
}</style>
