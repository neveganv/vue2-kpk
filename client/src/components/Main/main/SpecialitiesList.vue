<template>
	<div>
		<VRow no-gutters class="mt-5 h-auto" v-if="!SceletonLoader" justify="space-between" >
			<VCol
				v-for="(specialitie, index) in specialities"
				:key="index"
				cols="12"
				md="4"
				class="mt-5"
			>
				<MySpecialitiesCard
					:specialitie="specialitie"
					:indexSpecialitie="index + 1"
				/>
			</VCol>
		</VRow>
		<VRow no-gutters justify="center" class="mt-5" v-else>
			<VCol v-for="n in 6" :key="n" cols="12" md="4">
				<VCard max-width="400">
					<VCol class="my-5">
						<v-skeleton-loader
							class="mx-auto"
							max-width="400"
							type="card"
						></v-skeleton-loader>
					</VCol>
				</VCard>
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
			this.specialities = await specialityService.getAllSpecialty();
			this.SceletonLoader = false;
			console.log(this.specialities);
		},
	},
};
</script>

<style></style>
