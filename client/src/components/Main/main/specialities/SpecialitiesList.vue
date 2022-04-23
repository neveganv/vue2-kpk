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
				v-for="(specialitie, index) in getPaginateSpeciality"
				:key="index"
				cols="auto"
				class="mt-5 mx-auto"
			>
				<MySpecialitiesCard
					:specialitie="specialitie"
					:indexSpecialitie="index + 1"
				/>
			</VCol>
			<VRow no-gutters class="w-100 mt-5" v-if="isLoadMore">
				<VCol cols="12" class="text-center">
					<VBtn outlined color="#EF876D" rounded @click="onEmitPage">
						Показати більше
					</VBtn>
				</VCol>
			</VRow>
		</VRow>
		<VRow
			no-gutters
			class="mt-5 h-auto"
			v-else
			justify-lg="space-between"
			justify-sm="space-around"
			justify-md="space-around"
		>
			<VCol
				v-for="index in this.$vuetify.breakpoint.smAndDown ? 2 : 6"
				:key="index"
				cols="auto"
				class="mt-5 mx-auto"
			>
				<MySpecialitiesCard :sceletonLoader="SceletonLoader" />
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
		SceletonLoader: true,
		page: 1,
		isLoadMore: false,
		isIntersectFirst:false
	}),
	components: {
		MySpecialitiesCard,
	},
	props: {
		isSpecialities: {
			require: true,
		},
	},
	watch: {
		isSpecialities: {
			deep: true,
			handler(e) {
				if (e && this.specialities.length === 0 && !this.isIntersectFirst) {
					this.getSpecialities();
				}
			},
		},
	},
	mounted(){
		this.getSpecialities();
	},
	methods: {
		onEmitPage() {
			this.page += 1;
		},
		async getSpecialities() {
			this.SceletonLoader = true;
			this.isIntersectFirst = true;
			const newItem = await specialityService.getAllSpecialty();
			console.log(newItem)
			this.specialities = newItem.result;
			this.specialitiesCopy = this.specialities;
			this.SceletonLoader = false;
		},
	},
	computed: {
		getPaginateSpeciality() {
			this.isLoadMore = this.specialities.length > this.page * this.limit;
			const newSpecialities = [...this.specialities].splice(
				0,
				this.limit * this.page
			);

			this.specialitiesCopy = newSpecialities;

			return this.specialitiesCopy;
		},
		limit() {
			if (this.$vuetify.breakpoint.smAndDown) {
				return 2;
			} else {
				return 6;
			}
		},
	},
};
</script>

<style></style>
