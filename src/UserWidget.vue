<template>
    <div class="user">
        <div v-if="!hasLogin()">
            <div class="user-avatar fa fa-user"></div>
            <div class="user-menu-wrapper">
                <ul>
                    <li>
                        <router-link to="/login">Login</router-link>
                    </li>
                    <li>
                        <router-link to="/signup">Sign up</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else>
            <div class="user-avatar">
                <img v-bind:src="getUserAvatar()">
            </div>
            <div class="user-menu-wrapper">
                <ul>
                    <li>
                        <router-link to="/profile">Profile</router-link>
                    </li>
                    <li v-on:click="logout">
                        Logout
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import User from './User.js'
import { EventBus } from './EventBus.js'
import jdenticon from 'jdenticon'
import md5 from 'blueimp-md5'

export default {
    methods: {
        hasLogin () {
            return User.hasLogin()
        },
        getUserAvatar () {
            var login = User.getLogin()
            var user = User.getUser(login.email, login.token)
            if (user)
                return user.avatar || 'data:image/svg+xml,' + jdenticon.toSvg(md5(user.email), 64)
            else
                return ''
        },
        logout () {
            User.logout()
            this.$forceUpdate()
        }
    },

    beforeCreate () {
        EventBus.$on('updateuserwidget', () => this.$forceUpdate())
    }
}
</script>

<style lang="sass">
.user
    height: 100%
    position: relative
    padding-right: 8px
    cursor: pointer
    position: relative

    &-avatar
        width: 32px
        height: 32px
        font-size: 32px !important
        color: gray
        display: block
        vertical-align: middle
        position: relative

        img
            width: 100%
            height: auto
            position: absolute
            top: 0
            left: 0

    &:hover &-menu-wrapper
        display: block

    &-menu-wrapper
        position: absolute
        right: 0
        color: gray
        width: max-content
        display: none

        ul
            list-style: none
            padding: 0
            margin: 0
            margin-top: 16px
            background: white
            margin-top: 8px
            box-shadow: 0 2px 3px rgba(0,0,0,0.12), 0 2px 3px rgba(0,0,0,0.24)

            li
                font-size: 14px
                padding: 12px
                cursor: pointer
                color: lighten(gray, 10) !important

                &:hover
                    color: gray !important
</style>
