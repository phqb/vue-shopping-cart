<template>
    <div class="product-list">
        <div class="animated-loading-text" 
            v-bind:style="{ display: loadingMoreData ? 'block' : 'none' }">
            Loading
        </div>
        <product
            v-for="item in productItems"
            v-bind:item="item"
            v-bind:key="item.code"
            v-on:updatechildfocus="updateChildFocus"
        ></product>
    </div>
</template>

<script>
import _ from 'lodash'
import Product from './Product.vue'
import Utils from './Utils.js'
import { EventBus } from './EventBus.js'

export default {
    name: 'ProductList',

    data () {
        return {
            debug: false,
            productItems: [],
            loadingMoreData: false,
            lastScrollY: Utils.getScrollTop(),
            scrollEventHandler: this.scrollEvent.bind(this)
        }
    },

    components: {
        product: Product
    },

    methods: {
        loadMoreData (quantity) {
            // Debounce loading data
            if (this.loadingMoreData) return

            var dataRef = firebase.database().ref("/Products")

            if (this.debug) console.log("Loading started")
            this.loadingMoreData = true

            var query = dataRef.orderByKey()

            if (this.productItems.length)
                query = query.endAt("" + (_.last(this.productItems).code - 1))

            query.limitToLast(quantity)
                 .on("value", (snapshot) => {
                    var snapshotData = snapshot.val()

                    _.forInRight(snapshotData, (v, k) => {
                        this.productItems.push(_.assign(v, { code: k }));
                    })

                    this.loadingMoreData = false

                    dataRef.off("value")

                    if (this.debug) console.log("Loading completed")
                })
        },

        updateChildFocus (childCode) {
            _.each(this.$children, (child) => {
                if (child.item.code === childCode)
                    child.focus()
                else
                    child.unfocus()
            })
        },

        scrollEvent  (e) {
            var st = Utils.getScrollTop();
            if (!this.loadingMoreData && st > this.lastScrollY) {;
                var boundingBox = this.$el.getBoundingClientRect();
                var boundingTop = boundingBox.top;
                var boundingHeight = boundingBox.height;

                // If the user scroll to bottom
                if (boundingTop + boundingHeight <= Utils.getViewPortHeight())
                    this.loadMoreData(10);
            }
            this.lastScrollY = st;
        }
    },

    mounted () {
        EventBus.$emit('componentMounted')
        this.loadMoreData(10)
        window.addEventListener('scroll', this.scrollEventHandler)
    },

    beforeCreate () {
        EventBus.$emit('componentLoaded')
    },

    beforeDestroy () {
        window.removeEventListener('scroll', this.scrollEventHandler)
    }
}
</script>

<style lang="sass">
@import './assets/sass/components/animated-loading-text'
@import './assets/sass/components/material-card'
@import './assets/sass/components/material-button'

.product-list 
    min-height: 100vh
    display: flex
    flex-direction: row
    width: 100%
    justify-content: space-around
    flex-wrap: wrap
    align-items: center
</style>

