// 公共方法抽取

 
//防抖函数  防止函数短时间内频繁调用,等待一段时间
export function debounce(func,delay){

    let timer = null;
    return function(...args){
      if(timer) clearTimeout(timer)

      timer = setTimeout(()=>{
        func.apply(this, args)
      },delay)
    }
  }