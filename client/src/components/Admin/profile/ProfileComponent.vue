<template>
	<div class="p-1">
		<VRow>
			<VCol>
				Профіль користувача {{ user.name || '--' }} {{ user.surname || '--' }}
			</VCol>
		</VRow>
		<VRow style="height: 80vh">
			<VCol cols="7"></VCol>
			<VDivider vertical />
			<VCol cols="4"
				><VBtn rounded text color="error" @click="showChange = true"
					><VIcon>mdi-lock-reset</VIcon>Змінити пароль</VBtn
				></VCol
			>
		</VRow>
		<ChangePassword :user="user" :visible="showChange" v-if="showChange" @close="showChange = false"/>
	</div>
</template>

<script>
import ChangePassword from '@/components/Admin/profile/ChangeUserPassword';

import usersService from '@/request/users/usersService';

export default {
	components: {
		ChangePassword,
	},
	data: () => ({
		user: [],
		showChange:false
	}),
	methods: {
		async getUser() {
			try {
				this.user = await usersService.getOne(JSON.parse(localStorage.token));
			} catch (e) {
				alert(e);
			}
		},
	},
	mounted() {
		this.getUser();
	},
};
</script>

<style></style>
