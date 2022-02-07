<template>
	<v-sheet :height="userType === 'client' ? 600 : 750" class="calendar">
		<v-snackbar
			v-model="isShowCopied"
			top
			:color="selectedEvent.color"
			rounded
			elevation="4"
			:timeout="2000"
		>
			Посилання скопійовано успішно <br />
		</v-snackbar>
		<v-snackbar
			v-model="isShowError"
			top
			color="error"
			rounded
			elevation="4"
			:timeout="2000"
		>
			Помилка копіювання <br />
		</v-snackbar>
		<v-calendar
			ref="calendar"
			:value="today"
			:events="events"
			@click:event="showEvent"
			color="primary"
			:type="type"
			:short-weekdays="false"
			first-time="6:30"
			locale="uk-UA"
			:weekdays="[1, 2, 3, 4, 5, 6, 0]"
			v-model="focus"
			:class="
				userType === 'client' && $vuetify.breakpoint.smAndDown
					? 'hide-header'
					: ''
			"
		>
			<template v-slot:day-body="{ date, week }">
				<div
					class="v-current-time"
					:class="{ first: date === week[0].date }"
					:style="{ top: nowY }"
				></div>
			</template>

			<!-- <template v-slot:day-header="{ week }">
				<div v-if="false">
					
				{{ tmpDayDate = week[0].date }}
				</div>
			</template> -->
			<template v-slot:day-header="{ date }">
				<div v-show="false" v-if="userType === 'client'">
					{{ (tmpDayDate = date) }}
				</div>
			</template>
		</v-calendar>

		<v-menu
			v-model="selectedOpen"
			:close-on-content-click="false"
			:activator="selectedElement"
			offset-x
		>
			<v-card color="grey lighten-4" min-width="350px" flat>
				<v-toolbar :color="selectedEvent.color" dark>
					<div v-if="userType === 'client'">
						<v-icon left>mdi-calendar-clock</v-icon>
					</div>
					<div v-else>
						<VBtn fab small color="white" class="mr-3">
							<v-icon
								:color="selectedEvent.color"
								@click="OnEdit(selectedEvent._id)"
								>mdi-pencil</v-icon
							>
						</VBtn>
					</div>
					<v-toolbar-title
						class="text-truncate w-75"
						v-if="selectedEvent.name"
						v-html="selectedEvent.name"
					></v-toolbar-title>
				</v-toolbar>
				<v-card-text>
					<VRow v-if="selectedEvent.start && selectedEvent.end">
						<VCol cols="auto">Час:</VCol>
						<VCol cols="auto">
							<b> {{ selectedEvent.start.substr(10, 10) }}</b>
							<VIcon>mdi-minus</VIcon>
							<b> {{ selectedEvent.end.substr(10, 10) }}</b>
						</VCol>
					</VRow>
					<VRow>
						<VCol cols="auto">
							<p v-if="selectedEvent.content">{{ selectedEvent.content }}</p>
						</VCol>
					</VRow>
					<VRow v-if="selectedEvent.link">
						<VCol>
							<VBtn
								class="btn-link"
								:href="selectedEvent.link"
								outlined
								target="blank"
								:color="selectedEvent.color"
							>
								<VIcon left>mdi-link </VIcon> Посилання
							</VBtn>
							<VBtn
								:color="selectedEvent.color"
								class="white--text btn-clipboard"
								:elevation="0"
								v-clipboard:copy="selectedEvent.link"
								v-clipboard:success="onCopy"
								v-clipboard:error="onError"
							>
								<VIcon> mdi-content-copy </VIcon>
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
		setToday: {
			require: false,
		},
		userType: {
			require: false,
		},
	},
	watch: {
		tmpDayDate(e) {
			this.$emit('getDate', this.tmpDayDate);
		},
		next: {
			deep: true,
			handler(e) {
				this.$refs.calendar.next();
				// if (this.userType !== 'client' && $vuetify.breakpoint.smAndDown) {
				// 	this.$emit('getDate', this.$refs.calendar.title);
				// }
			},
		},
		prev: {
			deep: true,
			handler() {
				this.$refs.calendar.prev();
				// if (this.userType !== 'client' && $vuetify.breakpoint.smAndDown) {
				// 	this.$emit('getDate', this.$refs.calendar.title);
				// }
			},
		},
		setToday: {
			deep: true,
			handler(e) {
				this.focus = '';
			},
		},
	},
	data: () => ({
		tmpDayDate: '',
		focus: '',
		value: '',
		ready: false,
		selectedEvent: {},
		selectedElement: null,
		selectedOpen: false,
		today: new Date().toISOString().substr(0, 10),
		isShowCopied: false,
		isShowError:false
	}),
	methods: {
		onCopy() {
			console.log('copy')
			this.isShowCopied = true;
		},
		onError() {
			console.log('copy')
			this.isShowError = true;
		},
		OnEdit(e) {
			this.$emit('editEvent', e);
		},
		test() {
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
		getEvents(e) {},
		getCurrentTime() {
			return this.cal
				? this.cal.times.now.hour * 60 + this.cal.times.now.minute
				: 0;
		},
		scrollToTime() {
			const time = this.getCurrentTime();
			const first = Math.max(0, time - (time % 30) - 30);

			// this.cal.scrollToTime(first);
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

		this.$emit(
			'getDate',
			this.userType === 'client' ? this.tmpDayDate : this.$refs.calendar.title
		);
	},
};
</script>

<style lang="scss">
.v-calendar-daily__scroll-area {
	&::-webkit-scrollbar {
		width: 8px !important;
		height: 12px;
		background-color: transparent;
		position: absolute;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(113, 113, 113, 0.3);
		border: thin solid rgb(245, 245, 244);
		border-radius: 9em;
	}
	&::-webkit-scrollbar-thumb:hover {
		background-color: darken(rgba(113, 113, 113, 0.5), 4);
	}
}
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
.btn {
	&-clipboard {
		border-top-left-radius: 0 !important;
		border-bottom-left-radius: 0 !important;
	}
	&-link {
		border-top-right-radius: 0 !important;
		border-bottom-right-radius: 0 !important;
	}
}
.hide-header {
	.v-calendar-daily_head-day-label {
		display: none;
	}
}
</style>
