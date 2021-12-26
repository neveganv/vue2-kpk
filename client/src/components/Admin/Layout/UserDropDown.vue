<template>
	<VMenu offset-y v-if="user">
		<template v-slot:activator="{ on, attrs }">
			<span v-bind="attrs" v-on="on">
				<span class="d-flex align-center">
					<Avatar :name="user.name + ' ' + user.surname" size="40"  />
					<VIcon v-if="attrs['aria-expanded'] === 'false'">mdi-menu-down</VIcon>
					<VIcon v-else>mdi-menu-up</VIcon>
				</span>
			</span>
		</template>
		<VCard @click.stop :ripple="false" style="cursor:auto">
			<VList >
				<VListItem>
					<VListItemAvatar>
						<Avatar :name="user.name + ' ' + user.surname" size="50" />
					</VListItemAvatar>
					<VListItemContent>
						<VListItemTitle >{{ user.name }} {{ user.surname }} </VListItemTitle>
						<VListItemSubtitle>{{ user.positionTitle }}</VListItemSubtitle>
					</VListItemContent>
				</VListItem>
				<VDivider />
				<VListItem :to="{ path: '/admin-profile' }" dense>
					<VListItemIcon>
						<VIcon>mdi-cog</VIcon>
					</VListItemIcon>
					<VListItemTitle>Налаштування</VListItemTitle>
				</VListItem>
				<VListItem @click="onLeft" dense>
					<VListItemIcon>
						<VIcon>mdi-account-arrow-left</VIcon>
					</VListItemIcon>
					<VListItemTitle>Вийти</VListItemTitle>
				</VListItem>
			</VList>
		</VCard>
	</VMenu>
</template>

<script>
import Avatar from './Avatar.vue';
import user from '@/mixins/user'
export default {
	props: {
		user: {
			type: Object,
			require: true,
		},
	},
	components: {
		Avatar,
	},
	mixins:[user],

	methods: {
		onLeft() {
			this.logOut();
			localStorage.removeItem('token');
			this.$router.push({name :'admin-login'})
		},
	},
};
</script>

<style></style>
