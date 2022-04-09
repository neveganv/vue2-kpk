<template>
	<VDialog v-model="visibility">
		<VCard width="700" :disable="isLoading" :loading="isLoading">
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
						></v-text-field>
						<VRow
							justify="center"
							align="center"
							style="height: 100%"
							v-if="dates.length <= 1"
						>
							<VCol class="text-center error--text">
								Оберіть початкову та кінцеву дату
							</VCol>
						</VRow>
						<div v-else>
							<VRow>
								<VSubheader> Події у цьому проміжку: </VSubheader>
							</VRow>
							<VRow>
									<ul>
										<li><span>Поки це не працює :) <b><i>-x</i></b></span></li>
									</ul>
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
					disabled
					v-model="isDeleteOldEvents"
					label="Видалити події після копіюваня"
				></VSwitch>
				<VSpacer />
				<VBtn color="error" text @click="onCancel"> Скасувати </VBtn>
				<VBtn
					color="primary"
					@click="onDublicate"
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
		isDeleteOldEvents: false,
		isAutoUpdate: false,
		amountDublicate: 7,
		dublicatePeriods: [
			{
				amount: 7,
				title: 'Тиждень',
			},
		],
	}),
	methods: {
		onCancel() {},
		async onCancel() {
			this.dates = [];
			this.$emit('close');
		},
		async onDublicate() {
			try {
				this.isLoading = true;
				const [start_date, end_date] = this.dates;
				if (!start_date || !end_date) {
					throw new Error('Виберіть початкову та кінцеву дату');
				}
				const res = await sheduleService.dublicateEvents({
					start: start_date,
					end: end_date,
					group: this.group,
				});
					// isDeleteOldEvents: this.isDeleteOldEvents,
				this.$emit('dublicateEvents',this.group,);
				this.isLoading = false;
			} catch (e) {
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
