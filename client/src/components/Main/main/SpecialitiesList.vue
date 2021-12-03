<template>
	<div>
		<VRow justify="space-between" class="mt-5">
			<VCol
				v-for="specialitie in specialities"
				:key="specialitie.id"
				cols="12"
				md="4"
			>
				<MySpecialitiesCard :specialitie="specialitie" />
			</VCol>
		</VRow>
	</div>
</template>

<script>
import MySpecialitiesCard from './../UI/my-specialities-card.vue';
import specialityService from '@/request/specialty/specialtyService';

export default {
	data: () => ({
		specialities: [],
	}),
	components: {
		MySpecialitiesCard,
	},
	mounted() {
		this.getSpecialities();
	},
	methods: {
		async getSpecialities() {
			this.specialities = await specialityService.getAllSpecialty();
			console.log(this.specialities);
		},
	},
};
</script>

<style></style>
