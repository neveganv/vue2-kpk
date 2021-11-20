<template>
<div>
    <div>
	   <v-app-bar app>
	       <v-header @drawer="drawer=true" />
     </v-app-bar>
    </div>
  <div>
	<v-navigation-drawer 
	    v-model="drawer"
		absolute
		temporary
		width="350">
        <v-admin-wrapper />
    </v-navigation-drawer>	
	</div>
</div>
</template>

<script>
import VAdminWrapper from './v-admin-wrapper.vue';
import VHeader from './v-header.vue';
import user from '../../mixins/user';
export default {
	components:{
     VAdminWrapper,
	 VHeader
	},
	mixins: [user],
	data:() => ({
		drawer:false
	}),
	mounted() {
		console.log(this.drawer)
	},
};
</script>
