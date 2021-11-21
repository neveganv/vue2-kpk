<template>
	<div class="h-auto">
		<div class="d-flex justify-space-between p-1 align-center">
			<VBtn text color="primary">Головна сторінка</VBtn>
			<VBtn color="primary" outlined @click="visible = true">
				<VIcon left>mdi-account-plus</VIcon>Додати нового користувача</VBtn
			>
		</div>
		<VDivider />
		<add-users-dialog :visible="visible" @close="visible = false" />
	</div>
</template>

<script>
import AddUsersDialog from './AddUsersDialog.vue';

export default {
	components: { AddUsersDialog },

	data: () => ({
		visible: false,
	}),
};
</script>
