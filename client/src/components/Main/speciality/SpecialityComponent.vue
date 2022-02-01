<template>
	<div>
		<my-header />

		<div class="my-container mt-5" :class="{'small' : $vuetify.breakpoint.smAndDown}">
			<VRow no-gutters align="center"
				><VBtn
					:class="{'x-small' : $vuetify.breakpoint.smAndDown}"
					color="primary"
					small
					text
					@click="$router.push({ path: '/' })"
				>
					<VIcon left>mdi-arrow-left</VIcon> На головну</VBtn
				>
				<VDivider /></VRow
			>

		</div>
		<div class="my-container mt-10" :class="{'small' : $vuetify.breakpoint.smAndDown}">
			<VRow no-gutters>
				<VCol cols="12" xl="8" lg="8" md="8" sm="12">
					<SpecialityInner
						:specialitie="specialitie"
						:sceletonLoader="sceletonLoader"
					/>
				</VCol>
				<VCol cols="12" xl="4" lg="4" md="4" sm="12">
					<AnotherSpecialitiesList
						:specialities="specialities"
						:sceletonLoader="sceletonLoader"
					/>
				</VCol>
			</VRow>
		</div>
	</div>
</template>

<script>
import MyHeader from '../UI/my-header.vue';
import SpecialityInner from './SpecialityInner.vue';
import AnotherSpecialitiesList from './AnotherSpecialitiesList.vue';

import specialityService from '@/request/specialty/specialtyService';

export default {
	data: () => ({
		specialitie: [],
		specialities: [],
		sceletonLoader: false,
	}),
	components: {
		MyHeader,
		SpecialityInner,
		AnotherSpecialitiesList,
	},
	watch: {
		$route: {
			deep: true,
			handler(e) {
				this.getSpeciality();
				this.getSpecialities();
			},
		},
	},
	mounted() {
		this.getSpeciality();
	},
	methods: {
		async getSpeciality() {
			this.sceletonLoader = true;
			const newSpeciality = await specialityService.getById({
				_id: this.$route.params.id,
			});
			this.specialitie = newSpeciality[0];
			this.getSpecialities();
		},
		async getSpecialities() {
			this.specialities = await specialityService.getAllSpecialty();
			this.specialities = this.specialities.filter(
				e => e._id != this.specialitie._id
			);
			this.specialities = this.specialities.splice(0, 4);

			this.sceletonLoader = false;
		},
	},
};
</script>

<style></style>
