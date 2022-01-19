<template>
	<VDialog v-model="visiblility" width="800">
		<VCard>
			<VCardTitle>
				<VRow justify="space-between">
					<VCol cols="auto"> Заявка на підготовчі курси </VCol>
					<VCol cols="5">
						<VSelect
							solo
							dense
							hide-details="auto"
							label="Змінити статус"
							v-model="selectedStatus"
							prepend-inner-icon="mdi-list-status"
							:menu-props="{ bottom: true, offsetY: true }"
							:items="Object.values(getStatusList)"
							:item-text="'title'"
							:item-value="'title'"
							chips
							small-chips
							@change="onChangeStatus"
							:disabled="loading"
							:loading="loading"
						>
							<template #selection="{ item }">
								<v-chip
									small
									:color="
										item.title === 'Новий'
											? 'info'
											: item.title === 'В процесі'
											? 'warning'
											: item.title === 'Відмова'
											? 'error'
											: 'success'
									"
									>{{ item.title }}</v-chip
								>
							</template>
						</VSelect>
					</VCol>
				</VRow>
			</VCardTitle>
			<VDivider class="mb-3" />
			<VCardText>
				<VCard>
					<VCardText>
						<VRow>
							<VCol cols="5">
								<VRow no-gutters justify="space-between">
									<VCol cols="auto" class="mr-1">Прізвище: </VCol>

									<VCol cols="auto" class="font-weight-bold">{{
										newUser.surname || '--'
									}}</VCol>
								</VRow>
								<VRow no-gutters justify="space-between">
									<VCol cols="auto" class="mr-1">Ім'я: </VCol>

									<VCol cols="auto" class="font-weight-bold">{{
										newUser.name || '--'
									}}</VCol>
								</VRow>

								<VRow no-gutters justify="space-between">
									<VCol cols="auto" class="mr-1">По батькові:</VCol>

									<VCol cols="auto" class="font-weight-bold">{{
										newUser.middle_name || '--'
									}}</VCol>
								</VRow>
							</VCol>
							<VDivider vertical class="my-5" />
							<VCol cols="7">
								<VRow no-gutters justify="space-between">
									<VCol cols="auto" class="mr-1">Номер телефону учня:</VCol>

									<VCol cols="auto" class="font-weight-bold text-right">{{
										newUser.student_phone || '--'
									}}</VCol>
								</VRow>
								<VRow no-gutters justify="space-between">
									<VCol cols="auto" class="mr-1"
										>Номер телефону одного з батьків:</VCol
									>

									<VCol cols="auto" class="font-weight-bold">{{
										newUser.parent_phone || '--'
									}}</VCol>
								</VRow>

								<VRow no-gutters justify="space-between">
									<VCol cols="auto" class="mr-1">Серія та номер паспорта:</VCol>

									<VCol cols="auto" class="font-weight-bold">{{
										newUser.pass_id || '--'
									}}</VCol>
								</VRow>
							</VCol>
						</VRow>
					</VCardText>
				</VCard>
			</VCardText>
			<VCardActions>
				<VBtn color="primary" @click="$emit('close')">Назад</VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
import prepareCourseService from '@/request/prepareCourse/prepareCourseService';

export default {
	props: {
		visible: {
			require: true,
		},
		item: {
			require: true,
		},
		statusList: {
			require: true,
		},
	},
	data: () => ({
		selectedStatus: '',
		newUser: {},
		loading: false,
	}),
	watch: {
		item: {
			deep: true,
			handler(e) {
				this.newUser = { ...this.item };
				this.selectedStatus = this.newUser.status;
				console.log(this.newUser);
			},
		},
	},
	methods: {
		async onChangeStatus(e) {
			try {
				this.loading = true;
				await prepareCourseService.updateCourse({
					id: this.newUser._id,
					status: this.selectedStatus,
				});
				this.loading = false;
				this.$emit('updatedStatus');
			} catch (e) {
				alert(e);
			}
		},
	},
	computed: {
		visiblility: {
			get() {
				return this.visible;
			},
			set() {
				return this.$emit('close');
			},
		},
		getStatusList() {
			return this.statusList;
		},
	},
};
</script>

<style></style>
