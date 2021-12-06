<template>
	<div>
		<VRow>
			<VCol cols="8">
				<div class="my-title">
					<VBadge top overlap color="error" content="beta">
						Нещодавні новини
					</VBadge>
				</div>
				<div class="my-sub">
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry's standard dummy text ever
					since the 1500s, when an unknown printer took a galley of type and
					scrambled it to make a type specimen book. It has survived not only
					five centuries, but also the leap into electronic typesetting,
					remaining essentially unchanged. It was popularised in the 1960s with
					the release of Letraset sheets containing Lorem Ipsum passages, and
					more recently with desktop publishing software like Aldus PageMaker
					including versions of Lorem Ipsum.
				</div>
			</VCol>
			<VCol cols="4">
				<slider-cards :news="news" v-if="!sceleton" @changeCoolNew="changeCoolNew" />
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
	}),
	async mounted() {
		try {
			this.sceleton = true;
			this.news = await newsService.getCoolNews();
			this.sceleton = false;
			console.log(this.news);
		} catch (e) {
			alert(e);
		}
		console.log(this.news);
	},
	methods:{
		changeCoolNew(e){
			console.log(e)
		}
	}
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
