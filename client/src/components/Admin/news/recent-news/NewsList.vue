<template>
	<VRow>
		<VCol>
			<v-item-group>
				<div v-if="!sceletonLoader">
					<v-row v-if="news.length > 0">
						<v-col v-for="item in news" :key="item._id" cols="12" md="3">
							<v-item v-slot="{ active, toggle }">
								<v-card
									width="auto"
									:color="active ? '' : ''"
									@click="toggle"
									class="align-end"
								>
									<v-img height="140" :lazy-src="item.img" :src="item.img">
										<template v-slot:placeholder>
											<v-row
												class="fill-height ma-0"
												align="center"
												justify="center"
											>
												<v-progress-circular
													indeterminate
													color="primary "
												></v-progress-circular>
											</v-row>
										</template>
									</v-img>
									<v-card-actions>
										<VRow class="new-title">
											<VCol
												><span>{{ item.title }}</span>
												<div class="timer m-0 p-0">
													{{
														moment(item.created_time)
															.locale('uk')
															.startOf('hours')
															.fromNow() || '--'
													}}
												</div>
											</VCol>
										</VRow>

										<v-spacer></v-spacer>

										<v-btn
											icon
											@click.stop="deleteNew(item._id)"
											color="error darken-1"
										>
											<v-icon>mdi-delete</v-icon>
										</v-btn>
									</v-card-actions>
								</v-card>
							</v-item>
						</v-col>
					</v-row>
					<v-row v-else>
						<div>Ще немає крутих новин</div>
					</v-row>
				</div>
				<div v-else>
					<v-row>
						<v-col cols="12" md="3" v-for="key in 14" :key="key">
							<v-skeleton-loader
								light
								class="mx-auto"
								max-width="300"
								type="card"
							></v-skeleton-loader>
						</v-col>
					</v-row>
				</div>
			</v-item-group>
		</VCol>
	</VRow>
</template>

<script>
export default {
	props: {
		news: {
			require: true,
		},
		sceletonLoader: {
			require: true,
		},
	},
	watch: {
		news: {
			deep: true,
			handler(e) {
				console.log(e);
			},
		},
	},
	methods: {
		deleteNew(e) {
			this.$emit('deleteNew', e);
		},
	},
};
</script>

<style lang="scss" scoped>
.new-title {
	max-width: 90%;
	width: 100%;

	span {
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
}
.timer {
	font-size: 10px;
	font-weight: 500;
	color: #b5b5b5;
}
</style>
