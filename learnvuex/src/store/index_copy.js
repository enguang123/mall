import Vue from 'vue'
import Vuex from 'vuex'
import {INCREMENT} from './mutations-type'
Vue.use(Vuex)

//创建module对象
const moduleA = {
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

export default new Vuex.Store({
  state: {
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
  },
  getters: {
    powerCounter(state){
      return state.counter*state.counter
    },
    more20stu(state){
      return state.students.filter(s => s.age>20)
    },
    more20stuLength(state,getters){
      return getters.more20stu.length;
    },
    moreAgeStu(state){
      return function(age){
        return state.students.filter(s=> s.age > age)
      }
    }
  },
  mutations: {
    //方法
    [INCREMENT](state){
      state.counter++
    },
    decrement(state){
      state.counter--
    },
    // incrementCount(state, count){
    //   state.counter+= count
    // },
    incrementCount(state, payload){
      state.counter+= payload.count
    },
    addStu(state,stu){
      state.students.push(stu)
    },
    updateInfo(state){
      state.info.name = 'wyr'
      // state.info['address'] = "sihong"  不能响应
      // Vue.set(state.info,"address","sihong")   //响应式写法
      // delete state.info.age;          不能响应
      // Vue.delete(state.info,"age")
    }
  },
  actions: {
    // asyncUpdateInfo(context,payload){//上下文
    //   setTimeout(()=>{
    //     context.commit('updateInfo'),
    //     console.log(payload)
    //   },1000)
    // }

    // asyncUpdateInfo(context,payload){//上下文
    //   setTimeout(()=>{
    //     context.commit('updateInfo'),
    //     console.log(payload.message),
    //     payload.success()
    //   },1000)
    // }

    asyncUpdateInfo(context,payload){//上下文
      return new Promise((resolve,reject)=>{
       setTimeout(()=>{
         context.commit('updateInfo');
         console.log(payload);
         resolve('11111')
       },1000)
      })
     }

  },
  modules: { 
    a: moduleA
  }
})
