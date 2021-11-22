<template>
	<div>
		<v-tabs v-model="tabs">
			<v-tab href="#recentNews">Новини</v-tab>
			<v-tab href="#simpleNews">Круті новини (треба норм назви)</v-tab>
		</v-tabs>
		<v-tabs-items v-model="tabs">
			<v-tab-item :value="'recentNews'">
				<VDivider />
				<SimpleNewComponent />
			</v-tab-item>
			<v-tab-item :value="'simpleNews'">
				<v-card flat>
					<VDivider />
					<div class="simple-new">
		<VRow justify="end" class="p-1">

			<VBtn outlined color="primary" @click="visible = true">
				<v-icon left> mdi-newspaper-plus </v-icon>Створити новину
			</VBtn>

		</VRow>
		<VRow>
			<VCol>
				<NewsList />
			</VCol>
		</VRow>
		<AddNewDialog :visible="visible"  @close="visible = false"/>
	</div>
				</v-card>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
import SimpleNewComponent from './simple-news/SimpleNewComponent.vue';
import NewsList from './simple-news/NewsList.vue';
import AddNewDialog from './simple-news/AddNewsDialog.vue';
export default {
	components: {
		SimpleNewComponent,
		NewsList,
		AddNewDialog
	},
	data: () => ({
		tabs: null,
	}),
};
</script>

<style lang="scss" scoped></style>
