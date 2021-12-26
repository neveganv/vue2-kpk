import usersService from '@/request/users/usersService'
import * as actionTypes from './types/actions';
import * as mutationTypes from './types/mutations';

export default{
    [actionTypes.FETCH_USER]: async({commit},userToken) => {
        const user = await usersService.getOne(userToken)
        commit(mutationTypes.FETCH_USER,user)
    },
    [actionTypes.LOG_IN]: async ({ commit }, userToken) => {
        const user = await authService.logIn(payload);
        commit(mutationTypes.FETCH_USER, user);
      },
    [actionTypes.LOG_OUT]: ({commit}) => {
        commit(mutationTypes.LOG_OUT);
    }
}