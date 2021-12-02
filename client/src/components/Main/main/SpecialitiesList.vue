<template>
	<div>
        <VRow justify="space-between" class="mt-5"> 
		<VCol v-for="specialitie in specialities" :key="specialitie.id" cols="12" md=4>
			<MySpecialitiesCard :specialitie="specialitie" />
		</VCol>
        </VRow>
	</div>
</template>

<script>
import MySpecialitiesCard from './../UI/my-specialities-card.vue';
export default {
	data: () => ({
		specialities: [
			{
				id: 1,
				number: '01',
				title: 'Інженерія програмного забезпечення',
			},
			{
				id: 2,
				number: '02',
				title: 'Автоматизація та комп’ютерні технології',
			},
			{ id: 3, number: '03', title: 'Менеджмент' },
			{ id: 4, number: '04', title: 'Маркетинг' },
			{
				id: 5,
				number: '05',
				title: 'Облік і оподаткування',
			},
		],
	}),
	components: {
		MySpecialitiesCard,
	},
};
</script>

<style></style>
