<template>
    <div class="cart-list" id="cart-list">
        <div v-bind:style="{ display: loadingItems ? 'block' : 'none' }"
            class="animated-loading-text">
            Loading
        </div>
        <div v-for="item in cartItems" 
            v-bind:key="item.code"
            class="cart-list-item material-card">
            <router-link v-bind:to="{ name: 'app', params: { code: item.code }}">
                <div class="cart-list-item-wrapper-left">
                    <img v-bind:src="item.image" alt="" class="cart-list-item-image">
                    <h1 class="cart-list-item-name">{{ item.name }}</h1>
                </div>
            </router-link>
            <div class="cart-list-item-wrapper-right">
                <p class="cart-list-item-price">${{ item.price }}</p>
                <div v-on:click="removeItem(item)" 
                    class="cart-list-item-remove-button fa fa-remove">
                </div>
            </div>
        </div>
        <button v-if="hasItem()"
            v-on:click="checkOut"
            class="cart-list-checkout-button material-button">
            <span class="fa fa-credit-card"></span>&nbsp; Checkout
        </button>
        <div v-else>
            There is nothing in your cart. <router-link to="/">Go shopping</router-link> and add some!.
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import { EventBus } from './EventBus.js'
import { CartStorage } from './CartStorage.js'
import Authentication from './Authentication.js'
import User from './User.js'

export default {
    data () {
        return {
            cartItems: [],
            loadingItems: false
        }
    },

    watch: {
        cartItems: {
            handler (cartItems) {
                CartStorage.setAll(_.flatMap(cartItems, (e) => e.code))
                EventBus.$emit('update-counter')
            },
            deep: true
        }
    },

    methods: {
        hasItem () {
            return CartStorage.getCounter() != 0
        },

        /**
         * Load cart informations from server
         */
        loadData () {
            if (this.loadingItems) return
            this.loadingItems = true
            
            var addedItems = CartStorage.getAll()
            if (!addedItems.length) {
                this.loadingItems = false
                return
            }

            var dataRef = firebase.database().ref("/Products")
            var loadedCount = 0

            // Load cart informations from server by codes
            for (var i = 0; i < addedItems.length; ++i) {
                let code = addedItems[i]
                dataRef.orderByKey()
                    .equalTo(code.toString())
                    .on("value", (snapshot) => {
                        loadedCount += 1
                        if (loadedCount === addedItems.length)
                            this.loadingItems = false
                        if (snapshot.val()) {
                            var item = snapshot.val()[code]
                            item.code = code
                            this.cartItems.push(item)
                        }
                    })
            }
        },

        /**
         * Remove item event delegation
         */
        removeItem (item) {
            // Remove item node
            this.cartItems.splice(this.cartItems.indexOf(item), 1)

            // Push a notification
            EventBus.$emit('push-notification', item.name + " has been removed from cart")
        },

        checkOut () {
            if (!User.hasLogin())
                // pageSwitcher.switchTo("/login.html?next=/cart.html", "Login")
                EventBus.$emit('push-notification', 'Please login to continue to checkout.')
            else if (!this.hasItem) {
                EventBus.$emit('push-notification', 'There is nothing to checkout!')
            } else {
                let login = User.getLogin()
                if (Authentication.validate(login.email, login.token)) {
                    User.addPurchases(login.email, _.flatMap(this.cartItems, (e) => e.code))
                    this.cartItems = []
                    EventBus.$emit('push-notification', "Done. Thank you for your purchases!")
                } else
                    EventBus.$emit('push-notification', "There was an error with your login details. Please try again.")
            }
        }
    },

    mounted () {
        EventBus.$emit('componentMounted')
        this.loadData()
    }
}
</script>

<style lang="sass">
@import './assets/sass/components/animated-loading-text'
@import './assets/sass/components/material-button'
@import './assets/sass/components/material-card'

.cart-list 
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
            font-size: 16px
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
        margin-left: auto
        margin-right: auto
        display: block
</style>
