<template>
	<div class="h-auto">
		<div class="d-flex justify-space-between pb-0 align-center">
			<v-tabs
				v-model="listTab"
				:color="listTab === 0 ? 'primary' : 'green darken-2'"
			>
				<v-tab>Користувачі</v-tab>
				<v-tab>Корисні посилання</v-tab>
				<v-tab>Історія коледжу</v-tab>
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
			<v-tab-item v-if="users.length">
				<UsersList
					:users="users"
					@showEdit="showEdit"
					@deleteUser="deleteUser"
				/>
			</v-tab-item>
			<v-tab-item v-else>
				<div class="py-10 px-5">
					<VRow>
						<div class="text-center w-100">Список користувачів порожній</div>
					</VRow>
				</div>
			</v-tab-item>
			<v-tab-item>
				<PartnersList :partners="partners" @deletePartner="deletePartner" />
			</v-tab-item>
			<v-tab-item>
				<about-col-component />
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
		<edit-info-col-dialog
			:visible="true"
			@close="visibleAboutCol = false"
			v-if="visibleAboutCol"
			@changeInfoCol="changeInfoCol"
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
import AboutColComponent from './AboutColComponent.vue';
import EditInfoColDialog from './editInfoColDialog.vue';

export default {
	mixins: [loader],
	components: {
		AddUsersDialog,
		UsersList,
		PartnersList,
		AddPartnersDialog,
		AboutColComponent,
		EditInfoColDialog,
	},

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
			if (this.listTab === 2) {
				return 'Інформація про коледж';
			}
		},
	},
	methods: {
		changeInfoCol(){
			this.visibleAboutCol = false

		},
		onClickAdd() {
			if (this.listTab === 0) {
				this.visibleUser = true;
			}
			if (this.listTab === 1) {
				this.visiblePartner = true;
			}
			if (this.listTab === 2) {
				this.visibleAboutCol = true;
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
		async deletePartner(e) {
			try {
				this.setLoading(true);
				await partnersService.deletePartner(e);
				this.getPartners();
			} catch (e) {
				alert(e);
			}
		},
		async getUser() {
			try {
				this.setLoading(true);
				this.users = await usersService.getAll();
				console.log(this.users);
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
		visibleAboutCol: false,
		users: [],
		partners: [],
		chosenId: null,
		tab: 'user',
	}),
};
</script>
