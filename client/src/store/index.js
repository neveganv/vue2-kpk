import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import loader from './modules/loader';
import user from './user.js'; // це треба забрати потім
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		auth,
		loader,
		user
	},
	plugins: [createPersistedState()]

});
