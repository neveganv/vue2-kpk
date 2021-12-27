<template>
	<transition name="fade">
		    <div class="main-wrapper" v-if="isLoading">
		<div class="loader-wrapper">
			<VProgressLinear
				 indeterminate
                color="primary"
			></VProgressLinear>
		</div>
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
.main-wrapper{
  width: 100%;
  height: 64px;
  left: 0;
  top: 0;
  z-index: 200;
  position: absolute;
  cursor:wait;
}

.loader-wrapper {
  position: absolute;
  top: 64px;
  left: 0;
  height: auto;
  width: 100%;
  z-index: 200;
}

.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-leave-to {
	opacity: 0;
}
</style>
