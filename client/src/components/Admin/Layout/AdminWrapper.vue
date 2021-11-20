<template>
	<VApp>
		<div>
			<v-app-bar color="white" style="height: 65px">
				<VAppBarNavIcon @click="mini = !mini"></VAppBarNavIcon>
				<div class="admin-logo ml-4">
					<img :src="require('@/assets/img/logo-admin.svg')" alt="" />
				</div>
				<VSpacer></VSpacer>
				<VBtn icon class="mr-5">
					<v-badge overlap content="99+">
						<VIcon>mdi-bell</VIcon>
					</v-badge>
				</VBtn>
				<UserDropDown />
			</v-app-bar>
		</div>
		<v-navigation-drawer
			permanent
			absolute
			style="top: 65px; height: calc(100vh - 65px)"
			v-model="mini"
			:mini-variant="!mini"
		>
			<VList nav dense>
				<VListItemGroup color="primary">
					<VListItem :to="{ path: '/admin' }">
						<VListItemIcon>
							<VIcon>mdi-view-dashboard</VIcon>
						</VListItemIcon>
						<VListItemTitle>Головна</VListItemTitle>
					</VListItem>
					<VListItem :to="{ path: '/news' }">
						<VListItemIcon>
							<VIcon>mdi-newspaper-variant</VIcon>
						</VListItemIcon>
						<VListItemTitle>Новини</VListItemTitle>
					</VListItem>
				</VListItemGroup>
				<VListGroup class="listGroupMenu" :value="specialitiesSelector">
					<template v-slot:activator>
						<VListItemIcon>
							<VIcon>mdi-folder-account</VIcon>
						</VListItemIcon>
						<VListItemTitle>Спеціальності</VListItemTitle>
					</template>
					<VListItem :to="{ path: '/2' }">
                    <VListItemIcon>
							<VIcon>mdi-folder-account</VIcon>
						</VListItemIcon>
						<VListItemTitle>Крута спеціальність</VListItemTitle>
					</VListItem>
					<VListItem :to="{ path: '/3' }">
                    <VListItemIcon>
							<VIcon>mdi-folder-account</VIcon>
						</VListItemIcon>
						<VListItemTitle>Не крута спеціальність</VListItemTitle>
					</VListItem>
                    	<VListItem :to="{ path: '/add' }">
						<VListItemIcon>
							<VIcon>mdi-folder-account</VIcon>
						</VListItemIcon>
						<VListItemTitle>Додати</VListItemTitle>
					</VListItem>
				</VListGroup>
                	<VListItem :to="{ path: '/add' }">
						<VListItemIcon>
							<VIcon>mdi-playlist-plus</VIcon>
						</VListItemIcon>
						<VListItemTitle>Додати</VListItemTitle>
					</VListItem>
			</VList>
		</v-navigation-drawer>
		<v-main>
			<!-- Provides the application the proper gutter -->
			<v-container
				fluid
				:style="mini ? 'padding-left: 276px;' : 'padding-left: 76px;'"
			>
				<slot></slot>
			</v-container>
		</v-main>
	</VApp>
</template>

<script>
import UserDropDown from './UserDropDown';
export default {
	components: {
		UserDropDown,
	},
	data: () => ({
		mini: true,
		specialitiesSelector: false,
	}),
};
</script>

<style lang="scss">
.listGroupMenu {
	.v-list-group__items {
		padding-left: 18px;
	}
}

.v-navigation-drawer--mini-variant {
	.listGroupMenu {
		.v-list-group__items {
			padding-left: 0;
			border-left: 3px solid;
			margin-left: -3px;
		}
	}
}
.admin-logo {
	height: 45px;
	width: 45px;
	border-radius: 25px;
	padding: 10px;
	box-shadow: 0px 1px 4px rgba(25, 118, 210, 0.2);

	img {
		height: 100%;
		width: 100%;
		object-fit: contain;
	}
}
</style>
