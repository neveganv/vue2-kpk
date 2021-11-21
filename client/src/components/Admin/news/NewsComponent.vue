<template>
	<div>
		<v-tabs v-model="tabs">
			<v-tab href="#recentNews">Новини</v-tab>
			<v-tab href="#simpleNews">Нещодавні новини</v-tab>
		</v-tabs>
		<v-tabs-items v-model="tabs">
			<v-tab-item :value="'recentNews'" class="p-3">
				<SimpleNewComponent />
			</v-tab-item>
			<v-tab-item :value="'simpleNews'">
				<v-card flat>
					<v-card-text> Нещодавна новина </v-card-text>
				</v-card>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
import SimpleNewComponent from './simple-news/SimpleNewComponent.vue';
export default {
	components: {
		SimpleNewComponent,
	},
	data: () => ({
		tabs: null,
	}),
};
</script>

<style lang="scss" scoped></style>
