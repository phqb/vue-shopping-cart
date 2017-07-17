<template>
    <div class="navigation-bar">
        <div class="navigation-bar-wrapper-left">
            <router-link to="/" title="Welcome to Steem" 
                class="navigation-bar-wrapper-left-logo-and-title">
                <div class="navigation-bar-wrapper-left-logo"></div><!--
                --><div class="navigation-bar-wrapper-left-title">Steem</div>
            </router-link>
            <div class="navigation-bar-wrapper-left-item-wrapper">
                <router-link to="/"
                    v-bind:style="{ 'font-weight': this.$route.path === '/' ? 'bold' : 'normal' }"
                    class="navigation-bar-wrapper-left-item-wrapper-item"
                    title="Welcome to Steem">
                    Store
                </router-link>
                <a switcher
                    href="/community.html" 
                    class="navigation-bar-wrapper-left-item-wrapper-item">
                    Community
                </a>
                <router-link to="/about"
                    v-bind:style="{ 'font-weight': this.$route.path === '/about' ? 'bold' : 'normal' }"
                    class="navigation-bar-wrapper-left-item-wrapper-item" 
                    title="Steem, The Ultimate Online Game Platform">
                    About
                </router-link>
                <a switcher
                    href="/support.html" 
                    class="navigation-bar-wrapper-left-item-wrapper-item">
                    Support
                </a>
            </div>
        </div>
        <div class="navigation-bar-wrapper-middle">
            <router-link to="/cart">
                <cart-widget></cart-widget>
            </router-link>
            <search-bar></search-bar>
        </div>
        <div class="navigation-bar-wrapper-right">
            <user-icon></user-icon>
        </div>
    </div>
</template>

<script>
import Search from './Search.vue'
import UserWidget from './UserWidget.vue'
import CartWidget from './CartWidget.vue'

export default {
    components: {
        'search-bar': Search,
        'user-icon': UserWidget,
        'cart-widget': CartWidget
    }
}
</script>


<style lang="sass">
@import './assets/sass/helpers/variables'

.navigation-bar
    width: 100%
    height: 48px
    display: flex
    flex-direction: row
    align-items: center

    &-wrapper-left
        min-width: fit-content
        display: flex
        flex-direction: row
        align-self: flex-start
        align-items: center

        &-logo 
            background-image: url(./assets/icons/steam-logo.png)
            background-size: 48px 48px
            width: 48px
            height: 48px
            vertical-align: middle
            display: inline-block

        &-title 
            font-size: 32px
            padding-left: 16px
            padding-right: 16px
            box-sizing: border-box
            color: gray
            vertical-align: middle
            display: inline-block
            background: white

        &-item-wrapper
            display: flex
            flex-direction: row
            background: white
            transition-duration: 0.2s

            &-item
                font-size: 14px
                padding: 12px
                color: lighten(gray, 10) !important

                &:hover
                    color: gray !important

    @media screen and (max-width: $narrow-page-width)
        &-wrapper-left
            top: 0
            flex-direction: column
            align-items: flex-start

            &:hover &-item-wrapper
                display: flex

            &-item-wrapper
                position: relative
                flex-direction: column
                margin-left: 64px
                display: none
                box-shadow: 0 2px 3px rgba(0,0,0,0.12), 0 2px 3px rgba(0,0,0,0.24)

            &-title
                &:after
                    content: "\f078"
                    font-family: Font Awesome
                    font-size: 16px
                    padding: 8px
                    padding-left: 16px
                    position: absolute

    &-wrapper-left, &-wrapper-right
        flex-grow: 0

    &-wrapper-middle
        flex-grow: 1
        display: flex
        align-self: flex-start
        padding-top: 8px

    a, a:visited 
        text-decoration: none
        color: gray
</style>
