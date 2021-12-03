<template>
	<div class="h-auto">
		<div class="d-flex justify-space-between p-1 align-center">
			<VBtn text color="primary">
				<VIcon left> mdi-school-outline</VIcon>
				Список Спеціальностей
			</VBtn>
			<VBtn color="primary" outlined @click="visible = true">
				<VIcon left>mdi-folder-account</VIcon>Додати нову спеціальність</VBtn
			>
		</div>
		<VDivider />

		<SpecialitiesList
			:specialitites="specialities"
			:SceletonLoader="SceletonLoader"
		/>

		<AddSpecialitiesDialog
			:visible="visible"
			@close="visible = false"
			@addSpeciality="addSpeciality"
		/>
	</div>
</template>

<script>
import AddSpecialitiesDialog from './AddSpecialitiesDialog.vue';
import SpecialitiesList from './SpecialitiesList.vue';
import specialityService from '@/request/specialty/specialtyService';

export default {
	components: { AddSpecialitiesDialog, SpecialitiesList },
	data: () => ({
		visible: false,
		specialities: [],
		SceletonLoader: false,
	}),
	mounted() {
		this.getSpecialities();
	},
	methods: {
		addSpeciality(e) {
			this.visible = false;
			this.specialities.push(e);
			this.getSpecialities();
		},
		async getSpecialities() {
			this.SceletonLoader = true;
			this.specialities = await specialityService.getAllSpecialty();
			this.SceletonLoader = false;
			console.log(this.specialities);
		},
	},
};
</script>

<style></style>
