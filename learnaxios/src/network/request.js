import axios from 'axios'

// f1
// export function request(config,success, failure){
//   //1.创建axios实例
//   const instance1 = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })

//   //发送真正的网络请求
//   instance1(config)
//   .then(res => {
//     success(res)
//   })
//   .catch(err => {
//     failure(err)
//   })
// }

// f2
// export function request(config){
//   //1.创建axios实例
//   const instance1 = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })

//   //发送真正的网络请求
//   instance1(config.baseConfig)
//   .then(res => {
//     config.success(res)
//   })
//   .catch(err => {
//     config.failure(err)
//   })
// }


// export function request(config){
//   return new Promise((resolve, reject)=>{
//     //1.创建axios实例
//     const instance1 = axios.create({
//       baseURL: 'http://123.207.32.32:8000',
//       timeout: 5000
//     })

//     //发送真正的网络请求
//     instance1(config)
//     .then(res => {
//       resolve(res)
//     })
//     .catch(err => {
//       reject(err)
//     })
//   })
// }

export function request(config){

    const instance1 = axios.create({
      baseURL: 'http://123.207.32.32:8000',
      timeout: 5000
    })

    //拦截器
    instance1.interceptors.request.use(res => {
      // console.log(res);
      return res;
    },err =>{
      // console.log(err)
    });

    instance1.interceptors.response.use(res =>{
      console.log(res);
      return res.data;
    },err => {
      console.log(err)
    });

    //发送真正的网络请求
    return instance1(config)
}

