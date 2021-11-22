<template>
	<div>
		<v-tabs v-model="tabs">
			<v-tab href="#simpleNews">Новини</v-tab>
			<v-tab href="#recentNews">Круті новини (треба норм назви)</v-tab>
		</v-tabs>
		<v-tabs-items v-model="tabs">
			<v-tab-item :value="'simpleNews'">
				<VDivider />
				<SimpleNewComponent />
			</v-tab-item>
			<v-tab-item :value="'recentNews'"> 
				<VDivider />
				<RecentNewsComponent />
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
import SimpleNewComponent from './simple-news/SimpleNewComponent.vue';
import RecentNewsComponent from './recent-news/RecentNewsComponent.vue';
import NewsList from './simple-news/NewsList.vue';
import AddNewDialog from './simple-news/AddNewsDialog.vue';
export default {
	components: {
		SimpleNewComponent,
		RecentNewsComponent,
		NewsList,
		AddNewDialog,
	},
	data: () => ({
		tabs: null,
	}),
};
</script>

<style lang="scss" scoped></style>
