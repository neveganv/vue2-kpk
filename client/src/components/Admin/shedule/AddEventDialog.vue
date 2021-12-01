<template>
	<VDialog v-model="visibility" @click:outside="outsideClick">
		<VCard width="700">
			<v-stepper v-model="e1">
				<v-stepper-header>
					<v-stepper-step :complete="e1 > 1" step="1" v-if="!event.group">
						Оберіть групу
					</v-stepper-step>
					<v-stepper-step editable :complete="e1 > 1" step="1" v-else>
						{{ tmpGroup }}
					</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step :complete="e1 > 2" step="2">
						Дані в події
					</v-stepper-step>
				</v-stepper-header>
				<v-stepper-items>
					<v-stepper-content step="1">
						<VCard class="p-3 pb-0 pr-0" elevation="0">
							<VCardText>
								<VRow>
									<VCol cols="6">
										<v-select
											prepend-icon="mdi-account-multiple-plus"
											:items="Object.values(groups)"
											:item-value="'_id'"
											:item-text="'name'"
											v-model="event.group"
											label="Виберіть групу"
											:error-messages="GroupError"
											:hide-details="!GroupError.length"
											outlined
											clearable
											dense
										>
											<template #selection="{ item }">
												<v-chip small color="primary">{{
													(tmpGroup = item.name)
												}}</v-chip>
											</template></v-select
										>
									</VCol>
									<VCol cols="6">
										<VBtn text color="primary" @click="visibleAddGroup = true">
											<VIcon left>mdi-plus</VIcon>Додати нову групу</VBtn
										>
									</VCol>
								</VRow>
							</VCardText>
							<VCardActions>
								<VSpacer />
								<v-btn color="primary" @click="stepToSecond">
									Продовжити
								</v-btn>
							</VCardActions>
						</VCard>
					</v-stepper-content>

					<v-stepper-content step="2">
						<VCard class="p-3 pb-0 pr-0" elevation="0" v-if="e1 == 2">
							<VCardText>
								<VRow>
									<VCol cols="6">
										<v-select
											prepend-icon="mdi-account-multiple-plus"
											:items="Object.values(classes)"
											return-object
											:item-text="'name'"
											v-model="event.name"
											label="Назва пари"
											:error-messages="NameError"
											:hide-details="!NameError.length"
											outlined
											@change="changeClass"
											clearable
											dense
											:color="event.name ? event.name.color : 'primary'"
										>
											<template #selection="{ item }">
												<v-chip
													small
													:color="item.name ? item.color : 'primary'"
													>{{ item.name }}</v-chip
												>
											</template></v-select
										>
									</VCol>
									<VCol cols="6">
										<VBtn text color="primary" @click="visibleAddClass = true">
											<VIcon left>mdi-plus</VIcon>Додати нову пару</VBtn
										>
									</VCol>
								</VRow>
								<VRow>
									<VCol>
										<VTextField
											label="Посилання на пару"
											prepend-icon="mdi-link-plus"
											outlined
											dense
											:hide-details="!LinkError.length"
											v-model="event.link"
											:error-messages="LinkError"
										>
										</VTextField>
									</VCol>
								</VRow>
								<v-subheader>Дата і час початкута кінця</v-subheader>
								<VRow align="center">
									<VCol cols="6">
										<v-menu
											v-model="menu"
											:close-on-content-click="false"
											:nudge-right="40"
											transition="scale-transition"
											offset-y
											min-width="auto"
										>
											<template v-slot:activator="{ on, attrs }">
												<v-text-field
													v-model="event.start_date"
													label="Дата"
													prepend-icon="mdi-calendar"
													readonly
													v-bind="attrs"
													v-on="on"
													outlined
													dense
													hide-details
													:error-messages="StartDateError"
												></v-text-field>
											</template>
											<v-date-picker
												v-model="event.start_date"
												locale="uk-UA"
												@input="menu = false"
											></v-date-picker>
										</v-menu>
									</VCol>
									<VCol><VIcon>mdi-clock-time-four-outline</VIcon></VCol>
									<VCol cols="2">
										<v-menu
											ref="menu1"
											v-model="menu2"
											:close-on-content-click="false"
											:nudge-right="40"
											:return-value.sync="event.start_time"
											transition="scale-transition"
											offset-y
											max-width="290px"
											min-width="290px"
										>
											<template v-slot:activator="{ on, attrs }">
												<v-text-field
													v-model="event.start_time"
													label="Початок"
													readonly
													v-bind="attrs"
													v-on="on"
													dense
													
													hide-details
													:error-messages="StartTimeError"
												></v-text-field>
											</template>
											<v-time-picker
												v-if="menu2"
												v-model="event.start_time"
												full-width
												@click:minute="$refs.menu1.save(event.start_time)"
											></v-time-picker> </v-menu
									></VCol>
									<VCol><VIcon>mdi-minus</VIcon></VCol>
											<VCol cols="2">
										<v-menu
											ref="menu2"
											v-model="menu4"
											:close-on-content-click="false"
											:nudge-right="40"
											:return-value.sync="event.end_time"
											transition="scale-transition"
											offset-y
											max-width="290px"
											min-width="290px"
										>
											<template v-slot:activator="{ on, attrs }">
												<v-text-field
													v-model="event.end_time"
													label="Кінець"
													readonly
													v-bind="attrs"
													v-on="on"
													dense
													
													hide-details
													:error-messages="EndTimeError"
												></v-text-field>
											</template>
											<v-time-picker
												v-if="menu4"
												v-model="event.end_time"
												full-width
												@click:minute="$refs.menu2.save(event.end_time)"
											></v-time-picker> </v-menu
									></VCol>
								</VRow>

								<VRow>
									<VCol>
										<v-textarea
											prepend-icon="mdi-information"
											v-model="event.content"
											label="Додаткова інформація"
											counter
											no-resize
											rows="3"
											maxlength="150"
											outlined
										></v-textarea>
									</VCol>
								</VRow>
							</VCardText>
							<VCardActions>
								<VSpacer />
								<v-btn color="error" text @click="onCancel"> Скасувати </v-btn>
								<v-btn color="primary" @click="onCreate"> Додати </v-btn>
							</VCardActions>
						</VCard>
					</v-stepper-content>
				</v-stepper-items>
			</v-stepper>
		</VCard>
		<add-group-dialog
			@addGroup="addGroup"
			:visible="visibleAddGroup"
			@close="visibleAddGroup = false"
		/>
		<add-class-dialog
			@addClass="addClass"
			:visible="visibleAddClass"
			@close="visibleAddClass = false"
		/>
	</VDialog>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, url } from 'vuelidate/lib/validators';
import AddGroupDialog from './AddGroupDialog.vue';
import AddClassDialog from './AddClassDialog.vue';
import classService from '@/request/shedule/classService';
import sheduleService from '@/request/shedule/sheduleService';

export default {
	components: { AddGroupDialog, AddClassDialog },
	mixins: [validationMixin],
	data: () => ({
		e1: 1,
		menu: false,
		menu2: false,
		menu3: false,
		menu4: false,
		visibleAddGroup: false,
		visibleAddClass: false,
		tmpGroup: '',
		colors: [
			'blue',
			'indigo',
			'deep-purple',
			'cyan',
			'light-green',
			'green',
			'green darken-1',
			'amber accent-3',
			'deep-orange lighten-2',
			'blue-grey',
			'orange',
			'grey darken-1',
		],

		classes: [],
		event: [],
	}),
	mounted() {
		this.getClasses();
	},
	methods: {
		changeClass(e) {},
		addGroup(e) {
			this.visibleAddGroup = false;
			this.$emit('addGroup', e);
		},
		addClass(e) {
			this.event.name = e;
			this.visibleAddClass = false;
			this.getClasses();
		},
		stepToSecond() {
			this.$v.event.group.$touch();
			if (!this.$v.event.group.$invalid) {
				this.e1 = 2;
			}
		},
		onCreate() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				try {
					const params = {};
					params.class = this.event.name.name;
					params.group = this.event.group;
					if (this.event.link) {
						params.link = this.event.link;
					}
					params.color = this.event.name.color;
					if (this.event.content) {
						params.content = this.event.content;
					}
					params.start = `${
						this.event.start_date + ' ' + this.event.start_time
					}`;
					params.end = `${this.event.start_date + ' ' + this.event.end_time}`;

					sheduleService.createEvent({
						...params,
					});
					this.$emit('addEvent', params.group);
					this.$v.$reset();
					this.e1 = 1;
					this.event = [];
				} catch (e) {
					alert(e);
				}
			}
		},
		rnd(a, b) {
			return Math.floor((b - a + 1) * Math.random()) + a;
		},
		onCancel() {
			this.event = [];
			this.$v.$reset();
			this.$emit('close');
			this.e1 = 1;
		},
		outsideClick() {
			this.$v.$reset();
			this.e1 = 1;
			this.event = [];
		},
		async getClasses() {
			try {
				const newclasses = await classService.getAllClasses();
				this.classes = newclasses;
			} catch (e) {
				alert(e);
			}
		},
	},
	validations: {
		event: {
			group: {
				required,
			},
			name: {
				required,
			},
			link: {
				url,
			},
			start_date: {
				required,
			},
			start_time: {
				required,
			},
			end_time: {
				required,
			},
		
		},
	},
	props: {
		visible: {
			require: true,
		},
		groups: {
			require: true,
		},
	},
	computed: {
		watchGroup() {
			return this.event.group;
		},
		visibility: {
			get() {
				return this.visible;
			},
			set() {
				this.$emit('close');
			},
		},
		GroupError() {
			const errors = [];
			if (!this.$v.event.group.$dirty) {
				return errors;
			}
			!this.$v.event.group.required &&
				errors.push('Група обов`язкове поле для заповнення');
			return errors;
		},
		NameError() {
			const errors = [];
			if (!this.$v.event.name.$dirty) {
				return errors;
			}
			!this.$v.event.name.required &&
				errors.push('Назва пари обов`язкове поле для заповнення');
			return errors;
		},
		StartDateError() {
			const errors = [];
			if (!this.$v.event.start_date.$dirty) {
				return errors;
			}
			!this.$v.event.start_date.required &&
				errors.push('Дата обов`язкове поле для заповнення');
			return errors;
		},
		StartTimeError() {
			const errors = [];
			if (!this.$v.event.start_time.$dirty) {
				return errors;
			}
			!this.$v.event.start_time.required &&
				errors.push('');
			return errors;
		},
	
		EndTimeError() {
			const errors = [];
			if (!this.$v.event.end_time.$dirty) {
				return errors;
			}
			!this.$v.event.end_time.required &&
				errors.push('');
			return errors;
		},
		LinkError() {
			const errors = [];
			if (!this.$v.event.link.$dirty) {
				return errors;
			}
			if (this.event.link) {
				!this.$v.event.link.url &&
					errors.push('Посилання повинне бути валідним');
				return errors;
			}
			return errors;
		},
	},
};
</script>

<style></style>
