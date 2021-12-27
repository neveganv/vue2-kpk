<template>
	<div>
		<div class="my-container mt-5">
			<VRow no-gutters aling="center" justify="space-between" class="py-2">
				<div style="width: 50px">
					<VBadge color="error" overlap right bottom text content="pre-alpha">
						<img
							:src="require('@/assets/img/main-logo.svg')"
							width="210"
							height="81"
							alt=""
							class="p-0 m-0"
						/>
					</VBadge>
				</div>

				<div class="nav">
					<div class="nav__inner">Головна</div>
					<div class="nav__inner">Про коледж</div>
					<div class="nav__inner">Студентові</div>
					<div class="nav__inner">Абітурієнту</div>
				</div>

				<div class="d-flex justify-center align-center">
					<VRow>
						<VTextField dense v-if="searchShow" v-model="search" @input="Search"/>
						<VBtn icon @click="searchShow = !searchShow">
							<VIcon> mdi-magnify</VIcon>
						</VBtn>
						<VBtn icon>
							<VIcon> mdi-menu</VIcon>
						</VBtn>
					</VRow>
				</div>
			</VRow>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		searchShow: false,
		search: ''
	}),
	methods: {
		Search(){
			this.$emit("search", this.search);
			//this.$router.push({name:'search'});
		}
	},
};
</script>

<style lang="scss" scoped>
.nav {
	color: #4b4453;

	font-family: 'Montserrat', sans-serif;
	max-width: 620px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.nav__inner {
	padding-left: 1rem;
	cursor: pointer;
}
</style>
