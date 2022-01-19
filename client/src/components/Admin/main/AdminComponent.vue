<template>
	<div class="h-auto">
		<div class="d-flex justify-space-between p-1 align-center">
			<VBtn rounded text color="primary" @click="tab = 'user'">Список користувачів</VBtn>
			<VBtn rounded text class="mr-auto" @click="tab = 'partner'" color="green darken-2">Список партнерів</VBtn>
			<VBtn rounded color="green darken-2" v-if="tab == 'partner'" outlined @click="visible = true">
				<VIcon left>mdi-account-plus</VIcon>Додати нового партнера</VBtn
			>
			<VBtn rounded color="primary" v-if="tab == 'user'" outlined @click="visible = true">
				<VIcon left>mdi-account-plus</VIcon>Додати нового користувача</VBtn
			>
		</div>
		<VDivider />
		<UsersList v-if="tab == 'user'" :users="users" @showEdit="showEdit" @deleteUser="deleteUser" />
		<PartnersList v-if="tab == 'partner'"  @showEdit="showEdit" @deleteUser="deleteUser" />
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
import PartnersList from './PartnersList.vue';
import usersService from '@/request/users/usersService';
import loader from '@/mixins/loader';

export default {
	mixins: [loader],
	components: { AddUsersDialog, UsersList, PartnersList },

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
		tab: "user"
	}),
};
</script>
