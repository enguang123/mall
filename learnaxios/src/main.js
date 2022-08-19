import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

//1.基本使用
// axios({
//   url:'http://123.207.32.32:8000/home/multidata',
//   method: 'get'
// }).then(res =>{
//   console.log(res);
// })


//2.使用全局配置进行网络请求
// axios.defaults.baseURL = 'http://123.207.32.32:8000'
// axios.defaults.timeout = 5000
// //2.并发请求
// axios.all([
//   axios({
//     url:'/home/multidata',
//   }),
//   axios({
//     url:'/home/data',
//     params:{
//       type: "sell",
//       page: 5
//   }})
// // ]).then(results =>{
// //   console.log(results);
// // })
// ]).then(axios.spread((res1, res2) => {
//   console.log(res1);
//   console.log(res2)
// }))

//3.创建axios实例
// const instance1 = axios.create({
//    baseURL: 'http://123.207.32.32:8000',
//    timeout: 5000
// })

// instance1({
//   url:'/home/multidata',
// }).then(res=>{
//   console.log(res)
// })

// instance1({
//   url:'/home/data',
//   params:{
//     type: "pop",
//     page: 1
//   }
// }).then(res=>{
//   console.log(res)
// })


//封装axios模块

import {request} from './network/request'

// f1
// request({
//   url: '/home/multidata'
// }, res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })

// f2
// request({
//   baseConfig: {
//     url: '/home/multidata'
//   },
//   success: function(res){
//     console.log(res)
//   },
//   failure: function(err){
//     console.log(err)
//   }
// })


request({
    url: '/home/multidata'
  }).then(res => {
    console.log(res)
  }).catch(err=>{
    console.log(err)
  })