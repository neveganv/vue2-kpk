<template>
	<div class="h-auto">
		<div class="d-flex justify-space-between p-1 align-center">
			<VBtn rounded text color="primary">
				<VIcon left> mdi-school-outline</VIcon>
				Список Спеціальностей
			</VBtn>
			<VBtn rounded color="primary" outlined @click="visible = true">
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
			:edit="isEdit"
			:visible="visible"
			@close="close"
			@addSpeciality="addSpeciality"
			@editSpeciality="editSpeciality"
			:specialityId="specialityId"
			v-if="visible"
			@specialitiesModified="specialitiesModified"
			@onDelete="onDelete"
		/>
	</div>
</template>

<script>
import AddSpecialitiesDialog from './AddSpecialitiesDialog.vue';
import SpecialitiesList from './SpecialitiesList.vue';
import specialityService from '@/request/specialty/specialtyService';
import loader from '@/mixins/loader';

export default {
	mixins: [loader],
	components: { AddSpecialitiesDialog, SpecialitiesList },
	data: () => ({
		isEdit: false,
		visible: false,
		specialities: [],
		SceletonLoader: false,
		specialityId: '',
	}),
	mounted() {
		this.getSpecialities();
	},
	methods: {
		async onDelete() {
			try {
				await specialityService.deleteSpecialty({
					id: this.specialityId,
				});
				this.close(true);
				this.specialities.shift(this.specialityId);
			} catch (e) {
				alert(e);
			}
		},
		close(isEdit) {
			if (isEdit) {
				this.isEdit = false;
			}
			this.visible = false;
		},
		editSpeciality(e) {
			this.isEdit = true;
			this.specialityId = e;
			this.visible = true;
		},
		specialitiesModified() {
			this.isEdit = false;
			this.visible = false;
			this.getSpecialities();
		},
		addSpeciality(e) {
			this.visible = false;
			this.specialities.unshift(e);
			// this.getSpecialities();
		},
		async getSpecialities() {
			try {
				this.setLoading(true);
				const newItem = await specialityService.getAllSpecialty();
				this.specialities = newItem
				this.setLoading(false);
			} catch (e) {
				this.setLoading(false);
				alert(e);
			}
		},
	},
};
</script>

<style></style>
