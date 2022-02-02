<template>
	<div>
		<VRow class="mt-5" no-gutters justify="space-around" justify-lg="space-between" >
			<VCol
				v-for="(specialitie, index) in specialitites"
				:key="index"
				cols="auto"
				class="px-5 mb-5"
			>
				<MySpecialitiesCard
					:specialitie="specialitie"
					:indexSpecialitie="index + 1"
					:edit="true"
					@edit="editSpecialities"
				/>
			</VCol>
		</VRow>
	</div>
</template>

<script>
import MySpecialitiesCard from '@/components/Main/UI/my-specialities-card.vue';

export default {
	components: {
		MySpecialitiesCard,
	},
	props: {
		specialitites: {
			require: true,
		},
	},
	methods: {
		editSpecialities(id){
			this.$emit('edit', id)
		}
	}
};
</script>

<style></style>
