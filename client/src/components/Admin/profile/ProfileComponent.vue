<template>
	<div class="p-1">
		<VRow>
			<VCol>
				Профіль користувача {{ user.name || '--' }} {{ user.surname || '--' }}
			</VCol>
		</VRow>
		<VRow>
			<VCol cols="8"></VCol>
			<VCol cols="4"></VCol>
		</VRow>
	</div>
</template>

<script>
import usersService from '@/request/users/usersService';

export default {
	data: () => ({
		user: [],
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
