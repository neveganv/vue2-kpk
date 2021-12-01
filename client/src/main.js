import Vue from 'vue';
import App from './App.vue';
import store from '@/store';
import router from './router';
import vuetify from './plugins/vuetify';
import vuelidate from 'vuelidate'
import { VueMaskDirective } from 'v-mask';
import moment from 'moment'

Vue.directive('mask', VueMaskDirective);
Vue.prototype.moment = moment

Vue.config.productionTip = false;

new Vue({
	router,
	vuetify,
	vuelidate,
	store,
	render: h => h(App),
}).$mount('#app');
