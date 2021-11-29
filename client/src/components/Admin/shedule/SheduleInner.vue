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
		>
			<template v-slot:day-body="{ date, week }">
				<div
					class="v-current-time"
					:class="{ first: date === week[0].date }"
					:style="{ top: nowY }"
				></div> </template
		></v-calendar>
		<v-menu
			v-model="selectedOpen"
			:close-on-content-click="false"
			:activator="selectedElement"
			offset-x
		>
			<v-card color="grey lighten-4" min-width="350px" flat>
				<v-toolbar :color="selectedEvent.color" dark>
					<v-btn icon>
						<v-icon>mdi-pencil</v-icon>
					</v-btn>
					<v-toolbar-title v-if="selectedEvent.name" v-html="selectedEvent.name"></v-toolbar-title>
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
					<VRow v-if="selectedEvent.link">
						<VCol>
							<VBtn
								:href="selectedEvent.link"
								outlined
								target="blank"
								:color="selectedEvent.color"
								
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
		value: '',
		ready: false,
		selectedEvent: {},
		selectedElement: null,
		selectedOpen: false,
		today: new Date().toISOString().substr(0, 10),
	}),
	methods: {
		test() {
			console.log(this.$refs);
			this.$refs.calendar.prev();
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
		},
		getCurrentTime() {
			return this.cal
				? this.cal.times.now.hour * 60 + this.cal.times.now.minute
				: 0;
		},
		scrollToTime() {
			const time = this.getCurrentTime();
			const first = Math.max(0, time - (time % 30) - 30);

			this.cal.scrollToTime(first);
		},
		updateTime() {
			setInterval(() => this.cal.updateTimes(), 60 * 1000);
		},
	},
	computed: {
		cal() {
			return this.ready ? this.$refs.calendar : null;
		},
		nowY() {
			return this.cal ? this.cal.timeToY(this.cal.times.now) + 'px' : '-10px';
		},
	},
	mounted() {
		this.ready = true;
		this.scrollToTime();
		this.updateTime();
		this.$refs.calendar.checkChange();
	},
};
</script>

<style lang="scss">
.v-current-time {
	height: 2px;
	background-color: #ea4335;
	position: absolute;
	left: -1px;
	right: 0;
	pointer-events: none;

	&.first::before {
		content: '';
		position: absolute;
		background-color: #ea4335;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		margin-top: -5px;
		margin-left: -6.5px;
	}
}
</style>
