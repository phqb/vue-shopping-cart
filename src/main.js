import Vue from 'vue'
import App from './App.vue'
import router from './Router.js'

new Vue({ 
    el: '#app',
    router,
    render: (h) => h(App),
})