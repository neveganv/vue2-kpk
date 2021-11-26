<template>
	<VMenu offset-y>
		<template v-slot:activator="{ on, attrs }">
			<span v-bind="attrs" v-on="on">
				<span class="d-flex align-center">
					<Avatar :name="user.name + ' ' + user.surname" size="40" />
					<VIcon v-if="attrs['aria-expanded'] === 'false'">mdi-menu-down</VIcon>
					<VIcon v-else>mdi-menu-up</VIcon>
				</span>
			</span>
		</template>
		<VCard>
			<VList>
				<VListItem>
					<VListItemAvatar>
						<Avatar :name="user.name + ' ' + user.surname" size="50" />
					</VListItemAvatar>
					<VListItemContent>
						<VListItemTitle>{{ user.name }} {{ user.surname }}</VListItemTitle>
						<VListItemSubtitle>{{ user.email }}</VListItemSubtitle>
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
		<ChangePassword :visible="showChange" v-if="showChange" />
	</VMenu>
</template>

<script>
import Avatar from './Avatar.vue';
import ChangePassword from '../main/ChangeUserPassword';

export default {
	props: {
		user: {
			type: Object,
			require: true,
		},
	},
	components: {
		Avatar,
		ChangePassword,
	},
	data: () => ({
		showChange: false,
	}),
	methods: {
		onLeft() {
			console.log('left');
		},
	},
};
</script>

<style></style>
