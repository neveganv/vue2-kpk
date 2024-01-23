<template>
	<div class="w-100">
		<VSimpleTable class="w-100" v-if="studentsList.length">
			<thead>
				<tr>
					<th class="pl-6">
						<v-checkbox v-model="checkAll" hide-details dense></v-checkbox>
					</th>
					<th>#</th>
					<th>Дата</th>
					<th>Ім'я</th>
					<th>Прізвище</th>
					<th>По батькові</th>
					<th>Номер телефону учня</th>
					<th>Номер телефону одного з батьків</th>
					<th class="text-center">Статус заявки</th>
					<th class="text-center">Дія</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) in studentsList" :key="item._id">
					<th class="pl-6">
						<v-checkbox
							v-model="selectedItem"
							:value="item._id"
							hide-details
							dense
						></v-checkbox>
					</th>
					<th>{{ ++index }}</th>
					<td>
						{{
							moment(item.created).subtract(10, 'days').calendar() || '--'
						}}
					</td>
					<td>{{ item.name || '--' }}</td>
					<td>{{ item.surname || '--' }}</td>
					<td>{{ item.middle_name || '--' }}</td>
					<td>{{ item.student_phone || '--' }}</td>
					<td>{{ item.parent_phone || '--' }}</td>
					<td class="text-center">
						<VChip
							small
							:color="
								item.status === 'Новий'
									? 'info'
									: item.status === 'В процесі'
									? 'warning'
									: item.status === 'Відмова'
									? 'error'
									: 'success'
							"
						>
							{{ item.status || '--' }}
						</VChip>
					</td>
					<td class="text-center">
						<VBtn
							elevation="3"
							color="primary"
							dense
							@click="onClickUser(item)"
						>
							<VIcon> mdi-account-search</VIcon></VBtn
						>
					</td>
				</tr>
			</tbody>
		</VSimpleTable>
		<div v-else>
			<div class="w-100 text-center">
				Список учнів на підготовчі курси порожній
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		studentsList: {
			require: true,
		},
	},
	data: () => ({
		checkAll: false,
		selectedItem: [],
	}),
	watch: {
		checkAll: {
			deep: true,
			handler(e) {
				if (e) {
					this.studentsList.forEach(item => {
						this.selectedItem.push(item._id);
					});
				} else {
					if (this.selectedItem.length >= this.studentsList.length) {
						this.selectedItem = [];
					}
				}
			},
		},
		selectedItem: {
			deep: true,
			handler(e) {
				if (this.checkAll) {
					if (this.selectedItem.length < this.studentsList.length) {
						this.checkAll = false;
					}
				}
				this.$emit('onChoseItem', this.selectedItem);
			},
		},
	},
	methods: {
		onClickUser(e) {
			this.$emit('clickUserInfo', e);
		},
	},
};
</script>

<style></style>
