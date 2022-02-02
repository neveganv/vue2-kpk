<template>
	<div class="h-auto">
		<div class="d-flex justify-space-between p-1 align-center">
			<VBtn rounded text color="primary">
				<VIcon left> mdi-school-outline</VIcon>
				Список Спеціальностей
			</VBtn>
			<VBtn  rounded color="primary" outlined @click="visible = true">
				<VIcon left>mdi-folder-account</VIcon>Додати нову спеціальність</VBtn
			>
		</div>
		<VDivider />

		<SpecialitiesList
			:specialitites="specialities"
			:SceletonLoader="SceletonLoader"
			@edit="editSpeciality"
		/>

		<AddSpecialitiesDialog
		    :edit="edit"
			:visible="visible"
			@close="close"
			@addSpeciality="addSpeciality"
			@editSpeciality="editSpeciality"
		/>
	</div>
</template>

<script>
import AddSpecialitiesDialog from './AddSpecialitiesDialog.vue';
import SpecialitiesList from './SpecialitiesList.vue';
import specialityService from '@/request/specialty/specialtyService';
import loader from '@/mixins/loader';

export default {
	mixins:[loader],
	components: { AddSpecialitiesDialog, SpecialitiesList },
	data: () => ({
		edit: [],
		visible: false,
		specialities: [],
		SceletonLoader: false,
	}),
	mounted() {
		this.getSpecialities();
	},
	methods: {
		close(){
			this.edit = [],
			this.edit.push({
				id: '',
				edit: false
			});
			this.visible = false
			this.getSpecialities();
		},
		editSpeciality(id){
			this.edit = [],
			this.edit.push({
				id: id,
				edit: true
			})
			this.visible = true;
		},
		addSpeciality(e) {
			this.visible = false;
			this.specialities.push(e);
			this.getSpecialities();
		},
		async getSpecialities() {
			this.setLoading(true)
			this.specialities = await specialityService.getAllSpecialty();
			this.setLoading(false)
		},
	},
};
</script>

<style></style>
