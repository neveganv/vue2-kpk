<template>
	<div class="h-auto">
		<div class="d-flex justify-space-between p-1 align-center">
			<VBtn text color="primary">Список користувачів</VBtn>
			<VBtn color="primary" outlined @click="visible = true">
				<VIcon left>mdi-account-plus</VIcon>Додати нового користувача</VBtn
			>
		</div>
		<VDivider />
		<UsersList 
		:users="users" 
		@showEdit="showEdit"
		@deleteUser="deleteUser" />
		<add-users-dialog
			:visible="visible"
			@close="visible = false"
			v-if="visible"
			@addUser="addUser"
		/>
		<add-users-dialog
			:visible="visibleEdit"
			@close="visibleEdit = false"
			@updateUser="updateUser"
			:edit="true"
			:chosenUser="chosenUser"
			v-if="visibleEdit"
		/>
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

		addUser(){
		this.getUser();
		this.visible = false
		},
		updateUser(){
			this.getUser();
			this.visibleEdit = false
		},
		async deleteUser(e){
		try{	
			console.log("e",e);
		const params = [];
		params.id = e;
           await usersService.deleteUser({...params});
		   this.getUser();
		   
		   }catch (e){
			   alert(e);
		   }
		},
		async getUser() {
			try {
				this.users = await usersService.getAll();
						console.log(this.users);
			} catch (e) {
				alert(e);
			}
		},
		showEdit(e) {
			this.chosenUser = e;
			this.visibleEdit = true;
		},
	},
	data: () => ({
		visible: false,
		visibleEdit: false,
		chosenUser: [],
		users: [],
	}),
};
</script>
