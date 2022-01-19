<template>
	<VRow>
		<VCol>
			<v-item-group>
				<div>
					<v-row v-if="news.length > 0" justify="space-around" justify-lg="space-between">
						<v-col v-for="item in news" :key="item._id" cols="auto">
							<v-item v-slot="{ active, toggle }">
								<v-card
									width="auto"
									:color="active ? '' : ''"
									@click="toggle"
									class="align-end new-card"
								>
									<v-img height="140"  cover :lazy-src="item.img" :src="item.img">
										<template v-slot:placeholder>
											<v-row
												class="fill-height ma-0 "
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
						<div class="w-100 text-center">Ще немає нещодавних новин</div>
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
.new-card{
	max-width: 300px;
}
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
