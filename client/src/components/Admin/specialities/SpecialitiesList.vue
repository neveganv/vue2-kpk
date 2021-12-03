<template>
	<div>
		<div v-for="item in specialitites" :key="item._id">
			{{ item.name }}
		</div>
	</div>
</template>

<script>
export default {
	props: {
		specialitites: {
			require: true,
		},
	},
};
</script>

<style></style>
