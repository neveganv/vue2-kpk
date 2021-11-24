<template>
	<VRow>
		<VCol>
			<v-item-group>
				<v-row>
					<v-col v-for="newItem in news" :key="newItem._id" cols="12" md="3">
						<v-item v-slot="{ active }">
							<v-card
								width="auto"
								:color="active ? '' : ''"
								class="align-end"
								@click="detailNew(newItem)"
							>
								<v-btn absolute top left  color="primary" tile class="category">
									{{ newItem.categoryId }}
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
									<div class="new-title">
										<span>{{ newItem.title || '--' }}</span>
									</div>
									<v-spacer></v-spacer>

									<v-btn icon @click.stop color="error darken-1">
										<v-icon>mdi-delete</v-icon>
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-item>
					</v-col>
				</v-row>
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
	mounted() {
		console.log('Новини', this.news);
	},
	methods: {
		detailNew(e) {
			console.log(e);
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
.category{
	top: 0;
	left: 0;
	z-index: 3;
	border-top-right-radius: 5px;
	border-top-left-radius: 5px;
	border-bottom-right-radius: 5px;
}
</style>
