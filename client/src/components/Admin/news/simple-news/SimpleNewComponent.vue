<template>
	<div class="simple-new">
		<VRow justify="end">
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
</template>

<script>
import NewsList from './NewsList.vue';
import AddNewDialog from './AddNewDialog.vue';
export default {
	components: { NewsList, AddNewDialog },
	data: () => ({
		visible: false,
	}),
};
</script>

<style lang="scss" scoped>
.simple-new {
	padding: 1rem;
	height: auto;
}
</style>
