// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import echarts from 'echarts'
import locale from 'iview/dist/locale/en-US'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from "axios";

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 30000
Vue.prototype.$axios = axios

Vue.use(iView, { locale })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
