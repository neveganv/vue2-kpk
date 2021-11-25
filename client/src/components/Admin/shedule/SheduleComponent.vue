<template>
	<div class="p-1">
		<VRow justify="end" class="p-1">
			<VBtn outlined color="primary" @click="visible = true">
				<v-icon left> mdi-calendar-plus </v-icon>Додати подію
			</VBtn>
		</VRow>
		<VRow>
			<VCol>
				<shedule-inner :events="events" />
			</VCol>
		</VRow>
		<AddEventDialog
			@addEvent="addEvent"
			:visible="visible"
			@close="visible = false"
		/>
	</div>
</template>

<script>
import SheduleInner from './SheduleInner.vue';
import AddEventDialog from './AddEventDialog.vue';
export default {
	components: {
		SheduleInner,
		AddEventDialog,
	},
	data: () => ({
		events: [
			{
				name: 'крута пара',
				start: '2021-11-25 09:00',
				end: '2021-11-25 10:00',
				link: 'https://classroom.google.com/u/1/c/Mzg4MTQzMTEzNDA4',
			},
		],
		visible: false,
	}),
	methods: {
		addEvent(e) {
			this.visible = false;
			this.events.push(e);
			console.log(this.events);
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
};
</script>

<style></style>
