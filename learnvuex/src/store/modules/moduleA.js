export default{
  state:{
    name:"xcy"
  },
  mutations:{
    updateName(state,payload){
      state.name = payload
    }
  },
  getters:{
    fullName(state){
      return state.name + "111111111111"
    },
    fullName2(state,getters){
      return getters.fullName + "22222222222"
    },
    fullName3(state,getters,rootState){
      return getters.fullName2+rootState.counter;
    }
  },
  actions:{
    aUpdateName(context){
      setTimeout(()=>{
        context.commit('updateName','wangwu')
      },1000)
    }
  },
}