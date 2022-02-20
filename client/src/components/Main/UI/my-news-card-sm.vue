<template>
	<VCard
		class="another-card"
		ripple
		@click="onClick"
		:class="{ slider: slider }"
	>
		<div no-gutters class="unselectable">
			<v-img
				class="another-card-img"
				:src="newItem.main_img"
				draggable="false"
				:lazy-src="newItem.main_img"
			>
				<template v-slot:placeholder>
					<v-row class="fill-height ma-0" align="center" justify="center">
						<v-progress-circular
							indeterminate
							color="#EF876D"
						></v-progress-circular>
					</v-row>
				</template>
			</v-img>
		</div>
		<VCardActions>
			<div class="another-card-title unselectable">
				{{ newItem.title }}
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
		newItem: {
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
				name: 'main-news-page',
				params: { id: this.newItem._id },
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.another-card {
	width: 400px;
	margin: 20px 0 40px 0;
	cursor: pointer;
	&-img {
		border-top-left-radius: inherit;
		border-top-right-radius: inherit;
		width: 100%;
		height: 120px;
		object-fit: cover;
	}
	&-title {
		width: 100%;
		max-height: 20px;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 12px;
		text-align: center;
		text-align: left;
		white-space: nowrap;
		font-weight: 500;
	}
	&.slider {
		width: 100%;
	}
}
</style>
