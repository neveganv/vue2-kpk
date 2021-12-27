<template>
	<div>
		<my-header />
		<div class="my-container" style="margin-top: 50px">
			<VRow no-gutters
				><VBtn
					rounded
					color="primary"
					text
					@click="$router.push({ path: '/' })"
				>
					<VIcon left>mdi-arrow-left</VIcon> На головну</VBtn
				></VRow
			>
		</div>
		<div class="my-container" style="margin-top: 50px">
			<VRow no-gutters>
				<VCol cols="8">
					<PageInner :page="page" :sceletonLoader="sceletonLoader" />
				</VCol>
				<VCol cols="4">
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
import pageService from '@/request/page/pageService';
import specialityService from '@/request/specialty/specialtyService';
import MyHeader from '../UI/my-header.vue';
import PageInner from './PageInner.vue';
import AnotherSpecialitiesList from '@/components/Main/speciality/AnotherSpecialitiesList.vue';

export default {
	data: () => ({
		page: [],
		sceletonLoader: false,
		specialities: [],
	}),
	watch: {
		$route: {
			deep: true,
			handler(e) {
				this.getPage();
			},
		},
	},
	components: {
		MyHeader,
		PageInner,
		AnotherSpecialitiesList,
	},
	mounted() {
		this.getPage();
		
	},
	methods: {
		async getPage() {
			this.sceletonLoader = true;
			const newPage = await pageService.getOne({ _id: this.$route.params.id });
			this.page = newPage[0];
			console.log('my-page', this.page);
			this.getSpecialities();
		},
		async getSpecialities() {
			this.specialities = await specialityService.getAllSpecialty();
			this.specialities = this.specialities.splice(0, 4);
			this.sceletonLoader = false;
		},
	},
};
</script>

<style lang="scss"></style>
