import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import toast from "./components/common/toast/index"

import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload, {
  //懒加载默认图片
  loading: require('./assets/img/common/Xin_Vs_Code.jpg')
})

Vue.config.productionTip = false
Vue.use(toast);
Vue.prototype.$bus = new Vue()
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')