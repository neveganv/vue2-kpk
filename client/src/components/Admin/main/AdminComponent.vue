<template>
	<div class="h-auto">
		<div class="d-flex justify-space-between p-1 align-center">
			<VBtn rounded text color="primary">Список користувачів</VBtn>
			<VBtn rounded color="primary" outlined @click="visible = true">
				<VIcon left>mdi-account-plus</VIcon>Додати нового користувача</VBtn
			>
		</div>
		<VDivider />
		<UsersList :users="users" @showEdit="showEdit" @deleteUser="deleteUser" />
		<add-users-dialog
			:visible="visible"
			@close="
				visible = false;
				chosenId = null;
			"
			v-if="visible"
			@addUser="addUser"
			:chosenUser="chosenId"
			@updateUser="updateUser"
		/>
	</div>
</template>

<script>
import AddUsersDialog from './AddUsersDialog.vue';
import UsersList from './UsersList.vue';
import usersService from '@/request/users/usersService';
import loader from '@/mixins/loader';

export default {
	mixins: [loader],
	components: { AddUsersDialog, UsersList },

	mounted() {
		this.getUser();
	},
	methods: {
		addUser() {
			this.getUser();
			this.visible = false;
		},
		updateUser() {
			this.getUser();
			this.visible = false;
			console.log(123);
			this.chosenId = null;
		},
		async deleteUser(e) {
			try {
				this.setLoading(true);
				const params = [];
				params.id = e;
				await usersService.deleteUser({ ...params });
				this.getUser();
				this.setLoading(false);
			} catch (e) {
				alert(e);
			}
		},
		async getUser() {
			try {
				this.setLoading(true);
				this.users = await usersService.getAll();
				this.users = this.users.filter(user => user.token !== JSON.parse(localStorage.token));
				this.setLoading(false);
			} catch (e) {
				alert(e);
			}
		},
		showEdit(e) {
			this.chosenId = e._id;

			this.visible = true;
		},
	},
	data: () => ({
		visible: false,
		visibleEdit: false,
		users: [],
		chosenId: null,
	}),
};
</script>
