import * as mutationTypes from './types/mutations';

export default {
  [mutationTypes.SET_LOADING]: (state, value) => {
    state.isLoading = value;
  },
};
