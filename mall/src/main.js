import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Fastclick from 'fastclick'

import toast from './components/common/toast/index'

Vue.config.productionTip = false

//使用vue实例作为事件总线的对象
Vue.prototype.$bus = new Vue()

Vue.use(toast)
//解决移动端300ms延迟
Fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
