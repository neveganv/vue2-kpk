<template>
	<div>
		<VRow
			no-gutters
			class="mt-5 h-auto"
			v-if="!SceletonLoader"
			justify-lg="space-between"
			justify-sm="space-around"
			justify-md="space-around"
		>
			<VCol
				v-for="(specialitie, index) in specialities"
				:key="index"
				cols="auto"
				class="mt-5 mx-auto"
			>
				<MySpecialitiesCard
					:specialitie="specialitie"
					:indexSpecialitie="index + 1"
				/>
			</VCol>
		</VRow>
		<VRow
			no-gutters
			class="mt-5 h-auto"
			v-else
			justify-lg="space-between"
			justify-sm="space-around"
			justify-md="space-around"
		>
			<VCol v-for="index in 6" :key="index" cols="auto" class="mt-5 mx-auto">
				<MySpecialitiesCard
					:sceletonLoader="SceletonLoader"
	
				/>
			</VCol>
		</VRow>
	</div>
</template>

<script>
import MySpecialitiesCard from '../../UI/my-specialities-card.vue';
import specialityService from '@/request/specialty/specialtyService';

export default {
	data: () => ({
		specialities: [],
		SceletonLoader: false,
	}),
	components: {
		MySpecialitiesCard,
	},
	mounted() {
		this.getSpecialities();
	},
	methods: {
		async getSpecialities() {
			this.SceletonLoader = true;
			const newItem = await specialityService.getAllSpecialty()
			console.log(this.specialities = newItem.reverse())
			this.SceletonLoader = false;
			console.log(this.specialities);
		},
	},
};
</script>

<style></style>
