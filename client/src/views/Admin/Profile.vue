<template>

		<ProfileComponent />

</template>

<script>
import ProfileComponent from '@/components/Admin/profile/ProfileComponent.vue';
import AdminWrapper from '@/components/Admin/Layout/AdminWrapper.vue';

export default {
	components: {
		ProfileComponent,
		AdminWrapper,
	},
};
</script>

<style>
body,html {
	overflow: hidden !important;
}</style>
