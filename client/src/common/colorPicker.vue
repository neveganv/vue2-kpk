<template>
	<VCard>
		<VCardText>
			<v-color-picker
				class="ma-2"
				show-swatches
				hide-canvas
				hide-sliders
				hide-inputs
				:swatches="swatches"
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
	data: () => ({
		swatches: [
			['#AA0000', '#550000'],
			['#AAAA00', '#555500'],
			['#00AA00', '#005500'],
			['#00AAAA', '#005555'],
			['#0000AA', '#000055'],
			['#2F3DA9'],
			['#2383F3'],
			['#F98300'],
			['#47A23A'],
			['#626262'],
			['#25B0CB'],
			['#60B6C9'],
			['#5EC58F'],
			['#693210'],
			['#C9364D'],
			['#C46C6C'],
			['#C44949'],
			['#C48C51'],
			['#C47151'],
			['#C45C82'],
		],
	}),
	methods: {
		setColor(val) {
			this.$emit('input', val.hex);
		},
	},
};
</script>

<style lang="scss"></style>
