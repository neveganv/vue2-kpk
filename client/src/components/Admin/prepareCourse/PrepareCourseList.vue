<template>
	<div class="w-100">
		<VSimpleTable class="w-100" v-if="studentsList.length">
			<thead>
				<tr>
					<th>#</th>
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
					<th>{{ ++index }}</th>
					<td>{{ item.name || '--' }}</td>
					<td>{{ item.surname || '--' }}</td>
					<td>{{ item.middle_name || '--' }}</td>
					<td>{{ item.student_phone || '--' }}</td>
					<td>{{ item.parent_phone || '--' }}</td>
					<td class="text-center">
						<VChip
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
	data: () => ({}),
	methods: {
		onClickUser(e) {
			this.$emit('clickUserInfo', e);
		},
	},
}
</script>

<style></style>
