<template>
	<div>
		<VRow>
			<div class="my-title">
				<VBadge top overlap color="purple darken-2" content="Новинка">
					Інформація про коледж
				</VBadge>
			</div>
		</VRow>
		<div>
			<MainNewsCategoryList />
		</div>
        <div>
            <NewsList />
        </div>
	</div>
</template>

<script>
import MainNewsCategoryList from './MainNewsCategoryList';
import NewsList from './NewsList';
export default {
	components: {
		MainNewsCategoryList,
        NewsList
	},
};
</script>

<style lang="scss" scoped></style>
