import Vue from 'vue'
import App from './app.vue'

import ShareData from './TestPlugin/ShareData'
import sgPlugin from './plugins'

// 所有组件都共享
let dataInfo = {
  a: 1,
  b: 2
}
Vue.use(sgPlugin)
Vue.use(ShareData)
Vue.config.productionTip = false
new Vue({
  el:'#app',
  dataInfo,
  render:h=>h(App)
})