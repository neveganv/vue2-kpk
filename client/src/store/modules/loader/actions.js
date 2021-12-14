import * as actionTypes from './types/actions';
import * as mutationTypes from './types/mutations';

export default {
  [actionTypes.SET_LOADING]: ({ commit }, value = true) => {
    commit(mutationTypes.SET_LOADING, value);
  },
};
