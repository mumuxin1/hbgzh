import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'
import './styles/mix.scss'
import 'lib-flexible/flexible.js'
import {
  Select,
  DatePicker,
  Option,
  TimePicker,
  Loading,
  Tooltip,
  Button
} from 'element-ui'
Vue.use(Select)
  .use(Option)
  .use(DatePicker)
  .use(TimePicker)
  .use(Loading)
  .use(Tooltip)
  .use(Button)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

;
(function () {
  // var rem = document.createElement('script')
  // rem.src = './rem.js'
  // document.body.appendChild(rem)
  var lastTime = 0
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  })
  document.addEventListener('touchend', function (event) {
    var nowTime = (new Date()).getTime()
    if (nowTime - lastTime <= 300) {
      event.preventDefault()
    }
    lastTime = nowTime
  }, false)

  // 解决safari自带放大功能：阻止双指放大
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault()
  })
})()
