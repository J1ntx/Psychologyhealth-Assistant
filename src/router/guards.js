export const setupRouterGuards = (router) => {
  // 路由前置守卫
  router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    // 当前用户是否登录
    if (token) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      // 如果是后台用户
      if (userInfo.userType === 2) {
        if (to.path.startsWith('/back')) {
          next()
        } else {
          next('/back/dashboard')
        }
      } else if (userInfo.userType === 1) {
        // 用户端的账号只能访问前台的路由
        if (to.path.startsWith('/back') || to.path.startsWith('/auth')) {
          next('/')
        } else {
          next()
        }
      }
    } else {
      if (to.path.startsWith('/back')) {
        next('/auth/login')
      } else {
        next()
      }
    }
  })
}
