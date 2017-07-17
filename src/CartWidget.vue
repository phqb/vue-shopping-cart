<template>
    <div class="cart-button fa fa-shopping-cart">
        <div class="cart-counter" id="cart-counter">
            {{ counter }}
        </div>
    </div>
</template>

<script>
import { EventBus } from './EventBus.js'
import { CartStorage } from './CartStorage.js'

export default {
    data () {
        return {
            counter: CartStorage.getCounter()
        }
    },
    beforeCreate () {
        EventBus.$on('update-counter', () => {
            this.counter = CartStorage.getCounter()
        })
    }
}
</script>

<style lang="sass">
.cart-button
    font-size: 24px
    height: 24px
    text-decoration: none
    color: gray
    margin-left: 32px
    margin-top: 6px
    position: relative

.cart-counter 
    background: darkgray
    color: white
    border-radius: 100%
    text-align: center
    height: 2em
    min-width: 2em
    font-size: 8px
    padding: 0.5em
    position: absolute
    right: -8px
    top: -6px
    box-sizing: border-box
</style>

