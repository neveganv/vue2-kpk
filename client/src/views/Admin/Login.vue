<template>
	<div class="d-flex justify-center align-center w-100 h-100">
		<v-card max-width="600" class="w-25">
			<v-card-title>Авторизація</v-card-title>
			<v-card-text>
				<v-row>
					<v-col>
						<v-text-field
							dense
							outlined
							hide-details
							label="Логін"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field
							dense
							outlined
							hide-details
							label="Пароль"
						></v-text-field>
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-col>
					<v-btn color="primary">Авторизуватися</v-btn>
				</v-col>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script>
export default {};
</script>

<style></style>
