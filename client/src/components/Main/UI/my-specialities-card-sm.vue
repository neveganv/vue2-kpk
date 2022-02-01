<template>
	<VCard class="another-card" :class="{'slider' : slider}"  @click="onClick">
		<div no-gutters>
			<img
			draggable="false"
				class="another-card-img unselectable"
				:src="specialitie.img"
				alt=""
			/>
		</div>
		<VCardActions>
			<div class="another-card-title unselectable">
				{{ specialitie.name }}
			</div>
			<VSpacer />
			<VBtn text small color="primary">
				<VIcon small>mdi-arrow-right</VIcon>
			</VBtn>
		</VCardActions>
	</VCard>
</template>

<script>
export default {
	props: {
		slider: {
			require: false,
			default: false,
		},
		specialitie: {
			type: Object,
			require: true,
		},
		indexSpecialitie: {
			require: true,
		},
	},
	methods: {
		onClick() {
			this.$router.push({
				name: 'main-speciality-page',
				params: { id: this.specialitie._id },
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.another-card {
	width: 400px;
	margin: 20px 0 40px 0;
	height: 190px;
	cursor: pointer;
	&-img {
		border-top-left-radius: inherit;
		border-top-right-radius: inherit;
		width: 100%;
		height: 130px;
		object-fit: cover;
	}
	&-title {
		font-size: 12px;
		text-align: center;
		font-weight: 500;
	}
	&.slider{
		width: 100%;
	}
}
</style>
