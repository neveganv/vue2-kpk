<template>
	<div class="p-1">
		<VRow justify="space-between" class="pt-4 p-1">
			<VCol cols="4">
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
					ref="choseGroup"
					hide-details
				>
					<template #selection="{ item }">
						<v-chip small color="primary">{{ item.name }}</v-chip>
					</template></v-select
				>
			</VCol>
			<VBtn outlined color="primary" @click="visible = true">
				<v-icon left> mdi-calendar-plus </v-icon>Додати подію
			</VBtn>
		</VRow>
		<VRow v-if="chosenGroup">
			<VCol>
				<shedule-inner :events="events" />
			</VCol>
		</VRow>
		<VRow v-else justify="center" align="center" style="height: 20vh">
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
	data: () => ({
		events: [],
		visible: false,
		chosenGroup: '',
		groups: [],
	}),
	methods: {
		async changeGroup(e) {
			try {
				const params = [];
				params.group = e;
				this.events = await sheduleService.getEvent({ ...params });
				console.log(this.events);
			} catch (e) {
				alert(e);
			}
		},
		addGroup() {
			this.getGroups();
		},
		addEvent(e) {
			this.visible = false;
			this.events.push(e);
			this.chosenGroup = e.group;
			console.log(e);
			console.log(this.events);
		},
		async getGroups() {
			try {
				this.groups = await groupService.getAllGroups();
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
			console.log(e.event.link);
			// window.open(e.event.link);
		},
	},
	mounted() {
		this.getGroups();
	},
};
</script>

<style></style>
