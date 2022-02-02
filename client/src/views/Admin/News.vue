<template>

		 <NewsComponent />

</template>

<script>
import AdminWrapper from '@/components/Admin/Layout/AdminWrapper.vue';
import NewsComponent from '@/components/Admin/news/NewsComponent';

export default {
	components: {
		NewsComponent,
		AdminWrapper,
	},
};
</script>

<style>
body,html {
	overflow: hidden !important;
}</style>
