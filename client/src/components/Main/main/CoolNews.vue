<template>
	<div>
		<VRow no-gutters>
			<VCol cols="7">
				<div class="my-title">
					<VBadge top overlap color="error" content="beta">
						Нещодавні новини
					</VBadge>
				</div>
				<div class="my-sub">
					{{ activeNew.title }}

					{{
						moment(activeNew.created_time)
							.locale('uk')
							.startOf('hours')
							.fromNow() || '--'
					}}
				</div>
			</VCol>
			<VCol cols="5">
				<slider-cards
					:news="news"
					v-if="!sceleton"
					@changeSlider="changeCoolNew"
				/>
				<VCard v-else max-width="400">
					<VCardText>
						<v-skeleton-loader
							class="mx-auto"
							max-width="400"
							type="card"
						></v-skeleton-loader>
					</VCardText>
				</VCard>
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
	font-style: normal;
	font-weight: 600;
	font-size: 64px !important;
	line-height: 78px;
	color: #4b4453;
	margin-bottom: 30px;
}
.my-sub {
	font-family: 'Montserrat', sans-serif !important;
	font-style: normal;
	font-weight: 300;
	font-size: 20px !important;
	line-height: 24px;
}
</style>
