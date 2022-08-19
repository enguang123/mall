export default{
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
}