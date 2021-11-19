<template>
	<div @click="$router.push('/admin')">to admin</div>
</template>

<script>
import user from '../../mixins/user';
export default {
	mixins: [user],
};
</script>

<style></style>
