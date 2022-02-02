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
						Нещодавні новини

				</div>
				<v-slide-x-transition>
					<div
						class="my-sub"
						v-show="!sceleton"
						:class="{
							md: $vuetify.breakpoint.smAndDown,
						}"
					>
						<div class="font-weight-bold news__title" :class="{'text-caption': $vuetify.breakpoint.smAndDown}">
							{{ activeNew.title || '--' }}
						</div>
						<div :class="{'text-caption': $vuetify.breakpoint.smAndDown}">

						{{ copyActiveNew.content || 'На жаль ця новина поки не заповнена' }}
						</div>

						<!-- {{
							moment(activeNew.created_time)
								.locale('uk')
								.startOf('hours')
								.fromNow() || '--'
						}} -->
						<VBtn
							outlined
							color="purple lighten-3"
							rounded
							v-if="showMoreBtn"
							@click="onClickMoreBtn"
							class="mt-1"
							:small="$vuetify.breakpoint.smAndDown"
						>
							Більше
						</VBtn>
					</div>
				</v-slide-x-transition>
				<div class="my-sub" v-if="sceleton">
					<v-skeleton-loader
						:max-width="$vuetify.breakpoint.smAndDown ? 700 : 500"
						type="article"
					></v-skeleton-loader>
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
						:class="{ 'mx-auto': $vuetify.breakpoint.smAndDown }"
					></v-skeleton-loader>
				</VSheet>
			</VCol>
		</VRow>
		<cool-news-more-dialog
			:visible="visibleMoreDialog"
			@close="visibleMoreDialog = false"
			:moreDialogContent="activeNew"
			v-if="visibleMoreDialog"
		/>
	</div>
</template>

<script>
import SliderCards from './SliderCards.vue';
import newsService from '@/request/news/newsService';
import CoolNewsMoreDialog from './CoolNewsMoreDialog.vue';

export default {
	components: { SliderCards, CoolNewsMoreDialog },
	data: () => ({
		news: [],
		sceleton: false,
		activeNew: {},
		showMoreBtn: false,
		copyActiveNew: {},
		visibleMoreDialog: false,
	}),
	async mounted() {
		try {
			this.sceleton = true;
			this.news = await newsService.getCoolNews();
			this.news = this.news.reverse()
			this.sceleton = false;
			this.activeNew = this.news[0];

		} catch (e) {
			alert(e);
		}
		console.log(this.news);
	},
	watch: {
		showMoreBtn: {
			deep: true,
			handler(e) {
				console.log(e);
			},
		},
		activeNew: {
			deep: true,
			handler(e) {
				if (e.content) {
					if (String(e.content).length >= 375) {
						this.copyActiveNew = { ...this.activeNew };
						let str = this.copyActiveNew.content.slice(0, 375);
						const a = str.split(' ');
						a.splice(a.length - 1, 1);
						str = a.join(' ');

						this.copyActiveNew.content = str + ' ...';
						this.showMoreBtn = true;
						console.log(this.copyActiveNew);
					} else {
						this.showMoreBtn = false;
					}
				}
			},
		},
	},
	methods: {
		onClickMoreBtn() {
			this.visibleMoreDialog = true;
			this.copyActiveNew;
		},
		changeCoolNew(e) {
			this.activeNew = this.news[e];
			this.copyActiveNew = this.news[e];
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

	&.md {
		font-size: 15px !important;
		line-height: 24px;
	}
}
.news__title{
	max-width: 540px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
