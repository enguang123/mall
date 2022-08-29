import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from './components/common/toast/index'

Vue.config.productionTip = false

//使用vue实例作为事件总线的对象
Vue.prototype.$bus = new Vue()

Vue.use(toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
