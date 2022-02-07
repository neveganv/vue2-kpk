<template>
	<div>
		<my-header
			@onBurger="onBurger"
			:navigationRight="navigationRight"
			menu="true"
		/>
		<div class="my-container small">
			<VRow
				class="content mt-5"
				no-gutters
				align="center"
				justify="space-between"
			>
				<VCol cols="12" lg="auto" md="auto" sm="12">
					<VRow align="center" v-if="chosenGroup" no-gutters>
						<VCol cols="12" md="auto" xl="auto" lg="auto" sm="12">
							<VCardTitle :class="{ 'py-0': $vuetify.breakpoint.smAndDown }">
								<VIcon
									left
									color="grey darken-2"
									dense
									v-if="!$vuetify.breakpoint.smAndDown"
								>
									mdi-calendar
								</VIcon>
								<span class="grey--text text--darken-2 mx-auto">
									Розклад занять
								</span>
							</VCardTitle>
							<VDivider v-if="$vuetify.breakpoint.smAndDown" />
						</VCol>
						<VCol
							cols="12"
							md="auto"
							xl="auto"
							lg="auto"
							sm="12"
							class="my-3 text-center"
						>
							<VRow no-gutters aling="center" justify="space-between">
								<VCol cols="3" xl="auto" lg="auto" md="auto" sm="4">
									<v-btn
										:icon="!$vuetify.breakpoint.smAndDown"
										:small="!$vuetify.breakpoint.smAndDown"
										color="#7961B6"
										:outlined="$vuetify.breakpoint.smAndDown"
										:block="$vuetify.breakpoint.smAndDown"
										@click="prev = Date.now()"
									>
										<v-icon small> mdi-chevron-left </v-icon>
									</v-btn>
								</VCol>
								<VCol cols="auto" class="d-flex align-center mx-1">
									<span v-if="calendarTitle">
										{{
											moment(calendarTitle).locale('uk').format(titleFormat) ||
											'--'
										}}
									</span>
								</VCol>
								<VCol cols="3" xl="auto" lg="auto" md="auto" sm="4">
									<v-btn
										:icon="!$vuetify.breakpoint.smAndDown"
										:small="!$vuetify.breakpoint.smAndDown"
										color="#7961B6"
										:outlined="$vuetify.breakpoint.smAndDown"
										:block="$vuetify.breakpoint.smAndDown"
										@click="next = Date.now()"
									>
										<v-icon small> mdi-chevron-right </v-icon>
									</v-btn>
								</VCol>
							</VRow>
						</VCol>
					</VRow>
					<VDivider v-if="$vuetify.breakpoint.smAndDown" class="pb-2" />
				</VCol>
				<VCol cols="12" lg="5" md="5" sm="12">
					<VRow no-gutters justify="end" align="center">
						<VCol cols="4" lg="auto" md="auto" sm="4">
							<v-btn
								outlined
								class="mr-4 my-1"
								color="grey darken-1"
								@click="setToday = Date.now()"
								v-if="chosenGroup"
							>
								<div v-if="!$vuetify.breakpoint.xs">Сьогодні</div>
								<VIcon v-if="$vuetify.breakpoint.xs">
									mdi-calendar-today
								</VIcon>
							</v-btn>
						</VCol>
						<VCol cols="8" xl="5" md="5" sm="8">
							<VSelect
								ref="choseGroup"
								outlined
								small-ships
								label="Оберіть свою групу"
								dense
								hide-details="auto"
								:menu-props="{ bottom: true, offsetY: true }"
								v-model="chosenGroup"
								:items="Object.values(groups)"
								:item-value="'_id'"
								:item-text="'name'"
								:loading="loading"
								:disabled="loading"
								color="#7961B6"
							/>
						</VCol>
					</VRow>
				</VCol>
			</VRow>
			<VDivider class="mb-5 mt-1" />
			<v-fade-transition>
				<VRow v-if="chosenGroup && !loading">
					<VCol>
						<shedule-inner
							:type="getCalendarType"
							:prev="prev"
							:next="next"
							:events="events"
							@getDate="getDate"
							:setToday="setToday"
							:userType="'client'"
						/>
					</VCol>
				</VRow>
			</v-fade-transition>
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
			<VRow
				v-if="!chosenGroup && !loading"
				justify="center"
				align="center"
				style="height: 20vh"
			>
				<VBtn
					text
					color="error"
					@click="
						$refs.choseGroup.focus();
						$refs.choseGroup.activateMenu();
					"
				>
					Виберіть групу</VBtn
				>
			</VRow>
		</div>
		<div class="main-navigation-right">
			<right-navigation
				@onBurgerNav="onBurgerNav"
				:navigationRight="navigationRight"
			/>
		</div>
	</div>
</template>

<script>
import sheduleService from '@/request/shedule/sheduleService';
import groupService from '@/request/shedule/groupService';
import myHeader from '../UI/my-header.vue';
import SheduleInner from '../../Admin/shedule/SheduleInner.vue';
import RightNavigation from '../UI/RightNavigation.vue';

export default {
	components: { myHeader, SheduleInner, RightNavigation },
	data: () => ({
		chosenGroup: '',
		groups: [],
		events: [],
		setToday: '',
		calendarTitle: '',
		events: [],
		prev: '',
		next: '',
		navigationRight: '',
		typeToLabel: {
			month: 'Місяць',
			week: 'Тиждень',
			day: 'День',
		},
		loading: true,
	}),
	mounted() {
		this.getGroups();
	},
	watch: {
		chosenGroup(e) {
			this.$router.push({ query: { group: e } }).catch(() => {});

			this.changeGroup(e);
		},
	},
	computed: {
		titleFormat() {
			if (!this.$vuetify.breakpoint.smAndDown) {
				return 'MMMM YYYY';
			} else {
				return 'LL';
			}
		},
		getCalendarType() {
			if (this.$vuetify.breakpoint.smAndDown) {
				return 'day';
			} else {
				return 'week';
			}
		},
	},
	methods: {
		onBurgerNav(e) {
			this.navigationRight = e;
		},
		onBurger() {
			this.navigationRight = !this.navigationRight;
		},
		getDate(e) {
			this.calendarTitle = e;
		},
		async getGroups() {
			try {
				this.loading = true;
				this.groups = await groupService.getAllGroups();

				const lsGroup = window.localStorage.getItem('kpkChosenGroup');
				if (lsGroup) {
					this.chosenGroup = lsGroup;
				}
				if (this.$route.query.group) {
					this.chosenGroup = this.$route.query.group;
				}
				this.loading = false;
			} catch (e) {
				this.loading = false;

				console.log(e);
			}
		},
		async changeGroup(e) {
			try {
				this.loading = true;
				const params = [];
				params.group = e;
				window.localStorage.setItem('kpkChosenGroup', e);
				this.events = await sheduleService.getEvent({ ...params });
				this.loading = false;
			} catch (e) {
				this.loading = false;
				alert(e);
			}
		},
	},
};
</script>

<style>
</style>
