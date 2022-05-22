<template>
	<VDialog v-model="visibility">
		<VCard width="700" :disabled="isLoading" :loading="isLoading">
			<VCardTitle>
				<VRow>
					<VCol>
						<span>Дублювання подій</span>
					</VCol>
					<!-- choose dublicated period 7 days, 14 days etc.  -->
					<!-- <VCol cols="3"> 
						<VSelect
							:items="Object.values(dublicatePeriods)"
							:item-value="'amount'"
							:item-text="'title'"
							v-model="amountDublicate"
                            dense
                            hide-details="auto"
                            outlined
                            :menu-props="{offsetY:true}"
						/>
					</VCol> -->
					<VSwitch
						inset
						dense
						disabled
						v-model="isAutoUpdate"
						label="Автоматичне оновлення"
					></VSwitch>
				</VRow>
			</VCardTitle>
			<VDivider class="mx-5" />
			<VCardText>
				<VRow class="mt-5">
					<VCol cols="12" sm="6">
						<v-date-picker
							no-title
							v-model="dates"
							range
							locale="uk"
						></v-date-picker>
					</VCol>
					<VCol cols="12" sm="6">
						<v-text-field
							dense
							v-model="dateRangeText"
							label="Діапазон подій"
							prepend-inner-icon="mdi-calendar"
							readonly
							:loading="isLoadingSearch"
						></v-text-field>
						<VRow
							justify="center"
							align="center"
							style="height: 100%"
							v-if="dates.length <= 1 || isLoadingSearch"
						>
							<VCol class="text-center error--text">
								Оберіть початкову та кінцеву дату
							</VCol>
						</VRow>
						<div v-else>
							<VRow align="center">
								<VSubheader>
									Події у цьому проміжку:
									{{ chosenDates.length || 0 }}</VSubheader
								>
								<!-- <VBtn small color="purple lighten-1" class="white--text"
									>Детальніше</VBtn
								> -->
							</VRow>
							<VRow>
								<!-- <thead>
										<tr>
											<th>Назва</th>
											<th class="text-center">День</th>
										</tr>
									</thead> -->
								<!-- <tbody>
										<tr
											v-for="item in chosenDates"
											:key="item.id"
											class="white--text"
											:style="{ 'background-color': item.color }"
										>
											<td>{{ item.name }}</td>
											<td>{{ getDayTxt(item.start) }}</td>
										</tr>
									</tbody> -->
							</VRow>
						</div>
					</VCol>
				</VRow>
			</VCardText>
			<VDivider class="mx-5" />
			<VCardActions>
				<VSwitch
					inset
					dense
					v-model="isDeleteOldEvents"
					label="Видалити події після копіюваня"
				></VSwitch>
				<VSpacer />
				<VBtn color="error" text @click="onCancel"> Скасувати </VBtn>
				<VBtn
					color="primary"
					@click="onDublicate()"
					:disabled="isLoading"
					:loading="isLoading"
				>
					Продублювати
				</VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
import sheduleService from '@/request/shedule/sheduleService';
export default {
	watch: {
		dates: {
			deep: true,
			handler(e) {
				let [start_date, end_date] = e;
				const start = new Date(start_date).getTime();
				const end = new Date(end_date).getTime();

				if (start_date && end_date) {
					if (start > end) {
						this.dates = [end_date, start_date];
					}
					this.onDublicate(true, 0);
				}
			},
		},
		chosenDates: {
			deep: true,
			handler(e) {},
		},
	},
	props: {
		visible: {
			require: true,
		},
		group: {
			require: true,
		},
	},
	data: () => ({
		isAutoUpdate: false,
		isLoading: false,
		dates: [],
		isDeleteOldEvents: true,
		isAutoUpdate: false,
		amountDublicate: 7,
		chosenDates: [],
		dublicatePeriods: [
			{
				amount: 7,
				title: 'Тиждень',
			},
		],
		isLoadingSearch: false,
	}),
	methods: {
		getDayTxt(data) {
			return DAY[new Date(data).getUTCDay()];
		},
		onCancel() {},
		async onCancel() {
			this.dates = [];
			this.$emit('close');
		},
		async onDublicate(onPreview = false, saveEvents = 1) {
			try {
				this.isLoading = onPreview ? false : true;
				this.isLoadingSearch = onPreview ? true : false;
				const [start_date, end_date] = this.dates;
				if (!start_date || !end_date) {
					throw new Error('Виберіть початкову та кінцеву дату');
				}
				const res = await sheduleService.dublicateEvents({
					start: start_date,
					end: end_date,
					group: this.group,
					delete: this.isDeleteOldEvents && !onPreview ? 1 : 0,
					save: saveEvents,
				});
				if (!onPreview) {
					this.$emit('dublicateEvents', this.group);
				} else {
					this.chosenDates = res.result;
					console.log(this.chosenDates);
				}
				this.isLoading = false;
				this.isLoadingSearch = false;
			} catch (e) {
				this.isLoadingSearch = false;
				this.isLoading = false;

				alert(e);
			}
		},
	},
	computed: {
		dateRangeText() {
			return this.dates.join(' ~ ');
		},
		visibility: {
			get() {
				return this.visible;
			},
			set() {
				return this.$emit('close');
			},
		},
	},
};
</script>

<style></style>
