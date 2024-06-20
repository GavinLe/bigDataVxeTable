import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决ncaught (in promise) NavigationDuplicated 问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch((err) => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalReplace.call(this, location, onResolve, onReject)
  }
  return originalReplace.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/',
    redirect: '/vtable',
  },
  {
    path: '/index',
    name: 'Index',
    hidden: true,
    meta: {
      name: '页面一',
    },
    component: () => import('/@/views/Index.vue'),
  },

  {
    path: '/test',
    name: 'Test',
    hidden: true,
    meta: {
      name: '页面二',
    },
    component: () => import('/@/views/Test.vue'),
  },
  {
    path: '/vtable',
    name: 'Vtable',
    hidden: true,
    meta: {
      name: '大数据表格',
    },
    component: () => import('/@/views/VTable.vue'),
  },
]

const createRouter = () =>
  new VueRouter({
    mode: 'history',
    routes: constantRoutes,
  })

const router = createRouter()


export default router
