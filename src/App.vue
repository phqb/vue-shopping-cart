<template>
    <div>
        <div id="header">
            <page-loading-bar></page-loading-bar>
            <notification></notification>
            <navigation></navigation>
        </div>
        <div id="content">
            <router-view></router-view> 
        </div>
    </div>
</template>

<script>
import Navigation from './Navigation.vue'
import Notification from './Notification.vue'
import PageLoadingBar from './PageLoadingBar.vue'
import { EventBus } from './EventBus.js'

export default {
    name: 'App',

    watch: {
        '$route' (to, from) {
            EventBus.$emit('componentBeforeRoute')
        }
    },

    components: {
        'navigation': Navigation,
        'notification': Notification,
        'page-loading-bar': PageLoadingBar
    }
}
</script>

<style lang="sass">

</style>
