<template>
	<div>
        <div>
			 <v-app-bar-nav-icon @click="$emit('drawer', true)"></v-app-bar-nav-icon>
			<v-app-bar-nav-icon><img :src="require('@/assets/img/HerbAdminHeader.svg')"/></v-app-bar-nav-icon>
		<v-btn icon><img :src="require('@/assets/img/Notifications.svg')"/></v-btn>
        <v-btn icon><img :src="require('@/assets/img/Avatar.svg')"/></v-btn>
        </div>
	</div>
</template>

<script>

export default {
};
</script>

<style>
</style>