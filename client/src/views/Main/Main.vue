<template>
<div>
	<MainComponent />
	<VBtn  color="error" :to ="{path:'/admin'}">Перейти на адмінку</VBtn>
</div>
</template>

<script>
import MainComponent from '@/components/Main/MainComponent'
export default {
	components:{
		MainComponent
	}
};
</script>

<style></style>
