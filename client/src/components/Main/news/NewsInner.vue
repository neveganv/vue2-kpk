<template>
	<div class="news">
		<div v-if="!sceletonLoader">
			<VRow class="title" no-gutter align="center">
				<VCol class="title-text">
					{{ newItem.title || '--' }}
				</VCol>
			</VRow>
			<VRow no-gutters class="mt-4">
				<VCol cols="3">
					<VRow no-gutters
						><VIcon left>mdi-clock-outline</VIcon>
						{{
							moment(newItem.created_time).locale('uk').format('LL') || '--'
						}}</VRow
					>
				</VCol>
				<VCol>
					<VRow no-gutters
						><VIcon left>mdi-eye</VIcon>{{ newItem.views || '--' }}</VRow
					>
				</VCol>
			</VRow>
		</div>
		<VRow v-else no-gutter align="center">
			<VCol class="title-text">
				<v-skeleton-loader type="article"></v-skeleton-loader>
			</VCol>
		</VRow>
		<myDivider class="mt-10 mb-3" :height="1" />

		<VRow no-gutters v-if="!sceletonLoader">
			<div class="main-img">
				<img :src="newItem.main_img" alt="" />
			</div>
		</VRow>
		<VRow no-gutters v-else>
			<div class="w-100">
				<v-skeleton-loader type="image"></v-skeleton-loader>
			</div>
		</VRow>

		<myDivider class="mt-3 mb-5" :height="1" />
		<VCol no-gutters class="content" v-if="newItem.content && !sceletonLoader">
			<VRow no-gutters>
				<div v-html="newItem.content"></div>
			</VRow>
		</VCol>
		<VCol
			v-else-if="!newItem.content && !sceletonLoader"
			cols="12"
			class="text-center mи-5"
		>
			<span>На даний момент ця новина не заповнена...</span>
		</VCol>
		<VCol no-gutters style="margin-top: 50px" v-else-if="sceletonLoader">
			<v-skeleton-loader type="article"></v-skeleton-loader>
			<v-skeleton-loader type="article"></v-skeleton-loader>
		</VCol>
	</div>
</template>

<script>
import myDivider from '../UI/my-divider.vue';
export default {
	components: { myDivider },
	props: {
		newItem: {
			require: true,
		},
		sceletonLoader: {
			require: true,
		},
	},
	data: () => ({
		panel: [0],
	}),
};
</script>

<style lang="scss" scoped>
.news {
	min-height: 100vh;
	.main-img {
		width: 100%;
		height: 520px;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.content {
		&-title {
			font-family: Montserrat;
			font-style: normal;
			font-weight: normal;
			font-size: 25px;
			line-height: 30px;
		}
	}
}
</style>
