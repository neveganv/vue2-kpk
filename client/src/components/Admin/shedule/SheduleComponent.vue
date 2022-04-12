<template>
	<div class="p-1">
		<VRow
			class="pt-4 py-2 pl-2"
			align="center"
			no-gutters
			justify-lg="space-between"
			justify-md="space-around"
			justify-sm="space-around"
		>
			<VCol cols="6">
				<VRow no-gutters>
					<VCol cols="5" sm="12" md="12" lg="5">
						<v-autocomplete
							rounded
							prepend-icon="mdi-account-multiple-plus"
							:items="Object.values(groups)"
							:item-value="'_id'"
							:item-text="'name'"
							v-model="chosenGroup"
							label="Виберіть групу"
							@change="changeGroup(chosenGroup)"
							outlined
							clearable
							dense
							sm
							ref="choseGroup"
							hide-details
							:menu-props="{ bottom: true, offsetY: true }"
						>
							<template #selection="{ item }">
								<v-chip small color="primary">{{ item.name }}</v-chip>
							</template></v-autocomplete
						>
					</VCol>

					<VRow
						align="center"
						v-if="chosenGroup"
						justify-md="center"
						justify="center"
					>
						<VCol cols="auto">
							<v-btn
								fab
								text
								small
								color="grey darken-2"
								@click="prev = Date.now()"
							>
								<v-icon small> mdi-chevron-left </v-icon>
							</v-btn>
						</VCol>

						<VCol cols="auto">
							<v-btn
								fab
								text
								small
								color="grey darken-2"
								@click="next = Date.now()"
							>
								<v-icon small> mdi-chevron-right </v-icon>
							</v-btn>
						</VCol>
						<VCol cols="auto">
							<v-toolbar-title v-if="calendarTitle">
								{{ calendarTitle || '--' }}
							</v-toolbar-title>
						</VCol>
					</VRow>
				</VRow>
			</VCol>
			<VCol cols="auto" lg="auto" md="12" sm="12">
				<VRow
					no-gutters
					class="mr-5"
					justify="end"
					justify-md="center"
					justify-sm="center"
				>
					<v-btn
						outlined
						rounded
						class="mr-4 my-1"
						color="grey darken-2"
						@click="setToday = Date.now()"
						v-if="chosenGroup"
					>
						Сьогодні
					</v-btn>

					<div cols="2" class="mr-5 my-1" v-if="chosenGroup">
						<v-menu bottom right   :offset-y="true">
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									outlined
									color="grey darken-2"
									rounded
									v-bind="attrs"
									v-on="on"
								>
									<span>{{ typeToLabel[type] }}</span>
									<v-icon right> mdi-menu-down </v-icon>
								</v-btn>
							</template>
							<v-list >
								<v-list-item @click="type = 'week'">
									<v-list-item-title>Тиждень</v-list-item-title>
								</v-list-item>
								<v-list-item @click="type = 'month'">
									<v-list-item-title>Місяць</v-list-item-title>
								</v-list-item>
								<v-list-item @click="type = 'day'">
									<v-list-item-title>День</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
					</div>

					<VBtn
						outlined
						color="deep-purple lighten-1"
						@click="visible = true"
						class="my-1 left-corner-btn"
					>
						<v-icon left> mdi-calendar-plus </v-icon>Додати подію
					</VBtn>
					<VBtn
						color="deep-purple lighten-1"
						class="my-1 right-corner-btn"
						elevation="0"
						@click="visibleDublicateDialog = true"
					>
						<v-icon dense color="white"> mdi-content-copy </v-icon>
					</VBtn>
				</VRow>
			</VCol>
		</VRow>

		<VRow v-show="chosenGroup">
			<VCol>
				<shedule-inner
					:type="type"
					:prev="prev"
					:next="next"
					:events="events"
					@editEvent="editEvent"
					@getDate="getDate"
					:setToday="setToday"
				/>
			</VCol>
		</VRow>
		<VRow
			v-if="!chosenGroup"
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
		<AddEventDialog
			:groups="groups"
			@addGroup="addGroup"
			@addEvent="addEvent"
			:visible="visible"
			@close="visible = false"
			v-if="visible"
		/>
		<EditEventDialog
			@updateEvent="updateEvent"
			@close="visibleEditEvent = false"
			:visible="visibleEditEvent"
			:chosenEvent="chosenEvent"
			v-if="visibleEditEvent"
		/>
		<dublicate-events-dialog
			v-if="visibleDublicateDialog"
			:visible="visibleDublicateDialog"
			@close="visibleDublicateDialog = false"
			:group="chosenGroup"
			@dublicateEvents="dublicateEvents"
		/>
	</div>
</template>

<script>
import groupService from '@/request/shedule/groupService';
import sheduleService from '@/request/shedule/sheduleService';
import SheduleInner from './SheduleInner.vue';
import AddEventDialog from './AddEventDialog.vue';
import EditEventDialog from './EditEventDialog.vue';
import loader from '@/mixins/loader';
import DublicateEventsDialog from './DublicateEventsDialog.vue';

export default {
	mixins: [loader],
	components: {
		SheduleInner,
		AddEventDialog,
		EditEventDialog,
DublicateEventsDialog,
	},
	watch: {
		type(e) {
			this.type = e;
			console.log(e);
		},
	},
	data: () => ({
		setToday: '',
		calendarTitle: '',
		events: [],
		prev: '',
		next: '',
		visible: false,
		chosenGroup: '',
		groups: [],
		chosenEvent: '',
		visibleEditEvent: false,
		type: 'week',
		typeToLabel: {
			month: 'Місяць',
			week: 'Тиждень',
			day: 'День',
		},
		visibleDublicateDialog:false
	}),
	watch: {
		chosenGroup(e) {
			this.changeGroup(e);
		},
	},
	methods: {
		onShowDublicateDialog(){
				
		},
		getDate(e) {
			this.calendarTitle = e;
		},
		editEvent(e) {
			this.visibleEditEvent = true;
			this.chosenEvent = e;
		},
		async changeGroup(e) {
			try {
				this.setLoading(true);
				const params = [];
				params.group = e;
				if (e) {
					let response = await sheduleService.getEvent({ ...params });
					this.events = response.result;
				}
				this.setLoading(false);
			} catch (e) {
				this.setLoading(false);
				console.log(e);
				alert(e);
			}
		},
		addGroup() {
			this.getGroups();
		},
		updateEvent(e) {
			this.visibleEditEvent = false;
			this.changeGroup(e);
		},
		dublicateEvents(e) {
			this.visibleDublicateDialog = false;
			this.changeGroup(e);
		},

		addEvent(e, group) {
			this.visible = false;
			this.chosenGroup = group;
			this.changeGroup(this.chosenGroup);
			console.log(e);
		},
		async getGroups() {
			try {
				this.setLoading(true);
				let response = await groupService.getAllGroups();
				this.groups = response.result;
				if (this.groups[0]) {
					this.changeGroup(this.groups[0]._id);
					this.chosenGroup = this.groups[0]._id;
				}
				this.setLoading(false);
			} catch (e) {
				console.log(e);
			}
		},
		showEvent({ nativeEvent, event }) {
			const open = () => {
				this.selectedEvent = event;
				this.selectedElement = nativeEvent.target;
				requestAnimationFrame(() =>
					requestAnimationFrame(() => (this.selectedOpen = true))
				);
			};

			if (this.selectedOpen) {
				this.selectedOpen = false;
				requestAnimationFrame(() => requestAnimationFrame(() => open()));
			} else {
				open();
			}

			nativeEvent.stopPropagation();
		},
		getEvents(e) {
			// console.log(e.event.link);
			// window.open(e.event.link);
		},
	},
	mounted() {
		this.getGroups();
	},
};
</script>

<style lang="scss" scoped>
.left-corner-btn {
	border-top-left-radius: 28px;
	border-bottom-left-radius: 28px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
}
.right-corner-btn {
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-top-right-radius: 28px;
	border-bottom-right-radius: 28px;
}
</style>
