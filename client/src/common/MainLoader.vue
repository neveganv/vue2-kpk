<template>
	<transition name="fade">
		<div class="loader-wrapper" v-if="isLoading">
			<VProgressCircular
            
				:size="70"
				:width="7"
				indeterminate
				class="loader"
				color="primary"
			></VProgressCircular>
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

<style>
.loader-wrapper {
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	background: white;
	overflow: hidden;
	z-index: 200;
}
.loader {
	top: 50%;
	left: 50%;
}
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-leave-to {
	opacity: 0;
}
</style>
