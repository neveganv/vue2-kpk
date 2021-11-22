<template>
	<div class="h-auto">
		<div class="d-flex justify-space-between p-1 align-center">
			<VBtn text color="primary">Головна сторінка</VBtn>
			<VBtn color="primary" outlined @click="visible = true">
				<VIcon left>mdi-account-plus</VIcon>Додати нового користувача</VBtn
			>
		</div>
		<VDivider />
		<UsersList :users="users" @showEdit="showEdit" />
		<add-users-dialog :visible="visible" @close="visible = false" />
		<add-users-dialog :visible="visibleEdit" @close="visibleEdit = false" :edit="true" :chosenUser="chosenUser" />
	</div>
</template>

<script>
import AddUsersDialog from './AddUsersDialog.vue';
import UsersList from './UsersList.vue';
import usersService from '@/request/users/usersService';

export default {
	components: { AddUsersDialog, UsersList },

	mounted() {
		this.getUser();
	},
	methods: {
		async getUser() {
			this.users = await usersService.getClientsList(10);
			console.log(this.users);
		},
		showEdit(e) {
			this.chosenUser = e
			this.visibleEdit = true;
		},
	},
	data: () => ({
		visible: false,
		visibleEdit: false,
		chosenUser:[],
		users: [],
	}),
};
</script>
