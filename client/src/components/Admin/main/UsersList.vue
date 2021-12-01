<template>
	<v-simple-table class="p-1 my-table">
		<template v-slot:default>
			<thead>
				<tr>
					<th class="text-left">#</th>
					<th class="text-left">Назва</th>
					<th class="text-left">Телефон</th>
					<th class="text-left">Пошта</th>
					<th class="text-left">Посада</th>
					<th class="text-left">Дія</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(user, key) in users" :key="user.id">
					<td>{{ key + 1 }}</td>
					<td>{{ user.name || '--' }} {{ user.surname || '--' }}</td>
					<td>{{ user.phone || '--' }}</td>
					<td>{{ user.email || '--' }}</td>
					<td>{{ user.position.title || '--' }}</td>
					<td>
						<VRow>
							<VBtn small color="primary" @click="editUser(user)">
								<VIcon> mdi-account-edit</VIcon></VBtn
							>
							<VBtn small color="error" @click="deleteUser(user._id)" >
								<VIcon> mdi-delete</VIcon></VBtn
							>
						</VRow>
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
		deleteUser(e) {
			console.log(e);
			this.$emit('deleteUser', e);
		},
	},
};
</script>

<style lang="scss" scoped>
.my-table {
	tr {
		th,
		td {
			width: auto;
			white-space: nowrap;
			&:nth-child(6) {
				width: 10%;
				text-align: center !important;
				div {
					flex-wrap: nowrap;
					justify-content: space-between;

					button {
						&:nth-child(1) {
							margin-right: 10px;
						}
					}
				}
			}
		}
	}
}
</style>
