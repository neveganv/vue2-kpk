<template>
	<div class="p-1">
		тут я тестую календарик, закрий цю сторінку пліз
		<v-row>
			<v-col>
				<v-sheet height="800">
					<v-calendar
						ref="calendar"
						:now="today"
						:value="today"
						:events="events"
						@click:event="getEvents"
						color="primary"
						type="week"
						:weekdays="[1, 2, 3, 4, 5, 6, 7]"
					></v-calendar>
				</v-sheet>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	data: () => ({
		today: '2019-01-08',
		events: [
			{
				name: 'ВІка лошара',
				start: '2019-01-07 09:00',
				end: '2019-01-07 10:00',
				
			},
			{
				name: `Андрій тоже`,
				start: '2019-01-08 10:30',
				end: '2019-01-08 15:30',
			},
			{
				name: 'Я красавчик',
				start: '2019-01-09 12:30',
				end: '2019-01-09 12:50',
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
		getEvents(e) {
			console.log(e.event.link);
			window.open(e.event.link);
		},
	},
	mounted() {
		this.$refs.calendar.scrollToTime('08:00');
	},
};
</script>

<style></style>
