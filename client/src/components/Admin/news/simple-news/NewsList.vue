<template>
	<VRow>
		<VCol>
			<v-item-group>
				<div v-if="!sceletonLoader">
					<v-row v-if="news.length > 0">
						<v-col v-for="newItem in news" :key="newItem._id" cols="12" md="3">
							<v-item v-slot="{ active }">
								<v-card
									width="auto"
									:color="active ? '' : ''"
									class="align-end"
									@click="detailNew(newItem)"
								>
									<v-btn
										absolute
										top
										left
										color="primary"
										tile
										class="category"
									>
										{{ newItem.category.name }}
									</v-btn>
									<v-img
										v-if="newItem.main_img"
										height="140"
										:lazy-src="newItem.main_img"
										:src="newItem.main_img"
									>
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
									<v-img
										v-else
										height="140"
										:src="'https://picsum.photos/350/165?random'"
									>
									</v-img>

									<v-card-actions>
										<VRow class="new-title">
											<VCol cols="12">
												<span>{{ newItem.title || '--' }}</span>
												<VRow>
													<VCol cols="5" class="timer">{{
														newItem.created_time.substr(0, 10) || '--'
													}}</VCol>
													<VCol
														class="timer"
														v-if="
															moment
																.duration(
																	moment(newItem.created_time).diff(moment())
																)
																.asDays() <= 0 &&
															moment
																.duration(
																	moment(newItem.created_time).diff(moment())
																)
																.asDays() > -1
														"
													>
														{{
															moment(newItem.created_time)
																.locale('uk')
																.startOf('hours')
																.fromNow() || '--'
														}}
													</VCol>
												</VRow>
											</VCol>
										</VRow>
										<v-spacer></v-spacer>

										<v-btn
											icon
											@click.stop="onDelete(newItem)"
											color="error darken-1"
										>
											<v-icon>mdi-delete</v-icon>
										</v-btn>
									</v-card-actions>
								</v-card>
							</v-item>
						</v-col>
					</v-row>
					<v-row v-else>Новин ще немає</v-row>
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
	data: () => ({}),
	props: {
		sceletonLoader: {
			require: true,
		},
		news: {
			require: true,
		},
	},
	mounted() {
		console.log('Новини', this.news);
	},
	methods: {
		detailNew(e) {
			this.$emit('show', e);
		},
		onDelete(e) {
			this.$emit('deleteNew', e._id);
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
.category {
	max-width: 100%;

	top: 0;
	left: 0;
	z-index: 3;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	pointer-events: none;
}
</style>
