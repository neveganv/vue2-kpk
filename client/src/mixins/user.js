import { mapActions, mapGetters } from 'vuex';
import * as getterTypes from '@/store/modules/auth/types/getters';
import * as actionTypes from '@/store/modules/auth/types/actions';

export default {
	computed: {
		...mapGetters('auth', {
			getUser: getterTypes.GET_USER,
			permissions: getterTypes.GET_PERMISSIONS,
		}),
	},
	methods: {
		...mapActions('auth', {
			logOut: actionTypes.LOG_OUT,
		}),
	},
};
