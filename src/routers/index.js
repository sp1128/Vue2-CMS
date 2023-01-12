// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import User from '@/components/User.vue'
import Main from '@/components/Main.vue'
import Mall from '@/components/Mall.vue'
import PageOne from '@/components/PageOne.vue'
import PageTwo from '@/components/PageTwo.vue'
import Login from '@/components/Login.vue'
import Cookies from 'js-cookie'
import tab from '@/store/tab'

Vue.use(VueRouter)

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
    { path: '/', redirect: '/login/2' },
    {
        //主路由
        path: '/main/',
        component: Main,
        name: 'Main',
        redirect: '/main/home',
        children: [
            // 子路由
            { path: 'home', name: 'home', component: Home, props: true },//首页
            { path: 'user', name: 'user', component: User },//用户管理
            { path: 'mall', name: 'mall', component: Mall },//商品管理
            { path: 'page1', name: 'page1', component: PageOne },//页面一
            { path: 'page2', name: 'page2', component: PageTwo },//页面二
        ]
    },
    { path: '/login/:id', component: Login, props: true }

]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})
router.beforeEach((to, from, next) => {
    if (to.path.indexOf('/main') === 0) {
        const token = Cookies.get('token')
        if (token) {
            if (to.path.indexOf('user') !== -1 || to.path.indexOf('page') !== -1) {
                const menuif = tab.state.menu.some(item => {
                    return item.path === 'user'
                })
                if (menuif) {
                    next()
                } else {
                    next()
                    next('/main/home')
                }
            }
            next()
        } else {
            next()
            next('/')
        }
    } else {
        next()
    }
})
// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
export default router

// 现在，应用已经启动了！