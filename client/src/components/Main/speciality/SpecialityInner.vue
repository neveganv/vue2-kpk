<template>
	<div class="speciality">
		<VRow class="title" no-gutter align="center" v-if="!sceletonLoader">
			<VCol cols="auto" class="title-number">
				{{ specialitie.number || '--' }}
			</VCol>
			<VCol
				class="title-text"
				:class="{ 'text-subtitle-1': $vuetify.breakpoint.smAndDown }"
			>
				{{ specialitie.name || '--' }}
			</VCol>
		</VRow>
		<VRow v-else class="title" no-gutter align="center">
			<VCol cols="auto">
				<v-skeleton-loader type="button"></v-skeleton-loader>
			</VCol>
			<VCol class="title-text">
				<v-skeleton-loader type="chip" class="pl-2"></v-skeleton-loader>
			</VCol>
		</VRow>
		<VRow no-gutters v-if="!sceletonLoader">
			<div
				class="main-img mt-10"
				v-bind:style="{ 'background-image': 'url(' + specialitie.img + ')' }"
			>
				<!-- <img :src="specialitie.img" alt="" /> -->
			</div>
		</VRow>
		<VRow no-gutters v-else>
			<div class="w-100 mt-10">
				<v-skeleton-loader type="image"></v-skeleton-loader>
			</div>
		</VRow>

		<VCol
			no-gutters
			class="content mt-5"
			v-if="specialitie.content && !sceletonLoader"
		>
			<VRow align="center" class="content-title">
				<VCol cols="auto" class="pr-0">
					<VIcon color="black" size="30">mdi-information-outline</VIcon></VCol
				>
				<VCol
					cols="auto"
					class="black--text"
					:class="{ 'text-subtitle-1': $vuetify.breakpoint.smAndDown }"
					>Інформація про спеціальність</VCol
				>
			</VRow>
			<VRow no-gutters style="margin-top: 30px">
				<div v-html="specialitie.content"></div>
			</VRow>
		</VCol>
		<VCol no-gutters style="margin-top: 50px" v-else-if="sceletonLoader">
			<v-skeleton-loader type="article"></v-skeleton-loader>
			<v-skeleton-loader type="article"></v-skeleton-loader>
		</VCol>
		<VCol
			no-gutters
			class="content ье-5"
			v-if="specialitie.courses && !sceletonLoader"
		>
			<VRow align="center" class="content-title">
				<VCol cols="auto" class="pr-0">
					<VIcon color="black" size="30">mdi-school-outline</VIcon></VCol
				>
				<VCol
					cols="auto"
					class="black--text"
					:class="{ 'text-subtitle-1': $vuetify.breakpoint.smAndDown }"
					>Освітній процес</VCol
				>
			</VRow>
			<VRow no-gutters style="margin-top: 30px; margin-bottom: 50px">
				<v-expansion-panels v-model="panel" multiple>
					<v-expansion-panel
						v-for="(course, i) in specialitie.courses"
						:key="i"
					>
						<v-expansion-panel-header> {{ i }} курс </v-expansion-panel-header>
						<v-expansion-panel-content style="word-break: break-all">
							{{ course }}
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
			</VRow>
		</VCol>
	</div>
</template>

<script>
export default {
	props: {
		specialitie: {
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
.speciality {
	min-height: 100vh;
	.title {
		&-number {
			background: white;
			margin-left: 12px;
			padding: 6px;
			border-radius: 6px;
			border: 1px solid #f3eff9;
			box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
			font-weight: 600;
			font-size: 18px;
		}
	}
	.main-img {
		width: 100%;
		height: 226px;
		position: relative;
		overflow: hidden;
		background-size: cover;
		background-position: center;
		z-index: 1;
		overflow: hidden;

		&::before {
			background: inherit;
			content: '';
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
			backdrop-filter: blur(5px);
			filter: blur(5px);
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
