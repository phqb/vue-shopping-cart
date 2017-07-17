<template>
    <div v-if="hasLogin()" class="purchased-list">
        <div v-bind:style="{ display: loadingItems ? 'block' : 'none' }"
            class="animated-loading-text">
            Loading
        </div>
        <div v-if="hasItem()">
            <div v-for="item in purchasedItems"
                v-bind:key="item.code"
                class="purchased-list-item material-card">
                <router-link v-bind:to="{ name: 'app', params: { code: item.code }}">
                    <div class="purchased-list-item-wrapper-left">
                        <img v-bind:src="item.image" alt="" class="purchased-list-item-image">
                        <h1 class="purchased-list-item-name">{{ item.name }}</h1>
                    </div>
                    <div class="purchased-list-item-wrapper-right">
                        <p class="purchased-list-item-price">${{ item.price }}</p>
                    </div>
                </router-link>
            </div>
        </div>
        <div v-else>
            You haven't purchased any apps. <router-link to="/">Go shopping</router-link> and add some!.
        </div>
    </div>  
</template>

<script>
import User from './User.js'

export default {
    data () {
        return {
            purchasedItems: [],
            loadingItems: false
        }
    },

    methods: {
        hasLogin () {
            return User.hasLogin()
        },

        hasItem () {
            return this.purchasedItems.length != 0
        },

        /**
         * Load cart informations from server
         */
        loadData () {
            if (this.loadingItems) 
                return

            this.loadingItems = true
            
            var purchased = User.getPurchases(User.getLogin().email)
            if (!purchased.length) {
                this.loadingItems = false
                return
            }

            var dataRef = firebase.database().ref("/Products")
            var loadedCount = 0

            // Load cart informations from server by codes
            for (var i = 0; i < purchased.length; ++i) {
                let code = purchased[i]
                dataRef.orderByKey()
                    .equalTo(code.toString())
                    .on("value", (snapshot) => {
                        loadedCount += 1
                        if (loadedCount === purchased.length)
                            this.loadingItems = false
                        if (snapshot.val()) {
                            var item = snapshot.val()[code]
                            item.code = code
                            this.purchasedItems.push(item)
                        }
                    })
            }
        },
    },

    mounted () {
        this.loadData()
    }
}
</script>

<style lang="sass">
@import './assets/sass/components/animated-loading-text'
@import './assets/sass/components/material-button'
@import './assets/sass/components/material-card'

.purchased-list 
    min-height: 100vh

    &-item 
        height: 48px
        margin-top: 16px
        margin-bottom: 16px

        a, a:hover, a:link, a:visited
            color: gray

        &-image 
            width: auto
            height: 100%
            vertical-align: middle
            display: inline-block

        &-name 
            margin: 0
            vertical-align: middle
            font-weight: normal
            display: inline-block
            font-size: 16px
            padding-left: 16px
        
        &-price 
            vertical-align: middle
            padding-right: 16px
            display: inline-block
            font-weight: bold

        &-remove-button 
            width: 48px
            font-size: 32px
            cursor: pointer
            display: inline-block
            vertical-align: middle
            text-align: center

        &-wrapper-left 
            float: left
            margin: 0
            height: 100%

        &-wrapper-right 
            float: right
            margin: 0
            height: 100%

    &-checkout-button 
        width: 200px
        font-size: 20px
        margin-left: auto
        margin-right: auto
        display: block
</style>
