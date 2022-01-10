<template>
	<div class="another">
		<VRow no-gutters class="font-weight-medium" v-if="!sceletonLoader">
            Популярні новини
		</VRow>
		<VRow no-gutters class="font-weight-medium" v-else>
			<v-skeleton-loader type="chip"></v-skeleton-loader>
		</VRow>
		<div v-if="!sceletonLoader">
			<div v-for="newItem in news" :key="newItem._id">
				<MyNewsCardSm :newItem="newItem" />
			</div>
		</div>
		<div v-else v-for="i in 3" :key="i">
			<VCard style="margin: 20px 0 40px 0">
				<v-skeleton-loader
					type="image"
					class="my-4"
					style="height: 140px"
				></v-skeleton-loader>
				<VRow no-gutters class="my-1" style="height: 44px">
					<v-skeleton-loader type="chip" class="pl-2" ></v-skeleton-loader>
					<VSpacer />
					<v-skeleton-loader type="button" class="pr-2 "></v-skeleton-loader>
				</VRow>
			</VCard>
		</div>
	</div>
</template>

<script>
import MyNewsCardSm from '../UI/my-news-card-sm.vue';
export default {
	props: {
		news: {
			require: true,
		},
		sceletonLoader: {
			require: false,
		},
	},
	watch: {
		specialities: {
			deep: true,
			handler(e) {
				console.log(e);
			},
		},
	},
	components: { MyNewsCardSm },
};
</script>

<style lang="scss" scoped>
.another {
	padding-left: 40px;
	margin-left: 70px;
	border-left: 1px solid #757575;
	height: auto;
}
</style>
