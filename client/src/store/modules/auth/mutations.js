import { userNormalizer } from '@/mixins/normalizer/index.js';
import * as mutationTypes from './types/mutations';

export default {
	[mutationTypes.FETCH_USER]: (state, user) => {
		state.user = userNormalizer(user);
	},
	[mutationTypes.LOG_OUT]: async (state) => {
		console.log(state.user)
		state.user = null;
		console.log(state.user)
	  },
};
