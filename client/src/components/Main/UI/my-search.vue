<template>
	<VCol>
		<h3>Новини</h3>
		<VCol v-for="news in news" :key="news._id">
			<VCard>
				<VCardTitle>{{ news.title }}</VCardTitle>
				<VCardText></VCardText>
			</VCard>
		</VCol>
		<VCol v-for="news in news1" :key="news._id">
			<VCard>
				<VCardTitle>{{ news.title }}</VCardTitle>
				<VCardText></VCardText>
			</VCard>
		</VCol>
		<h3>Спеціальності</h3>
		<VCol v-for="spec in specialty" :key="spec._id">
			<VCard>
				<VCardTitle>{{ spec.name }}</VCardTitle>
				<VCardText>{{ spec.content }}</VCardText>
			</VCard>
		</VCol>
		<h3>Сторінки</h3>
		<VCol v-for="page in page" :key="page._id">
			<VCard>
				<VCardTitle>{{ page.name }}</VCardTitle>
				<VCardText></VCardText>
			</VCard>
		</VCol>
	</VCol>
</template>

<script>
import newsService from '@/request/news/newsService.js';
import pageService from '@/request/page/pageService.js';
import specialtyService from '@/request/specialty/specialtyService.js';
export default {
	data: () => ({
		filter: {
			news: [],
			news1: [],
			page: [],
			specialty: [],
		},
	}),
	props: {
		search: {
			require: true,
		},
	},
	mounted() {
		this.searchAll();
	},
	methods: {
		async searchAll() {
			const params = [];
			params.title = this.Search;
			let response = await newsService.searchCoolNews({ ...params });
			this.news = response;
			console.log(response);
			response = await newsService.searchSimpleNews({ ...params });
			this.news1 = response;
			console.log(response);
			response = await pageService.searchPage({ ...params });
			this.page = response;
			console.log(response);
			response = await specialtyService.searchSpecialty({ ...params });
			this.specialty = response;
			console.log(response);
		},
	},
	watch: {
		search: {
			deep: true,
			handler(e) {
                console.log(e)
			},
		},
	},
	computed: {
		Search: {
			get() {
				return this.search;
			},
		},
	},
};
</script>

<style></style>
