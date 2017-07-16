<template>
    <div v-bind:key="item.code"
        v-on:click="emitFocusEvent"
        v-bind:class="{ 'product-list-item-large ': focused }"
        class="product-list-item material-card">
        <img v-bind:src="item.image" class="product-list-item-cover">
        <div class="product-list-item-popup" v-bind:style="{ display: focused ? 'block' : 'none' }">
            <router-link v-bind:to="{ name: 'app', params: { code: item.code }}">
                <div class="product-list-item-popup-title">
                    {{ item.name }} &nbsp;
                    <small><small><span class="fa fa-info-circle">&nbsp; Tap to view details</span></small></small>
                </div>
            </router-link>
            <p class="product-list-item-popup-description">
                {{ item.description }}
            </p>
            <div class="product-list-item-popup-price">
                ${{ item.price }}
            </div>
            <div v-on:click="addToCart(item)"
                class="product-list-item-popup-add-to-cart-button material-button">
                <span class="fa fa-cart-plus"></span>&nbsp; Add to cart
            </div>
        </div>
    </div>
</template>

<script>
import { CartStorage } from './CartStorage.js'
import { EventBus } from './EventBus.js'

export default {
    props: ["item"],

    data () {
        return {
            focused: false
        }
    },

    methods: {
        
        emitFocusEvent () {
            this.$emit('updatechildfocus', this.item.code)
        },

        focus () {
            this.focused = true
        },
        
        unfocus () {
            this.focused = false
        },
        
        addToCart () {
            // Add item to storage
            CartStorage.addItem(this.item.code);

            // Update counter
            EventBus.$emit('update-counter')

            // Push notification
            EventBus.$emit('push-notification', this.item.name + " has been added to cart.");
        }

    }
}
</script>

<style lang="sass">
.product-list 
    &-item
        width: 250px
        height: 117px
        margin: 32px
        background: white
        position: relative
        transition-duration: 0.2s

        &-cover 
            width: 100%
            height: 100%

        &-popup
            width: 100%
            display: none
            background: white
            padding: 16px
            box-sizing: border-box

            a
                &:hover, &:visited, &:link
                    text-decoration: none
                    color: gray

            &-title
                font-size: 20px
                width: 100%
                box-sizing: border-box
                background: white

            &-price 
                font-size: 14px
                font-weight: bold
                padding: 8px

            &-add-to-cart-button
                width: 100%
                box-sizing: border-box
                text-align: center

            &-description
                font-size: 14px
                width: 100%
                padding: 10px
                color: gray
                background: white
                box-sizing: border-box

    &-item-large
        width: 460px
        height: fit-content
        margin-left: calc(50% - 230px)
        margin-right: calc(50% - 230px)
</style>
