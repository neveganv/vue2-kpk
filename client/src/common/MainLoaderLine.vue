<template>
	<transition name="fade">
		<div class="loader-wrapper" v-if="isLoading">
			<VProgressLinear
				 indeterminate
                color="primary"
			></VProgressLinear>
		</div>
	</transition>
</template>

<script>
import { mapGetters } from 'vuex';
import * as getterTypes from '@/store/modules/loader/types/getters';
export default {
	computed: {
		...mapGetters('loader', {
			isLoading: getterTypes.IS_LOADING,
		}),
	},
};
</script>

<style scoped>
.loader-wrapper {
	position: absolute;
	width: 100%;
	height: auto;
	left: 0;
	top: 64px;
	overflow: hidden;
	z-index: 200;
	display: flex;
	justify-content: center;
	align-items: center;
}

.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-leave-to {
	opacity: 0;
}
</style>
