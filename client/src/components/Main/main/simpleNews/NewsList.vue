<template>
	<div>
		<VRow
			no-gutters
			justify="center"
			justify-lg="space-between"
			justify-md="space-around"
			justify-sm="space-around"
			align="center"
			v-if="!sceletonLoader && news.length > 0"
		
		>
			<VCol cols="12" xl="6" lg="6" md="6" sm="12" v-for="newItem in news" :key="newItem._id" @click="counter(newItem)">
				<my-news-card :newItem="newItem" />
			</VCol>
		</VRow>
		<VRow v-else-if="sceletonLoader" 
		no-gutters
			justify="center"
			justify-lg="space-between"
			justify-md="space-around"
			justify-sm="space-around"
			align="center">
			<VCol cols="12" xl="6" lg="6" md="6" sm="12" v-for="item in $vuetify.breakpoint.smAndDown ? 2 : 4" :key="item" >
				<my-news-card :sceletonLoader="sceletonLoader" :newItem="item" />
			</VCol>
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
