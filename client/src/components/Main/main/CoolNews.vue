<template>
	<div>
		<VRow no-gutters>
			<VCol cols="12" xl="7" sm="12" md="7">
				<div
					class="my-title"
					:class="{
						md: $vuetify.breakpoint.md,
						sm: $vuetify.breakpoint.sm,
						xs: $vuetify.breakpoint.xs,
					}"
				>
					<VBadge top overlap color="error" content="beta">
						Нещодавні новини
					</VBadge>
				</div>
				<v-slide-x-transition>
					<div
						class="my-sub"
						v-show="!sceleton"
						:class="{
							md: $vuetify.breakpoint.smAndDown,
						}"
					>
						{{ activeNew.title }}

						{{
							moment(activeNew.created_time)
								.locale('uk')
								.startOf('hours')
								.fromNow() || '--'
						}}
					</div>
				</v-slide-x-transition>
				<div class="my-sub" v-if="sceleton">
					<v-skeleton-loader max-width="500" type="article"></v-skeleton-loader>
				</div>
			</VCol>
			<VCol cols="12" xl="5" sm="12" md="5">
				<v-slide-x-reverse-transition>
					<slider-cards
						:news="news"
						v-show="!sceleton"
						@changeSlider="changeCoolNew"
					/>
				</v-slide-x-reverse-transition>
				<VSheet v-if="sceleton">
					<v-skeleton-loader
						class="ml-auto mt-10"
						max-width="300"
						type="card"
					></v-skeleton-loader>
				</VSheet>
			</VCol>
		</VRow>
	</div>
</template>

<script>
import SliderCards from './SliderCards.vue';
import newsService from '@/request/news/newsService';

export default {
	components: { SliderCards },
	data: () => ({
		news: [],
		sceleton: false,
		activeNew: {},
	}),
	async mounted() {
		try {
			this.sceleton = true;
			this.news = await newsService.getCoolNews();
			this.sceleton = false;
			this.activeNew = this.news[0];
			console.log(this.news);
		} catch (e) {
			alert(e);
		}
		console.log(this.news);
	},
	methods: {
		changeCoolNew(e) {
			this.activeNew = this.news[e];
		},
	},
};
</script>

<style lang="scss">
.my-title {
	transition: 0.4s ease;
	font-style: normal;
	font-weight: 600;
	font-size: 64px !important;

	color: #4b4453;
	margin-bottom: 30px;
	&.md {
		font-size: 44px !important;
		line-height: 78px;
	}
	&.sm {
		font-size: 34px !important;
		line-height: 30px;
	}
	&.xs {
		font-size: 25px !important;
		line-height: 10px;
		margin-bottom: 5px;
	}
}
.my-sub {
	font-family: 'Montserrat', sans-serif !important;
	font-style: normal;
	font-weight: 300;
	font-size: 20px !important;
	line-height: 24px;
	&.md {
		font-size: 15px !important;
		line-height: 24px;
	}
}
</style>
