<template>
	<div style="overflow: hidden">
		<my-header />
		<div class="my-container">
			<VRow
				class="content mt-5"
				no-gutters
				align="center"
				justify="space-between"
			>
				<VCol cols="6">
					<VRow align="center">
						<VCardTitle>
							<VIcon left color="black" dense> mdi-school </VIcon>
							Підготовчі курси
						</VCardTitle>
					</VRow>
				</VCol>
			</VRow>
			<VDivider class="mb-5 mt-1" />
			<VRow>
				<v-tabs
					vertical
					color="purple darken-1"
					v-model="activeTab"
					@change="changeTab"
				>
					<v-tab> Головна </v-tab>
					<v-tab> Подати заявку </v-tab>

					<v-tab-item>
						<v-card flat>
							<VCardTitle>
								Набір на Підготовчі курси до вступу в коледж у 2022 році
							</VCardTitle>
							<v-card-text>
								Підготовка слухачів здійснюється за такими дисциплінами:<br />
								Укр мова - 60годин<br />
								Математика - 90годин<br />
								(навчання розпочинається по мірі комплекутації групи)<br />
							</v-card-text>
						</v-card>
					</v-tab-item>
					<v-tab-item>
						<v-card flat>
							<VCardTitle>
								<VRow justify="space-between" align="center">
									<VCol cols="auto">
										<span> Подати заявку на курси </span>
									</VCol>
								</VRow>
							</VCardTitle>
							<VDivider />

							<v-card-text>
								<VRow justify="center">
									<VCol cols="4">
										<VTextField
											label="Ім'я"
											dense
											prepend-icon="mdi-account-box-outline"
											hide-details="auto"
											outlined
											v-model="entered.name"
											color="purple darken-1"
										/>
									</VCol>
									<VCol cols="4">
										<VTextField
											prepend-icon="mdi-account-box-outline"
											label="Прізвище"
											dense
											hide-details="auto"
											outlined
											v-model="entered.name"
											color="purple darken-1"
										/>
									</VCol>
									<VCol cols="4">
										<VTextField
											prepend-icon="mdi-account-box-outline"
											label="По-батькові"
											dense
											hide-details="auto"
											outlined
											v-model="entered.name"
											color="purple darken-1"
										/>
									</VCol>
								</VRow>
								<VRow>
									<VCol cols="6">
										<VTextField
											prepend-icon="mdi-phone-outline"
											label="Мобільний телефон учня"
											outlined
											dense
											color="purple darken-1"
											return-masked-value
											v-mask="'+38 (###) ##-##-###'"
											hide-details="auto"
											v-model="entered.phone"
										>
										</VTextField>
									</VCol>
									<VCol cols="6">
										<VTextField
											label="Мобільний телефон одного з батьків"
											prepend-icon="mdi-phone-outline"
											outlined
											dense
											color="purple darken-1"
											return-masked-value
											v-mask="'+38 (###) ##-##-###'"
											hide-details="auto"
											v-model="entered.phoneStudent"
										>
										</VTextField>
									</VCol>
								</VRow>
								<VRow>
									<VCol cols="5">
										<VTextField
											prepend-icon="mdi-id-card"
											label="Серія та номер паспорта/ID карти "
											outlined
											dense
											color="purple darken-1"
											return-masked-value
											v-mask="'+38 (###) ##-##-###'"
											hide-details="auto"
											v-model="entered.phoneParent"
										>
										</VTextField>
									</VCol>
								</VRow>
								<VRow>
									<VCol>
										<v-checkbox
											v-model="ex4"
											label="Даю згоду на обробку моїх персональних даних"
											color="indigo"
											value="indigo"
											hide-details
										></v-checkbox>
									</VCol>
								</VRow>
							</v-card-text>
							<VDivider />
							<VCardActions class="mb-5">
								<span class="font-weight-bold mr-1"> Ціна:</span>
								<span class="font-weight-bold success--text">
									12312312 грн.</span
								>
								<VSpacer />
								<VBtn color="purple darken-1" class="white--text" dense>
									Подати заявку
								</VBtn>
							</VCardActions>
						</v-card>
					</v-tab-item>
				</v-tabs>
			</VRow>

			<VRow
				v-if="loading"
				align="center"
				justify="center"
				style="height: 30vh"
				class="bg-white"
			>
				<v-progress-circular
					indeterminate
					color="primary"
				></v-progress-circular>
			</VRow>
		</div>
	</div>
</template>

<script>
import sheduleService from '@/request/shedule/sheduleService';
import groupService from '@/request/shedule/groupService';
import myHeader from '../UI/my-header.vue';
import SheduleInner from '../../Admin/shedule/SheduleInner.vue';
export default {
	components: { myHeader, SheduleInner },
	data: () => ({
		loading: false,
		activeTab: 0,
		entered: {},
	}),

	mounted() {
		const tabLocalStorage = window.localStorage.getItem('activeTabEntered');
		if (Number(tabLocalStorage)) {
			this.activeTab = Number(tabLocalStorage);
		}
	},
	watch: {},
	computed: {},
	methods: {
		changeTab() {
			window.localStorage.setItem('activeTabEntered', this.activeTab);
		},
	},
};
</script>

<style></style>
