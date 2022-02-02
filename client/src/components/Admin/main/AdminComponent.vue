<template>
	<div class="h-auto">
		<div class="d-flex justify-space-between p-1 pb-0 align-center">
			<v-tabs
				v-model="listTab"
				:color="listTab === 0 ? 'primary' : 'green darken-2'"
			>
				<v-tab>Користувачі</v-tab>
				<v-tab>Корисні посилання</v-tab>
			</v-tabs>
			<VBtn
				rounded
				:color="listTab === 0 ? 'primary' : 'green darken-2'"
				outlined
				@click="onClickAdd"
			>
				<VIcon left>mdi-account-plus</VIcon>
				{{ getBtnAddText }}
			</VBtn>
		</div>
		<VDivider />
		<v-tabs-items v-model="listTab">
			<v-tab-item>
				<UsersList
					:users="users"
					@showEdit="showEdit"
					@deleteUser="deleteUser"
				/>
			</v-tab-item>
			<v-tab-item>
				<PartnersList :partners="partners" />
			</v-tab-item>
		</v-tabs-items>

		<add-users-dialog
			:visible="visibleUser"
			@close="
				visibleUser = false;
				chosenId = null;
			"
			v-if="visibleUser"
			@addUser="addUser"
			:chosenUser="chosenId"
			@updateUser="updateUser"
		/>
		<add-partners-dialog
			:visible="true"
			@close="visiblePartner = false"
			v-if="visiblePartner"
			@addPartner="addPartner"
		/>
	</div>
</template>

<script>
import AddUsersDialog from './AddUsersDialog.vue';
import AddPartnersDialog from './AddPartnersDialog.vue';
import UsersList from './UsersList.vue';
import PartnersList from './PartnersList.vue';
import usersService from '@/request/users/usersService';
import partnersService from '@/request/partners/partnersService';
import loader from '@/mixins/loader';

export default {
	mixins: [loader],
	components: { AddUsersDialog, UsersList, PartnersList, AddPartnersDialog },

	mounted() {
		this.getUser();
		this.getPartners();
	},
	computed: {
		getBtnAddText() {
			if (this.listTab === 0) {
				return 'Додати нового користувача';
			}
			if (this.listTab === 1) {
				return 'Додати нове посилання';
			}
		},
	},
	methods: {
    onClickAdd(){
      if(this.listTab === 0){
        this.visibleUser = true
      }
      if(this.listTab === 1){
        this.visiblePartner = true
      }
    },
		addUser() {
			this.getUser();
			this.visibleUser = false;
		},
		addPartner() {
			this.getPartners();
			this.visiblePartner = false;
		},
		updateUser() {
			this.getUser();
			this.visibleUser = false;
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
				this.users = this.users.filter(
					user => user.token !== JSON.parse(localStorage.token)
				);
				this.setLoading(false);
			} catch (e) {
				alert(e);
			}
		},
		async getPartners() {
			try {
				this.setLoading(true);
				this.partners = await partnersService.getAll();
				this.setLoading(false);
			} catch (e) {
				alert(e);
			}
		},
		showEdit(e) {
			this.chosenId = e._id;

			this.visibleUser = true;
		},
	},
	data: () => ({
		listTab: 0,
		visibleUser: false,
		visiblePartner: false,
		visibleEdit: false,
		users: [],
		partners: [],
		chosenId: null,
		tab: 'user',
	}),
};
</script>
