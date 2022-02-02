import Vue from 'vue';
import App from './App.vue';
import store from '@/store';
import router from './router';
import Flicking from "@egjs/vue-flicking";
import "@egjs/vue-flicking/dist/flicking.css";
import "@egjs/vue-flicking/dist/flicking-inline.css";

Vue.use(Flicking);
//LIBRARES
import vuetify from './plugins/vuetify';
import vuelidate from 'vuelidate'
import moment from 'moment'


//DIRECTIVES
import { VueMaskDirective } from 'v-mask';

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

