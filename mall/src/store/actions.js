export default {
  addCart(context,payload) {
    // let oldProduct = null;
    // for(let item of state.cartList){
    //   if(item.iid === payload.iid){
    //     oldProduct = item
    //   }
    // }

    return new Promise((resolve,reject) => {
      let oldProduct =context.state.cartList.find(item => item.iid === payload.iid)
    
      if(oldProduct){
        // oldProduct.count += 1;
        context.commit('addCounter',oldProduct);
        resolve("该商品购物车中已存在，数量加1")
      } else {
        payload.count = 1;
        // state.cartList.push(payload);
        context.commit('addToCart',payload)
        resolve("加入购物车成功")
      }
    })
  }
}