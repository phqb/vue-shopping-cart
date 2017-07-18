<template>
    <div v-if="hasLogin()" class="profile">
        <div class="profile-info" id="profile">
            <h2>Profile</h2>
            <img v-bind:src="getUserAvatar()" class="profile-info-avatar">
            <h2>{{ username }}</h2>
            <h4>Location: {{ location }}</h4>
            <h4>Join date: {{ joinDate }}</h4>
        </div>
        <div class="profile-apps">
            <h2>Purchased apps</h2>
            <purchased-list></purchased-list>
        </div>
    </div>
    <div v-else>
        Please <router-link to="/login">login</router-link> to continue.
    </div>
</template>

<script>
import { EventBus } from './EventBus.js'
import User from './User.js'
import PurchasedList from './PurchasedList.vue'
import jdenticon from 'jdenticon'
import md5 from 'blueimp-md5'

export default {
    components: {
        'purchased-list': PurchasedList
    },

    data () {
        return {
            email: '',
            username: '',
            location: '',
            joinDate: ''
        }
    },

    methods: {
        hasLogin () {
            return User.hasLogin();
        },
        getUserAvatar () {
            return 'data:image/svg+xml,' + jdenticon.toSvg(md5(this.email), 256)
        },
        loadData () {
            var login = User.getLogin()
            var user = User.getUser(login.email, login.token)
            if (user) {
                this.email = user.email
                this.username = user.username
                this.location = user.location
                this.joinDate = (new Date(user.joinDate)).toDateString()
            }
        }
    },

    mounted () {
        EventBus.$emit('componentMounted')
        this.loadData()
    },

    beforeCreate () {
        EventBus.$emit('componentLoaded')
        EventBus.$on('logout', () => this.$forceUpdate())
    }
}
</script>

<style lang="sass">
.profile
    width: 100%
    display: flex
    flex-wrap: wrap

    &-info
        width: 300px

        &-avatar
            width: 256px
            height: auto

    &-apps
        width: calc(100% - 300px)
        min-width: 500px
</style>
