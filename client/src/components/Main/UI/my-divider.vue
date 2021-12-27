<template>
	<div>
		<hr
			class="my-divider"
			:class="{ 'h-1': height === 1, 'h-2': height === 2 }"
		/>
	</div>
</template>

<script>
export default {
	name: 'MyDivider',
	props: {
		height: {
			require: false,
			default: 1,
		},
	},
};
</script>

<style lang="scss" scoped>
.my-divider {
	display: block;
	flex: 1 1 0px;
	max-width: 100%;
	height: 0;
	max-height: 0;
	border: thin solid #a1a1a1;
	transition: inherit;
	border-radius: 7px 7px 7px 7px;
	&.h-1 {
		border: 1px solid #a1a1a1;
	}
	&.h-2 {
		border: 2px solid #a1a1a1;
	}
}
</style>
