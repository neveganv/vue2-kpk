<template>
	<div class="h-auto">
		<div class="d-flex justify-space-between p-1 align-center">
			<VBtn text color="primary">Список Спеціальностей</VBtn>
			<VBtn color="primary" outlined @click="visible = true">
				<VIcon left>mdi-folder-account</VIcon>Додати нову спеціальність</VBtn
			>
		</div>
		<VDivider />
		<AddSpecialitiesDialog :visible="visible" @close ="visible = false"/>
	</div>
</template>

<script>
import AddSpecialitiesDialog from './AddSpecialitiesDialog.vue';
export default {
	components: { AddSpecialitiesDialog },
    data:()=>({
visible:false
    }),
};
</script>

<style></style>
