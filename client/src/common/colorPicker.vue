<template>
	<VCard>
		<VCardText>
			<v-color-picker
				class="ma-2"
				show-swatches
				hide-canvas
				hide-sliders
				hide-inputs
				swatches-max-height="300px"
                @update:color="setColor"
			></v-color-picker>
		</VCardText>
	</VCard>
</template>

<script>
export default {
	name: 'ColorPicker',
	props: {
		value: String,
	},
	methods: {
		setColor(val) {
            console.log(val);

			this.$emit('input', val.hex);
		},
	},
};
</script>

<style lang="scss"></style>
