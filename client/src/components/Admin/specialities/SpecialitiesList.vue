<template>
	<div>
		<VRow class="mt-5" v-if="!SceletonLoader">
			<VCol
				v-for="(specialitie, index) in specialitites"
				:key="index"
				cols="12"
				md="4"
			>
				<MySpecialitiesCard
					:specialitie="specialitie"
					:indexSpecialitie="index + 1"
					:edit="true"
				/>
			</VCol>
		</VRow>
		<VRow justify="space-between" class="mt-5" v-else>
			<VCol v-for="n in 6" :key="n" cols="12" md="4">
				<VCard max-width="400">
					<VCol>
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
import MySpecialitiesCard from '@/components/Main/UI/my-specialities-card.vue';

export default {
	components: {
		MySpecialitiesCard,
	},
	props: {
		specialitites: {
			require: true,
		},
		SceletonLoader:{
			require:true
		}
	},

};
</script>

<style></style>
