import Vue from 'vue'
import Router from 'vue-router'

import { EventBus } from './EventBus.js'

function promiseImport(component) {
    return () => {
        EventBus.$emit('componentBeforeLoad')
        return import('./' + component + '.vue')
    }
}

const ProductList = promiseImport('ProductList')
const CartList = promiseImport('CartList')
const AppDetailsAndReviews = promiseImport('AppDetailsAndReviews')
const Login = promiseImport('Login')
const Signup = promiseImport('Signup')
const Profile = promiseImport('Profile')
const About = promiseImport('About')

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