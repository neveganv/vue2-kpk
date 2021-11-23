<template>
	<div class="p-1">
		тут я тестую календарик, закрий цю сторінку пліз
		<v-row>
			<v-col>
				<v-sheet height="750">
					<v-calendar
						ref="calendar"
						:now="today"
						:value="today"
						:events="events"
						@click:event="showEvent"
						color="primary"
						type="week"
						:short-weekdays="true"
						first-time="7:30"
						last-time="19:30"
						locale="uk-UA"
						:weekdays="[1, 2, 3, 4, 5, 6, 7]"
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
								<p>тіпа крута пара тикни на неї</p>

								<VBtn :href="selectedEvent.link" target="blank" color="primary"> Тут посилання </VBtn>
							</v-card-text>
							<v-card-actions>
								<v-btn text color="error darken-1" @click="selectedOpen = false">
									Назад
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-menu>
				</v-sheet>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	data: () => ({
		selectedEvent: {},
		selectedElement: null,
		selectedOpen: false,
		today: '2019-01-08',
		events: [
			{
				name: 'крута пара',
				start: '2019-01-07 09:00',
				end: '2019-01-07 10:00',
				link: 'https://classroom.google.com/u/1/c/Mzg4MTQzMTEzNDA4',
			},
			{
				name: `Ще крутіша пара`,
				start: '2019-01-08 8:30',
				end: '2019-01-08 9:50',
				link: 'https://classroom.google.com/u/1/c/Mzg4MTQzMTEzNDA4',
			},
			{
				name: `Ще крутіша пара`,
				start: '2019-01-08 10:00',
				end: '2019-01-08 11:20',
				link: 'https://classroom.google.com/u/1/c/Mzg4MTQzMTEzNDA4',
			},
			{
				name: 'Я красавчик',
				start: '2019-01-08 11:50',
				end: '2019-01-08 13:10',
				link: 'https://classroom.google.com/u/1/c/Mzg4MTQzMTEzNDA4',
			},
			{
				name: 'Тут лінк',
				start: '2019-01-09 13:50',
				end: '2019-01-09 14:40',
				link: 'https://classroom.google.com/u/1/c/Mzg4MTQzMTEzNDA4',
			},
		],
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
			// window.open(e.event.link);
		},
	},
	mounted() {
		this.$refs.calendar.scrollToTime('08:00');
	},
};
</script>

<style></style>
