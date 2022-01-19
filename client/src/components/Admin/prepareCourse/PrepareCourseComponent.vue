<template>
	<div class="h-auto">
		<VRow no-gutters class="p-1">
			<VCol>
				<VBtn rounded text color="primary"
					>Список учнів на підготовчі курси</VBtn
				>
			</VCol>
			<VCol cols="auto">
				<VBtn
					color="grey darken-2"
					outlined
					rounded
					@click="visibleSettingDialog = true"
				>
					<VIcon left>mdi-cog</VIcon>
					Налаштування</VBtn
				></VCol
			>
		</VRow>
		<VDivider />
		<VRow no-gutters class="pa-3">
			<!-- <VCol cols="3">
				<VTextField
					solo
					dense
					hide-details="auto"
					label="Пошук..."
					v-model="searchQuery"
					prepend-inner-icon="mdi-magnify"
				/>
			</VCol> -->
			<VCol cols="3" class="ml-4">
				<VSelect
					solo
					dense
					hide-details="auto"
					label="Статус"
					v-model="selectedStatus"
					prepend-inner-icon="mdi-list-status"
					:menu-props="{ bottom: true, offsetY: true }"
					:items="Object.values(statusList)"
					:item-text="'title'"
					:item-value="'title'"
					chips
					small-chips
					clearable
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
		<VRow no-gutters class="px-3 pb-2">
			<prepare-course-list
				:studentsList="getSortedList"
				@clickUserInfo="clickUserInfo"
			/>
		</VRow>
		<prepare-course-info-dialog
			@updatedStatus="updatedStatus"
			:visible="visibleDialog"
			@close="visibleDialog = false"
			:item="userActive"
			:statusList="statusList"
		/>
		<course-setting-dialog
			:visible="visibleSettingDialog"
			@close="visibleSettingDialog = false"

		/>
	</div>
</template>
<script>
import prepareCourseService from '@/request/prepareCourse/prepareCourseService';
import PrepareCourseList from './PrepareCourseList.vue';
import PrepareCourseInfoDialog from './PrepareCourseInfoDialog.vue';
import loader from '@/mixins/loader';
import CourseSettingDialog from './CourseSettingDialog.vue';

export default {
	components: {
		PrepareCourseList,
		PrepareCourseInfoDialog,
		CourseSettingDialog,
	},
	mixins: [loader],
	data: () => ({
		searchQuery: '',
		studentsList: [],
		selectedStatus: '',
		userActive: '',
		visibleSettingDialog: false,
		visibleDialog: false,
		statusList: [
			{ id: 1, title: 'Новий' },
			{ id: 2, title: 'В процесі' },
			{ id: 4, title: 'Прийнята' },
			{ id: 3, title: 'Відмова' },
		],
	}),
	mounted() {
		this.getAllPrepareUser();
	},
	methods: {
		updatedStatus() {
			this.getAllPrepareUser();
		},
		clickUserInfo(e) {
			this.visibleDialog = true;
			this.userActive = e;
		},
		async getAllPrepareUser() {
			this.setLoading(true);
			const newItems = await prepareCourseService.getAllPrepare();
			this.studentsList = newItems;
			this.setLoading(false);
		},
	},
	computed: {
		getSortedList() {
			if (this.selectedStatus) {
				const values = [...this.studentsList].filter(
					e => e.status === this.selectedStatus
				);
				return values;
			} else {
				return this.studentsList;
			}
		},
		getSortedAndSearchedList() {
			// if (this.searchQuery) {
			// 	return this.getSortedList.filter(e =>
			// 		e.name.toLowerCase().includes(this.searchQuery.toLowerCase())
			// 	);
			// } else {
			// 	return this.getSortedList;
			// }
		},
	},
};
</script>

<style></style>
