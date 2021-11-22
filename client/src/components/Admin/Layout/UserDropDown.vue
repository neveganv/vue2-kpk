<template>
	<VMenu offset-y>
		<template v-slot:activator="{ on, attrs }">
			<span v-bind="attrs" v-on="on">
				<span class="d-flex align-center">
					<Avatar :name="tmpUserName" />
					<VIcon v-if="attrs['aria-expanded'] === 'false'">mdi-menu-down</VIcon>
					<VIcon v-else>mdi-menu-up</VIcon>
				</span>
			</span>
		</template>
		<VCard>
			<VList>
				<VListItem>
					<VListItemAvatar>
						<Avatar :name="tmpUserName" size="50" />
					</VListItemAvatar>
					<VListItemContent>
						<VListItemTitle>Rostyslavkoo</VListItemTitle>
						<VListItemSubtitle>admin@gmail.com</VListItemSubtitle>
					</VListItemContent>
				</VListItem>
				<VDivider />
				<VListItem @click="onSettings" dense>
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

export default {
	props: {
		tmpUserName: {
			require: true,
		},
	},
	components: {
		Avatar,
	},
	methods: {
		onSettings() {
			console.log(123);
		},
		onLeft(){
			console.log('left')
		}
	},
};
</script>

<style></style>
