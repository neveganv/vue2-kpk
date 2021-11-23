<template>
	<v-simple-table class="p-1">
		<template v-slot:default>
			<thead>
				<tr>
					<th class="text-left">Назва</th>
					<th class="text-left">Телефон</th>
					<th class="text-left">Пошта</th>
					<th class="text-left">Посада</th>
					<th class="text-left">Дія</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="user in users" :key="user.id">
					<td>{{ user.name || '--' }} {{ user.surname || '--' }}</td>
					<td>{{ user.phone || '--' }}</td>
					<td>{{ user.email || '--' }}</td>
					<td>{{ user.type || '--' }}</td>
					<td>
						<VBtn small color="primary" @click="editUser(user)">
							<VIcon> mdi-account-edit</VIcon></VBtn
						>
					</td>
				</tr>
			</tbody>
		</template>
	</v-simple-table>
</template>

<script>
export default {
	props: {
		users: {
			type: Array,
			require: false,
		},
	},

	methods: {
		editUser(e) {
			this.$emit('showEdit', e);
		},
	},
};
</script>

<style></style>
