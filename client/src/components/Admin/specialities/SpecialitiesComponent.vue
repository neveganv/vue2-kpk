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
import loader from '@/mixins/loader';

export default {
	mixins:[loader],
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
			this.setLoading(true)
			this.specialities = await specialityService.getAllSpecialty();
			this.setLoading(false)
		},
	},
};
</script>

<style></style>
