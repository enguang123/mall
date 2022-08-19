import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './actions'
import getters from './getters'
import moduleA from './modules/moduleA'

Vue.use(Vuex)

//创建module对象
const state = {
  counter: 1000,
  students:[
    {id: 110,name: "xyz", age:18},
    {id: 111,name: "xyz2", age:16},
    {id: 112,name: "xyz3", age:19},
    {id: 113,name: "xyz4", age:28},
  ],
  info:{
    name:"xyz",
    age:25,
    height: 174
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: { 
    a: moduleA
  }
})
