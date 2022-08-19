import {INCREMENT} from './mutations-type'

export default {
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
}