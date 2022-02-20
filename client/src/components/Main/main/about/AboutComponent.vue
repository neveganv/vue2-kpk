<template>
	<div class="about__wrapper">
		<div class="my-container">
			<div class="about__inner" :class="{ sm: $vuetify.breakpoint.smAndDown }">
				<VRow class="about__inner__info" no-gutters>
					<VCol
						cols="12"
						xl="6"
						lg="6"
						md="6"
						sm="12"
						class="title"
						:class="{ sm: $vuetify.breakpoint.smAndDown }"
						>Про Коледж</VCol
					>
					<VCol
						cols="12"
						xl="6"
						lg="6"
						md="6"
						sm="12"
						class="description"
						:class="{ sm: $vuetify.breakpoint.smAndDown }"
					>
						<div>
							<b>Коломийський політехнічний фаховий коледж</b> Національного
							університету «Львівська політехніка» - сучасний вищий навчальний
							заклад, один з найстаріших закладів освіти на Прикарпатті.
						</div>
						<div class="mt-10" :class="{ sm: $vuetify.breakpoint.smAndDown }">
							<VBtn
								@click="isVisible = true"
								rounded
								outlined
								color="white"
								:small="$vuetify.breakpoint.smAndDown"
							>
								Наша історія
							</VBtn>
						</div>
					</VCol>
				</VRow>
			</div>
		</div>
		<VRow class="about__slider" :class="{ sm: $vuetify.breakpoint.smAndDown }">
			<VSlideXReverseTransition>
				<flicking
					v-if="!loading"
					:plugins="plugins"
					:options="{
						moveType: 'freeScroll',
						easing: x => 1 - Math.pow(1 - x, 3),
						interruptable: true,
					}"
					:viewportTag="'div'"
					:cameraTag="'div'"
				>
					<v-img
						class="about__slider__inner"
						:class="{ sm: $vuetify.breakpoint.smAndDown }"
						v-for="(image, index) in images"
						v-bind:key="index"
						:lazy-src="image.img"
						draggable="false"
						:src="image.img"
					>
						<template v-slot:placeholder>
							<v-row class="fill-height ma-0" align="center" justify="center">
								<v-progress-circular
									indeterminate
									color="white"
								></v-progress-circular>
							</v-row>
						</template>
					</v-img>
					<div slot="viewport" class="flicking-pagination"></div>
				</flicking>
			</VSlideXReverseTransition>
			<VRow
				v-if="loading"
				justify="start"
				align="center"
				class="my-image-scelet"
				style="height: 30vh"
			>
				<VCol cols="12" class="text-center">
					<v-progress-circular
						indeterminate
						color="white"
					></v-progress-circular>
				</VCol>
			</VRow>
		</VRow>
		<about-dialog
			:visible="isVisible"
			@close="isVisible = false"
			v-if="isVisible"
		/>
	</div>
</template>

<script>
import aboutDialog from './aboutDialog.vue';
import { Pagination } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/pagination.css';
import collegeInfoServices from '@/request/collegeInfo/collegeInfoServices';

export default {
	components: { aboutDialog },
	mounted() {},
	props: {
		isShowAbout: {
			require: true,
		},
	},
	watch: {
		isShowAbout: {
			deep: true,
			handler(e) {
				if (e && this.images.length === 0 && !this.intersectFirst) {
					this.getAllImages();
				}
			},
		},
	},
	methods: {
		async getAllImages() {
			try {
				this.loading = true;
				this.intersectFirst = true;
				const newItem = await collegeInfoServices.getPhotos();
				this.images = newItem.result.reverse();
				this.loading = false;
			} catch (e) {
				alert(e);
			}
		},
	},
	data: () => ({
		images: [],
		isVisible: false,
		loading: false,
		plugins: [new Pagination({ type: 'bullet' })],
		intersectFirst: false,
	}),
};
</script>

<style lang="scss">
.about {
	&__wrapper {
		overflow: hidden;
		width: 100%;
		background: #ff8066;
		height: auto;
	}
	&__inner {
		padding: 150px 0 0 0;
		&.sm {
			padding: 50px 0 0 0;
		}
		&__info {
			.title {
				font-weight: 500;
				color: #ffff;
				font-size: 64px !important;
				&.sm {
					font-size: 40px !important;
					text-align: center;
					margin-bottom: 5px;
					border-bottom: 1px solid rgba(255, 255, 255, 0.425);
					padding-bottom: 20px;
				}
			}
			.description {
				font-size: 24px !important;
				color: #ffff;
				font-weight: 300;
				&.sm {
					font-size: 15px !important;
					text-align: center;
				}
			}
		}
	}
	&__slider {
		padding-bottom: 50px;
		margin-top: 100px;
		&.sm {
			margin-top: 30px;
		}

		&__inner {
			margin: 0px 40px 40px 0;
			width: 470px;
			height: 350px;
			object-fit: cover;
		}
		.sm {
			width: 200px;
			height: 150px;
		}
	}
}
.flicking-camera {
	display: flex;
}
.flicking-pagination {
	.flicking-pagination-bullet-active {
		background: white;
	}
}
</style>
