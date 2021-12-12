<template>
	<div>
		<VRow
			no-gutters
			justify="space-between"
			align="center"
			v-if="!sceletonLoader && news.length > 0"
		>
			<div v-for="newItem in news" :key="newItem._id" @click="counter(newItem)">
				<my-news-card :newItem="newItem" />
			</div>
		</VRow>
		<VRow v-else-if="sceletonLoader" justify="space-between">
			<div v-for="item in 4" :key="item" >
				<my-news-card :sceletonLoader="sceletonLoader" :newItem="item" />
			</div>
		</VRow>
		<VRow v-else align="center" justify="center">
			<div>Список новин порожній</div>
		</VRow>
	</div>
</template>

<script>
import myNewsCard from '@/components/Main/UI/my-news-card';
import newsService from '@/request/news/newsService';

export default {
	components: {
		myNewsCard,
	},
	props: {
		news: {
			require: true,
		},
		sceletonLoader: {
			require: false,
		},
	},
	mounted() {},
	methods: {
		async counter(e) {
			const params = [];
			params.id = e._id;
			params.views = e.views + 1;
			console.log('paramsCounter', params);
			try {
				await newsService.counterViewsSimpleNews({
					...params,
				});
			} catch (e) {
				alert(e);
			}
		},
	},
};
</script>

<style></style>
