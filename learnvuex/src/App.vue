<template>
  <div id="app">

    <h2>**********modules**************</h2>
    <h2>{{$store.state.a.name}}</h2>
    <button @click="updateName">修改名字</button>
    <h3>{{$store.getters.fullName}}</h3>
    <h3>{{$store.getters.fullName2}}</h3>
    <h3>{{$store.getters.fullName3}}</h3>
    <button @click="aUpdateName">异步修改名字</button>

    <h2>************************</h2>

    {{$store.state.counter}}
    <button @click="add">+</button>
    <button @click="addCount(5)">+5</button>
    <button @click="dec">-</button>
    <button @click="addStu">添加学生</button>


    <h2>info内容</h2>
    <button @click="updateInfo">修改信息</button>
    <h2>{{$store.state.info}}</h2>



    <h2>**********getters**************</h2>
    <h3>{{$store.getters.powerCounter}}</h3>
    <h3>{{more20stu}}</h3>
    <h3>{{$store.getters.more20stu}}</h3>
    <h3>{{$store.getters.more20stuLength}}</h3>
    <h3>**********************</h3>
    <h3>{{$store.getters.moreAgeStu(18)}}</h3>

    <h2>**********HelloVuex**************</h2>
    <HelloVuex></HelloVuex>
  </div>
</template>

<script>
import HelloVuex from './components/HelloVuex'
import {INCREMENT} from './store/mutations-type.js'
export default {
  name: 'App',
  components: {
    HelloVuex
  },
  data(){
    return{
      meseage: "123"
    }
  },
  computed: {
    more20stu(){
      return this.$store.state.students.filter(s=>{
        return s.age >= 20;
      })
    }
  },
  methods:{
    add(){
      this.$store.commit(INCREMENT)
    },
    dec(){
      this.$store.commit('decrement')
    },
    addCount(count){
      //普通提交风格
      // this.$store.commit('incrementCount',count)

      //特殊提交风格
      this.$store.commit({
        type: 'incrementCount',
        count
      })
    },
    addStu(){
      const stu = {id: 114,name: "xyz5", age:33}
      this.$store.commit('addStu',stu)
    },
    updateInfo(){
      // this.$store.commit('updateInfo')
      // this.$store.dispatch('asyncUpdateInfo','我是payload')


      // this.$store.dispatch('asyncUpdateInfo',{
      //   message: "xinxi",
      //   success:()=>{
      //     console.log("完成")
      //   }
      // })

      this.$store.dispatch('asyncUpdateInfo','我是携带的参数')
      .then(res =>{
        console.log("里面完成了异步提交");
        console.log(res);
      })
    },
    updateName(){
      this.$store.commit('updateName',"123")
    },
    aUpdateName(){
      this.$store.dispatch('aUpdateName') 
    } 
  }
}
</script>

<style>

</style>
