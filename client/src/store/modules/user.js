import usersService from '@/request/users/usersService'
export default{
    actions:{
       async getUser(ctx){
            const user = await usersService.getClientsList(10);
            console.log(user)
            ctx.commit('updateUser',user)
        }
    
    },
    mutations:{
        updateUser(state,user){
            state.user = user
        }
    },
    state:{
        user:[]
    },
    getters:{
        AllUser(state){
            return state.user
        }
    },
}