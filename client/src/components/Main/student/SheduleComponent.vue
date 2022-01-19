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
				<VCol cols="12" lg="auto" md="auto" sm="12">
					<VRow align="center" v-if="chosenGroup" no-gutters>
						<VCol  cols="12" md="auto" xl="auto" lg="auto"  sm="12">
							<VCardTitle :class="{'pb-0' : $vuetify.breakpoint.smAndDown}">
								<VIcon left color="grey darken-2" dense> mdi-calendar </VIcon>
								<span class="grey--text text--darken-2"> Розклад занять </span>
							</VCardTitle>
							<VDivider v-if="$vuetify.breakpoint.smAndDown" />
						</VCol>
						<VCol cols="12" md="auto" xl="auto" lg="auto"  sm="12" class="my-3 text-center">
							<VRow no-gutters aling="center">
								<VCol cols="auto">
									<v-btn
										icon
										small
										color="grey darken-2"
										@click="prev = Date.now()"
									>
										<v-icon small> mdi-chevron-left </v-icon>
									</v-btn>
								</VCol>
								<VCol cols="auto">
									<v-toolbar-title v-if="calendarTitle">
										{{ calendarTitle || '--' }}
									</v-toolbar-title>
								</VCol>
								<VCol cols="auto">
									<v-btn
										icon
										small
										color="grey darken-2"
										@click="next = Date.now()"
									>
										<v-icon small> mdi-chevron-right </v-icon>
									</v-btn>
								</VCol>
							</VRow>
						</VCol>
						
					</VRow>
						<VDivider v-if="$vuetify.breakpoint.smAndDown"  class="pb-2"/>
				</VCol>
				<VCol cols="12" lg="auto" md="auto" sm="12">
					<VRow no-gutters justify="end" align="center">
						<VCol cols="4" lg="auto" md="auto" sm="4">
							<v-btn
								outlined
								class="mr-4 my-1"
								color="grey darken-2"
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
		chosenGroup: '',
		groups: [],
		events: [],
		setToday: '',
		calendarTitle: '',
		events: [],
		prev: '',
		next: '',
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
			this.changeGroup(e);
		},
	},
	computed: {
		getCalendarType() {
			if (this.$vuetify.breakpoint.smAndDown) {
				return 'day';
			} else {
				return 'week';
			}
		},
	},
	methods: {
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

<style></style>
