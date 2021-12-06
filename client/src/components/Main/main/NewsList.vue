<template>
	<div>
		<VRow justify="space-between" align="center" v-if="!sceletonLoader">
			<div v-for="newItem in news" :key="newItem._id">
				<my-news-card :newItem="newItem" />
			</div>
		</VRow>
		<VRow v-else justify="space-between" >
            <VCol v-for="(n,key) in 8" :key="key" md="5">
                <VCard max-width="500">
                    <VCardText>
			<v-skeleton-loader
				class="mx-auto"
				max-width="500"
				type="card"
			></v-skeleton-loader>
                    </VCardText>
                </VCard>
            </VCol>
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
	data: () => ({
		news: [],
		sceletonLoader: false,
	}),
	async mounted() {
		try {
			this.sceletonLoader = true;
			this.news = await newsService.getAllNews();
			console.log(this.news);
			this.sceletonLoader = false;
		} catch (e) {
			alert(e);
		}
	},
};
</script>

<style></style>
