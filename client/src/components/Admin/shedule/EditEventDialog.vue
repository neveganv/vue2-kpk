<template>
	<VDialog v-model="visibility">
		<VCard>
			<VCardTitle> Оновлення Події </VCardTitle>
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
							clearable
							dense
							:color="event.name ? event.name.color : 'primary'"
						>
							<template #selection="{ item }">
								<v-chip small :color="item.name ? item.color : 'primary'">{{
									item.name
								}}</v-chip>
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
				<v-btn color="primary" @click="onUpdate"> Оновити </v-btn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, url } from 'vuelidate/lib/validators';
import sheduleService from '@/request/shedule/sheduleService';
import classService from '@/request/shedule/classService';
export default {
	mixins: [validationMixin],

	validations: {
		event: {
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
		chosenEvent: {
			require: true,
		},
	},
	mounted() {
		this.getClasses();
		this.getEvent();
	},
	data: () => ({
		menu: false,
		menu2: false,
		menu3: false,
		menu4: false,
		event: [],
		classes: [],
	}),
	methods: {
		async getEvent() {
			try {
				const newEvent = await sheduleService.getEventById({
					id: this.chosenEvent,
				});
				console.log(newEvent);
				this.event = {
					link: newEvent.link,
					start_date: newEvent.start.substr(0, 10),
					start_time: newEvent.start.substr(11, 5),
					end_time: newEvent.end.substr(11, 5),
					content: newEvent.content,
					name: newEvent.name,
					group: newEvent.group,
				};
				console.log(this.event);
			} catch (e) {
				alert(e);
			}
		},
		async getClasses() {
			try {
				const newclasses = await classService.getAllClasses();
				this.classes = newclasses;
			} catch (e) {
				alert(e);
			}
		},
		async onUpdate() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				try {
					const params = {};
					params.class = this.event.name.name;
					params.classId = this.event.name._id;
					params.group = this.event.group;
					if (this.event.link) {
						params.link = this.event.link;
					}
					else{
						params.link = null
					}
					params.color = this.event.name.color;
					if (this.event.content) {
						params.content = this.event.content;
					}else{
						params.content = null
					}
					params.start = `${
						this.event.start_date + ' ' + this.event.start_time
					}`;
					params.end = `${this.event.start_date + ' ' + this.event.end_time}`;

					await sheduleService.updateEvent({ id: this.chosenEvent, ...params });
					this.$emit('updateEvent', params.group);
					this.$v.$reset();
				} catch (e) {
					alert(e);
				}
			}
		},
		async onCancel() {
			this.$emit('close');
			this.$v.$reset();
			this.event = [];
		},
	},
	computed: {
		visibility: {
			get() {
				return this.visible;
			},
			set() {
				this.$emit('close');
			},
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
			!this.$v.event.start_time.required && errors.push('');
			return errors;
		},

		EndTimeError() {
			const errors = [];
			if (!this.$v.event.end_time.$dirty) {
				return errors;
			}
			!this.$v.event.end_time.required && errors.push('');
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
