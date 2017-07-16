import Vue from 'vue'
import Router from 'vue-router'

const ProductList = () => import('./ProductList.vue')
const CartList = () => import('./CartList.vue')
const AppDetailsAndReviews = () => import('./AppDetailsAndReviews.vue')
const Login = () => import('./Login.vue')
const Signup = () => import('./Signup.vue')
const Profile = () => import('./Profile.vue')
const About = () => import('./About.vue')

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: ProductList },
        { path: '/about', component: About },
        { path: '/cart', component: CartList },
        { path: '/login', component: Login },
        { path: '/signup', component: Signup },
        { path: '/profile', component: Profile },
        { name: 'app', path: '/app/:code', component: AppDetailsAndReviews }
    ]
})