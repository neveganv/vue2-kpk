<template>
  <div class="h-auto">
    <div class="d-flex justify-space-between p-1 align-center">
      <VBtn rounded :text="tab != 'user'" color="primary" @click="tab = 'user'"
        >Список користувачів</VBtn
      >
      <VBtn
        rounded
        :text="tab != 'partner'"
		dark
        class="mr-auto"
        @click="tab = 'partner'"
        color="green darken-2"
        >Список партнерів</VBtn
      >
      <VBtn
        rounded
        color="green darken-2"
        v-if="tab == 'partner'"
        outlined
        @click="visiblePartner = true"
      >
        <VIcon left>mdi-account-plus</VIcon>Додати нового партнера</VBtn
      >
      <VBtn
        rounded
        color="primary"
        v-if="tab == 'user'"
        outlined
        @click="visibleUser = true"
      >
        <VIcon left>mdi-account-plus</VIcon>Додати нового користувача</VBtn
      >
    </div>
    <VDivider />
    <UsersList
      v-if="tab == 'user'"
      :users="users"
      @showEdit="showEdit"
      @deleteUser="deleteUser"
    />
    <PartnersList :partners="partners" v-if="tab == 'partner'" />
    <add-users-dialog
      :visible="visibleUser"
      @close="
        visibleUser = false;
        chosenId = null;
      "
      v-if="visibleUser && tab == 'user'"
      @addUser="addUser"
      :chosenUser="chosenId"
      @updateUser="updateUser"
    />
    <add-partners-dialog
      :visible="visiblePartner"
      @close="visiblePartner = false"
      v-if="visiblePartner && tab == 'partner'"
      @addPartner="addPartner"
    />
  </div>
</template>

<script>
import AddUsersDialog from "./AddUsersDialog.vue";
import AddPartnersDialog from "./AddPartnersDialog.vue";
import UsersList from "./UsersList.vue";
import PartnersList from "./PartnersList.vue";
import usersService from "@/request/users/usersService";
import partnersService from "@/request/partners/partnersService";
import loader from "@/mixins/loader";

export default {
  mixins: [loader],
  components: { AddUsersDialog, UsersList, PartnersList, AddPartnersDialog },

  mounted() {
    this.getUser();
	this.getPartners()
  },
  methods: {
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
          (user) => user.token !== JSON.parse(localStorage.token)
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
    visibleUser: false,
    visiblePartner: false,
    visibleEdit: false,
    users: [],
	partners: [],
    chosenId: null,
    tab: "user",
  }),
};
</script>
