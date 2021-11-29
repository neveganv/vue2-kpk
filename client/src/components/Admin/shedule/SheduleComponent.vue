<template>
	<div class="p-1">
		<VRow class="pt-4 p-2">
			<div class="d-flex">
				<VCol :cols="chosenGroup ? 6 : 12">
					<v-select
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
					>
						<template #selection="{ item }">
							<v-chip small color="primary">{{ item.name }}</v-chip>
						</template></v-select
					>
				</VCol>

				<VCol col="3" class="d-flex" v-if="chosenGroup">
					<v-btn
						fab
						text
						small
						color="grey darken-2"
						@click="prev = Date.now()"
					>
						<v-icon small> mdi-chevron-left </v-icon>
					</v-btn>
					<v-btn
						fab
						text
						small
						color="grey darken-2"
						@click="next = Date.now()"
					>
						<v-icon small> mdi-chevron-right </v-icon>
					</v-btn>
					<v-toolbar-title v-if="$refs.calendar">
						{{ $refs.calendar.title }}
					</v-toolbar-title>
				</VCol>
			</div>

			<div class="ml-auto d-flex">
				<VCol cols="5" v-if="chosenGroup">
					<v-menu bottom right>
						<template v-slot:activator="{ on, attrs }">
							<v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
								<span>{{ typeToLabel[type] }}</span>
								<v-icon right> mdi-menu-down </v-icon>
							</v-btn>
						</template>
						<v-list>
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
				</VCol>
				<VCol cols="6">
					<VBtn outlined color="primary" @click="visible = true">
						<v-icon left> mdi-calendar-plus </v-icon>Додати подію
					</VBtn>
				</VCol>
			</div>
		</VRow>

		<VRow v-show="chosenGroup">
			<VCol>
				<shedule-inner
					:type="type"
					:prev="prev"
					:next="next"
					:events="events"
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
	</div>
</template>

<script>
import groupService from '@/request/shedule/groupService';
import sheduleService from '@/request/shedule/sheduleService';
import SheduleInner from './SheduleInner.vue';
import AddEventDialog from './AddEventDialog.vue';
export default {
	components: {
		SheduleInner,
		AddEventDialog,
	},
	watch: {
		type(e) {
			this.type = e;
			console.log(e);
		},
	},
	data: () => ({
		events: [],
		prev: '',
		next: '',
		visible: false,
		chosenGroup: '',
		groups: [],
		type: 'week',
		typeToLabel: {
			month: 'Місяць',
			week: 'Тиждень',
			day: 'День',
		},
	}),
	watch: {
		chosenGroup(e) {
			console.log(e);
			this.changeGroup(e);
		},
	},
	methods: {
		async changeGroup(e) {
			try {
				console.log(e);
				const params = [];
				params.group = e;
				this.events = await sheduleService.getEvent({ ...params });
			} catch (e) {
				alert(e);
			}
		},
		addGroup() {
			this.getGroups();
		},
		addEvent(e) {
			this.visible = false;
			console.log(e);
			this.chosenGroup = e;

			console.log(e);
		},
		async getGroups() {
			try {
				this.groups = await groupService.getAllGroups();
				this.changeGroup(this.groups[0]._id);
				this.chosenGroup = this.groups[0]._id;
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

<style></style>
