<template>
	<div style="overflow: hidden">
		<my-header />
		<v-snackbar v-model="snackbar" top color="success" rounded elevation="10">
			Заявка на підготовчі курси успішно подана. <br />
			Очікуйте дзвінка від менеджера

			<template v-slot:action="{ attrs }">
				<v-btn icon v-bind="attrs" @click="snackbar = false">
					<VIcon>mdi-close</VIcon>
				</v-btn>
			</template>
		</v-snackbar>
		<div class="my-container">
			<VRow
				class="content mt-5 mb-0"
				no-gutters
				align="center"
				justify="space-between"
			>
				<VCol cols="12">
					<VRow align="center">
						<VCardTitle>
							<VIcon left color="grey darken-2" dense> mdi-school </VIcon>
							<span class="grey--text text--darken-2"> Підготовчі курси </span>
						</VCardTitle>
					</VRow>
				</VCol>
			</VRow>
			<VDivider class="mb-0 mt-1" />

			<VRow no-gutters>
				<v-tabs
					show-arrows
					:vertical="$vuetify.breakpoint.smAndDown ? false : true"
					color="purple darken-1"
					v-model="activeTab"
					@change="changeTab"
				>
					<v-tab> Головна </v-tab>
					<v-tab> Подати заявку </v-tab>

					<v-tab-item>
						<VDivider v-if="$vuetify.breakpoint.smAndDown" />
						<v-card flat>
							<VCardTitle>
								<VRow justify="space-between" align="center">
									<VCol cols="auto">
										<span :class="{ 'subtitle-1': $vuetify.breakpoint.xs }">
											{{settings.title}}
										</span>
									</VCol>
								</VRow>
							</VCardTitle>
							<VDivider />
							<v-card-text v-html="settings.content">
							</v-card-text>
							<VDivider />
							<VCardActions class="mb-5">
								<VRow justify="space-between">
									<VCol>
										<span
											:class="{ 'subtitle-2': $vuetify.breakpoint.xs }"
											class="font-weight-medium mr-1"
										>
											Вартість навчання за весь курс:</span
										>
										<span
											:class="{ 'subtitle-2': $vuetify.breakpoint.xs }"
											class="font-weight-bold success--text"
										>
											{{settings.price}} грн</span
										>
									</VCol>

									<VCol cols="12" md="auto" sm="auto">
										<VBtn
											color="purple darken-1"
											class="white--text text-capitalize"
											dense
											@click="activeTab = 1"
											:block="$vuetify.breakpoint.xs"
										>
											Подати заявку
										</VBtn>
									</VCol>
								</VRow>
							</VCardActions>
						</v-card>
					</v-tab-item>
					<v-tab-item>
						<VDivider v-if="$vuetify.breakpoint.smAndDown" />
						<v-card flat>
							<VCardTitle>
								<VRow justify="space-between" align="center">
									<VCol cols="auto">
										<span :class="{ 'subtitle-1': $vuetify.breakpoint.xs }">
											Подати заявку на курс
										</span>
									</VCol>
								</VRow>
							</VCardTitle>
							<VDivider />

							<v-card-text>
								<VRow justify="center">
									<VCol cols="12" xl="4" md="4" sm="6">
										<VTextField
											:prepend-icon="
												$vuetify.breakpoint.smAndDown
													? ''
													: 'mdi-account-box-outline'
											"
											:prepend-inner-icon="
												$vuetify.breakpoint.smAndDown
													? 'mdi-account-box-outline'
													: ''
											"
											label="Прізвище"
											dense
											hide-details="auto"
											outlined
											v-model="entered.surname"
											color="purple darken-1"
											:error-messages="SurnameError"
										/>
									</VCol>
									<VCol cols="12" xl="4" md="4" sm="6">
										<VTextField
											label="Ім'я"
											dense
											:prepend-icon="
												$vuetify.breakpoint.smAndDown
													? ''
													: 'mdi-account-box-outline'
											"
											:prepend-inner-icon="
												$vuetify.breakpoint.smAndDown
													? 'mdi-account-box-outline'
													: ''
											"
											hide-details="auto"
											outlined
											v-model="entered.name"
											color="purple darken-1"
											:error-messages="NameError"
										/>
									</VCol>

									<VCol cols="12" xl="4" md="4" sm="12">
										<VTextField
											:prepend-icon="
												$vuetify.breakpoint.smAndDown
													? ''
													: 'mdi-account-box-outline'
											"
											:prepend-inner-icon="
												$vuetify.breakpoint.smAndDown
													? 'mdi-account-box-outline'
													: ''
											"
											label="По батькові"
											dense
											hide-details="auto"
											outlined
											v-model="entered.middle_name"
											color="purple darken-1"
											:error-messages="MiddleNameError"
										/>
									</VCol>
								</VRow>
								<VRow>
									<VCol cols="12" xl="6" md="6" sm="12">
										<VTextField
											:prepend-icon="
												$vuetify.breakpoint.smAndDown ? '' : 'mdi-phone-outline'
											"
											:prepend-inner-icon="
												$vuetify.breakpoint.smAndDown ? 'mdi-phone-outline' : ''
											"
											label="Телефон учня"
											outlined
											dense
											color="purple darken-1"
											return-masked-value
											v-mask="'+38 (###) ##-##-###'"
											hide-details="auto"
											v-model="entered.student_phone"
											:error-messages="StudentPhoneError"
										>
										</VTextField>
									</VCol>
									<VCol cols="12" xl="6" md="6" sm="12">
										<VTextField
											label="Телефон одного з батьків"
											:prepend-icon="
												$vuetify.breakpoint.smAndDown ? '' : 'mdi-phone-outline'
											"
											:prepend-inner-icon="
												$vuetify.breakpoint.smAndDown ? 'mdi-phone-outline' : ''
											"
											outlined
											dense
											color="purple darken-1"
											return-masked-value
											v-mask="'+38 (###) ##-##-###'"
											hide-details="auto"
											v-model="entered.parent_phone"
											:error-messages="ParentPhoneError"
										>
										</VTextField>
									</VCol>
								</VRow>
								<VRow>
									<VCol cols="12" xl="5" md="5" sm="12">
										<VTextField
											:prepend-icon="
												$vuetify.breakpoint.smAndDown ? '' : 'mdi-id-card'
											"
											:prepend-inner-icon="
												$vuetify.breakpoint.smAndDown ? 'mdi-id-card' : ''
											"
											label="Номер паспорта/ID карти"
											outlined
											dense
											color="purple darken-1"
											return-masked-value
											v-mask="'#########'"
											hide-details="auto"
											v-model="entered.pass_id"
											:error-messages="PassIdError"
										>
										</VTextField>
									</VCol>
								</VRow>
								<VRow>
									<VCol cols="auto">
										<v-checkbox
											v-model="acceptPersonalData"
											label="Даю згоду на обробку моїх персональних даних"
											color="purple darken-1"
											hide-details
											:error-messages="acceptPersonalDataError"
											:indeterminate="!acceptPersonalData"
										></v-checkbox>
									</VCol>
								</VRow>
							</v-card-text>
							<VDivider />
							<VCardActions class="mb-5">
								<VRow justify="space-between">
									<VCol>
										<span
											:class="{ 'subtitle-2': $vuetify.breakpoint.xs }"
											class="font-weight-medium mr-1"
										>
											Ціна:</span
										>
										<span
											:class="{ 'subtitle-2': $vuetify.breakpoint.xs }"
											class="font-weight-bold success--text"
										>
											{{settings.price}} грн.</span
										>
									</VCol>

									<VCol cols="12" md="auto" sm="auto">
										<VBtn
											color="purple darken-1"
											class="white--text text-capitalize"
											dense
											@click="onClickSend"
											:disabled="disableBtn"
											:loading="disableBtn"
											:block="$vuetify.breakpoint.xs"
										>
											Подати заявку
										</VBtn>
									</VCol>
								</VRow>
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
import prepareCourseService from '@/request/prepareCourse/prepareCourseService';
import myHeader from '../UI/my-header.vue';
import SheduleInner from '../../Admin/shedule/SheduleInner.vue';
import { validationMixin } from 'vuelidate';
import { required, sameAs } from 'vuelidate/lib/validators';
import { invalid } from 'moment';
import entrantInfoService from '@/request/entrantInfo/entrantInfoService';
const validPhone = value => value.replace(/[^+\d]/g, '').length === 13;

export default {
	mixins: [validationMixin],
	components: { myHeader, SheduleInner },
	data: () => ({
		disableBtn: false,
		snackbar: false,
		loading: false,
		settings: {},
		activeTab: 0,
		entered: {
			surname: '',
			name: '',
			middle_name: '',
			student_phone: '',
			parent_phone: '',
			pass_id: '',
		},
		acceptPersonalData: false,
	}),
	validations: {
		entered: {
			surname: { required },
			name: { required },
			middle_name: { required },
			student_phone: { required, validPhone },
			parent_phone: { required, validPhone },
			pass_id: { required },
		},
		acceptPersonalData: { sameAs: sameAs(() => true) },
	},
	mounted() {
		const tabLocalStorage = window.localStorage.getItem('activeTabEntered');
		if (Number(tabLocalStorage)) {
			this.activeTab = Number(tabLocalStorage);
		}
		this.getEntrantInfo()
	},
	watch: {},
	methods: {
		changeTab() {
			window.localStorage.setItem('activeTabEntered', this.activeTab);
		},
		async getEntrantInfo(){
			let settings = await entrantInfoService.getAll()
			this.settings = settings[0]
			console.log(this.settings)
		},
		async onClickSend() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				try {
					this.disableBtn = true;
					await prepareCourseService.sendRequest({
						surname: this.entered.surname,
						name: this.entered.name,
						middle_name: this.entered.middle_name,
						student_phone: this.entered.student_phone,
						parent_phone: this.entered.parent_phone,
						pass_id: this.entered.pass_id,
					});
					this.$v.$reset();
					this.entered = {};
					this.acceptPersonalData = false;
					this.snackbar = true;
					this.disableBtn = false;
				} catch (e) {
					alert(e);
				}
			}
		},
	},
	computed: {
		NameError() {
			const errors = [];
			if (!this.$v.entered.name.$dirty) {
				return errors;
			}

			!this.$v.entered.name.required &&
				errors.push('Ім`я обов`язкове поле для заповнення');
			return errors;
		},
		SurnameError() {
			const errors = [];
			if (!this.$v.entered.surname.$dirty) {
				return errors;
			}

			!this.$v.entered.surname.required &&
				errors.push('Прізвище обов`язкове поле для заповнення');
			return errors;
		},
		MiddleNameError() {
			const errors = [];
			if (!this.$v.entered.middle_name.$dirty) {
				return errors;
			}

			!this.$v.entered.middle_name.required &&
				errors.push('По батькові обов`язкове поле для заповнення');
			return errors;
		},
		MiddleNameError() {
			const errors = [];
			if (!this.$v.entered.middle_name.$dirty) {
				return errors;
			}

			!this.$v.entered.middle_name.required &&
				errors.push('По батькові обов`язкове поле для заповнення');
			return errors;
		},
		StudentPhoneError() {
			const errors = [];
			if (!this.$v.entered.student_phone.$dirty) {
				return errors;
			}
			if (this.entered.student_phone) {
				if (!this.$v.entered.student_phone.validPhone) {
					errors.push('Телефон повинен бути валідним');
					return errors;
				}
			}
			!this.$v.entered.student_phone.required &&
				errors.push('Телефон учня обов`язкове поле для заповнення');
			return errors;
		},
		ParentPhoneError() {
			const errors = [];
			if (!this.$v.entered.parent_phone.$dirty) {
				return errors;
			}
			if (this.entered.parent_phone) {
				if (!this.$v.entered.parent_phone.validPhone) {
					errors.push('Телефон повинен бути валідним');
					return errors;
				}
			}
			!this.$v.entered.parent_phone.required &&
				errors.push('Телефон одного з батьків обов`язкове поле для заповнення');
			return errors;
		},
		PassIdError() {
			const errors = [];
			if (!this.$v.entered.pass_id.$dirty) {
				return errors;
			}
			!this.$v.entered.pass_id.required &&
				errors.push('Серія паспорта обов`язкове поле для заповнення');
			return errors;
		},
		acceptPersonalDataError() {
			const errors = [];
			if (!this.$v.acceptPersonalData.$dirty) {
				return errors;
			}
			!this.$v.acceptPersonalData.sameAs && errors.push(' ');
			return errors;
		},
	},
};
</script>

<style></style>
