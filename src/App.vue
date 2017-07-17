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
        <div id="footer">
            <footer-wrapper></footer-wrapper>
        </div>
    </div>
</template>

<script>
import Navigation from './Navigation.vue'
import Notification from './Notification.vue'
import PageLoadingBar from './PageLoadingBar.vue'
import Footer from './Footer.vue'
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
        'page-loading-bar': PageLoadingBar,
        'footer-wrapper': Footer
    }
}
</script>

<style lang="sass">
body
    padding: 0
    padding-top: 10px
    margin: 0
    // font-family: 'Open Sans', sans-serif
    font-family: 'Roboto', sans-serif

#header 
    width: 100%
    height: 48px
    margin-bottom: 22px
    position: fixed
    top: 0
    left: 0
    background: white
    padding: 0
    padding-left: 10px
    padding-right: 10px
    box-sizing: border-box
    z-index: 1
    box-shadow: 0 2px 4px rgba(0,0,0,0.16), 0 2px 4px rgba(0,0,0,0.23)

#content
    color: gray
    padding: 16px
    padding-top: 32px
    max-width: 1000px
    margin-top: 48px
    margin-left: auto
    margin-right: auto
    overflow: hidden
    min-height: 100vh

#footer
    background: white
    padding: 16px
    margin: 0
    margin-top: 32px
    box-shadow: 0 -2px 4px rgba(0,0,0,0.16), 0 -2px 4px rgba(0,0,0,0.23)

    a
        &:hover, &:link, &:visited
            text-decoration: none

.footer-wrapper
    display: flex
    flex-direction: row
    align-items: center
    flex-wrap: wrap

    &-left
        color: gray
        flex-grow: 2
        text-align: center

        *
            vertical-align: middle

    &-right
        line-height: 1.5em
        color: gray
        flex-grow: 1
</style>
