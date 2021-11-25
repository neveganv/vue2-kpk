<template>
	<v-sheet height="750">
		<v-calendar
			ref="calendar"
			:value="today"
			:events="events"
			@click:event="showEvent"
			color="primary"
			:type="type"
			:short-weekdays="false"
			first-time="7:30"
			locale="uk-UA"
			:weekdays="[1, 2, 3, 4, 5, 6, 0]"
		></v-calendar>
		<v-menu
			v-model="selectedOpen"
			:close-on-content-click="false"
			:activator="selectedElement"
			offset-x
		>
			<v-card color="grey lighten-4" min-width="350px" flat>
				<v-toolbar color="primary" dark>
					<v-btn icon>
						<v-icon>mdi-pencil</v-icon>
					</v-btn>
					<v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
				</v-toolbar>
				<v-card-text>
					<VRow v-if="selectedEvent.start">
						<VCol cols="5">Початок пари:</VCol>
						<VCol
							><b> {{ selectedEvent.start.substr(10, 10) }}</b></VCol
						>
					</VRow>
					<VRow v-if="selectedEvent.end">
						<VCol cols="5">Кінець пари:</VCol>
						<VCol
							><b> {{ selectedEvent.end.substr(10, 10) }}</b></VCol
						>
					</VRow>
					<VRow>
						<VCol>
							<p v-if="selectedEvent.content">{{ selectedEvent.content }}</p>
						</VCol>
					</VRow>
					<VRow>
						<VCol>
							<VBtn
								:href="selectedEvent.link"
								outlined
								target="blank"
								color="primary"
								v-if="selectedEvent.link"
							>
								<VIcon left>mdi-link </VIcon> Посилання
							</VBtn>
						</VCol>
					</VRow>
				</v-card-text>
			</v-card>
		</v-menu>
	</v-sheet>
</template>

<script>
export default {
	props: {
		events: {
			require: true,
		},
		type: {
			require: false,
		},
		next: {
			require: false,
		},
		prev: {
			require: false,
		},
	},
	watch: {
		next: {
			deep: true,
			handler() {
				this.$refs.calendar.next();
			},
		},
		prev: {
			deep: true,
			handler() {
				this.$refs.calendar.prev();
			},
		},
	},
	data: () => ({
		selectedEvent: {},
		selectedElement: null,
		selectedOpen: false,
		today: new Date().toISOString().substr(0, 10),
	}),
	methods: {
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
		},
	},
	mounted() {},
};
</script>

<style></style>
