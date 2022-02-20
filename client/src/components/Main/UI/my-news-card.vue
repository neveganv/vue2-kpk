<template>
	<div
		class="my-new"
		@click="onClick"
		:class="{
			md: $vuetify.breakpoint.md,
			sm: $vuetify.breakpoint.sm,
			xs: $vuetify.breakpoint.xs,
		}"
	>
		<div class="my-new__header" v-if="!sceletonLoader">
			<b> {{ newItem.category.name || '--' }}</b>
			<div class="text-right">
				<span>
					{{ moment(newItem.created_time).locale('uk').format('LL') || '--' }}
				</span>
				<div class="views" v-if="newItem.views > 0">
					<VIcon left small>mdi-eye</VIcon>{{ newItem.views }}
				</div>
				<div class="views" v-else>
					<VIcon left small>mdi-eye</VIcon>немає переглядів
				</div>
			</div>
		</div>

		<div class="my-new__header" v-if="sceletonLoader">
			<v-skeleton-loader
				type="article"
				style="width: 530px"
			></v-skeleton-loader>
		</div>

		<div class="my-new__content" v-if="!sceletonLoader">
			{{ newItem.title }}
		</div>

		<div class="my-new__img" v-if="!sceletonLoader">
			<v-img
				:src="newItem.main_img"
				draggable="false"
				:lazy-src="newItem.main_img"
			>
				<template v-slot:placeholder>
					<v-row class="fill-height ma-0" align="center" justify="center">
						<v-progress-circular
							indeterminate
							color="#EF876D"
						></v-progress-circular>
					</v-row>
				</template>
			</v-img>
		</div>

		<div class="my-new__img" v-if="sceletonLoader">
			<v-skeleton-loader type="image"></v-skeleton-loader>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		newItem: {
			require: true,
		},
		sceletonLoader: {
			require: false,
		},
	},
	methods: {
		onClick() {
			if (!this.sceletonLoader) {
				this.$router.push({
					path: `/news-${this.newItem._id}`,
				});
			}
		},
	},
};
</script>

<style lang="scss">
.my-new {
	cursor: pointer;
	width: 450px;
	height: 440px;
	padding-left: 15px;
	margin: 20px auto 70px auto;
	position: relative;
	transition: 0.4s ease;
	&.md {
		width: 430px;
	}
	&.sm {
		width: 330px;
		height: 290px;
		.my-new__img {
			height: 70%;
		}
	}
	&.xs {
		max-width: 330px;
		width: 100%;
		height: 290px;
		.my-new__img {
			height: 70%;
		}
	}

	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		b,
		span {
			font-style: normal;
			font-weight: 600;
			font-size: 20px !important;
			line-height: 24px;

			color: #000000;
		}
		span {
			font-size: 11px !important;
			line-height: 13px;
			font-weight: 300;
		}
		.views {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			font-size: 13px;
			color: #757575;
		}
	}
	&__content {
		margin-top: 20px;
		margin-bottom: 10px;
		font-weight: normal;
		width: 80%;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	&__img {
		transition: 0.4s ease;
		height: 70%;
		max-width: 510px;
		width: 100%;

		img {
			object-fit: cover;
			width: 100%;
			height: 100%;
		}
	}
	&::after {
		position: absolute;
		content: '';
		width: 2px;
		left: 0;
		top: 0;
		height: 85%;
		background: #757575;
	}
	&:hover {
		opacity: 0.9;
	}
	&:active {
		transform: scale(0.95);
	}
	.v-image{
		height: 100%!important;
	}
}
.slide-fade-enter-active {
	transition: all 2s ease;
}
.slide-fade-leave-active {
	transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
	transform: translateY(30px);
	opacity: 0;
}
</style>
