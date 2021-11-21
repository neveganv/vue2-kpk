<template>
	<VRow>
		<VCol>
			<v-item-group>
				<v-row>
					<v-col v-for="n in 8" :key="n" cols="12" md="3">
						<v-item v-slot="{ active, toggle }">
							<v-card
								width="400"
								:color="active ? '' : ''"
								@click="toggle"
								class="align-end"
							>
								<v-img
									height="140"
									:lazy-src="`https://picsum.photos/500/300?image=1`"
									src="https://picsum.photos/500/300?image=1"
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
								<v-card-actions>
									<div class="new-title">
										<span>Заголовок новини {{ n }}</span>
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
export default {};
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
</style>
