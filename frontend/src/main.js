import Vue from 'vue'
import App from './App.vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import router from './router'
import 'uno.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

Vue.use(VXETable)

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

router.beforeEach((to, form, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

new Vue({
  render: (h) => h(App),
  pinia,
  router,
}).$mount('#app')
