<template>
	<div class="py-10 px-5">
		<v-row v-if="partners.length" justify="start">
			<v-col
				cols="12"
				xl="3"
				lg="3"
				md="4"
				sm="6"
				v-for="partner in partners"
				:key="partner._id"
			>
				<v-card @click="onClick">
					<v-img height="140" cover :src="partner.path_img" />
					<VDivider class="mx-5" />
					<VRow no-gutters class="pa-0 py-2 mx-5" align="center">
						<VCol cols="8">
							<v-card-subtitle v-if="partner.partner_name" class="pa-0"
								>{{ partner.partner_name }}
							</v-card-subtitle>
						</VCol>
						<VCol cols="4" class="text-right">
							<v-tooltip bottom>
								<template v-slot:activator="{ on, attrs }">
									<VBtn
										icon
										color="error"
										v-on:dblclick="onDelete(partner._id)"
										v-on="on"
										v-bind="attrs"
										@click.stop
									>
										<VIcon> mdi-delete </VIcon>
									</VBtn>
								</template>
								<span>Щоб видалити, потрібно натиснути двічі</span>
							</v-tooltip>
						</VCol>
					</VRow>
				</v-card>
			</v-col>
		</v-row>
		<v-row v-else>
			<div class="text-center w-100">Список партнерів порожній</div>
		</v-row>
	</div>
</template>

<script>
export default {
	props: {
		partners: {
			type: Array,
			require: false,
		},
	},
	methods: {
		onDelete(id) {
			this.$emit('deletePartner', id);
		},
		onClick() {
			console.log('open');
		},
	},
};
</script>
