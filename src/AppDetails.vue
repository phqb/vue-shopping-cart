<template>
    <div class="app-detail" id="app-detail" 
        v-bind:class="{ 'material-card': !loadingData }"
        v-bind:style="{ 'min-height': loadingData ? '100vh' : 'fit-content' }">
        <div class="animated-loading-text"
            v-bind:style="{ display: loadingData ? 'block' : 'none' }">
            Loading
        </div>
        <div class="app-detail-title" >{{ name }}</div>
        <div class="app-detail-wrapper" v-show="!loadingData">
            <div class="app-detail-wrapper-cover">
                <img v-bind:src="theaterImage" 
                    class="app-detail-wrapper-cover-theater">
                <div class="app-detail-wrapper-cover-thumbnails-list">
                    <slideshow-thumb 
                        v-for="thumb in thumbnails" 
                        v-bind:thumb="thumb"
                        v-bind:key="thumb.id"
                        v-bind:src="thumb.href"
                        v-on:updatethumbnailfocus="updateThumbnailFocus"
                        class="app-detail-wrapper-cover-thumbnails-list-item">
                    </slideshow-thumb>
                </div>
            </div>
            <div class="app-detail-wrapper-description">
                <img v-bind:src="image" class="app-detail-wrapper-description-image">
                <div class="app-detail-wrapper-description-wrapper-right">
                    <div class="app-detail-wrapper-description-wrapper-right-content">
                        {{ description }}
                    </div>
                    <div class="app-detail-wrapper-description-wrapper-right-price">
                        ${{ price }}
                    </div>
                    <div 
                        v-on:click="addToCart"
                        class="app-detail-wrapper-description-wrapper-right-add-to-cart-button 
                            material-button">
                        <span class="fa fa-cart-plus"></span>&nbsp; Add to cart
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import { EventBus } from './EventBus.js'
import { CartStorage }  from './CartStorage.js'
import Utils from './Utils.js'

export default {
    mounted () {
        this.loadData()
    },

    data () {
        return {
            code: "",
            name: "",
            image: "",
            price: 0,
            description: "",
            thumbnails: [],
            covers: [],
            theaterImage: "",
            loadingData: false,
            lastScrollY: Utils.getScrollTop()
        }
    },

    watch: {
        '$route' (to, from) {
            this.clearData()
            this.loadData()
        }
    },

    components: {
        'slideshow-thumb': {

            props: ["thumb"],

            data: function() {
                return {
                    focused: false
                }
            },

            template: `
                <img    
                    v-on:click="emitUpdateThumbnailFocus"
                    v-bind:class="{ 'app-detail-wrapper-cover-thumbnails-list-item-focused': focused }"
                >
            `,

            methods: {
                focus () {
                    this.focused = true
                },

                unfocus() {
                    this.focused = false
                },

                emitUpdateThumbnailFocus () {
                    this.$emit('updatethumbnailfocus', this.thumb.id)
                }
            }

        }
    },

    methods: {
        clearData () {
            this.code = ""
            this.name = ""
            this.image = ""
            this.price = 0
            this.description = ""
            this.thumbnails = []
            this.covers = []
            this.theaterImage = ""
            this.loadingData = false
            this.lastScrollY = Utils.getScrollTop()
        },

        loadData () {
            // Debounce loading data
            if (this.loadingData) return
            
            this.loadingData = true

            this.code = this.$route.params.code

            var dataRef = firebase.database().ref("/Products")
            dataRef.orderByKey()
                .equalTo(this.code.toString())
                .on("value", (snapshot) => {
                    var snapshotVal = snapshot.val()

                    if (snapshotVal) {
                        var item = snapshotVal[this.code]

                        this.price = item.price
                        this.image = item.image
                        this.description = item.description

                        if (item.thumbnails)
                            // Enumerate thumbnails
                            for (var i = 0; i < item.thumbnails.length; ++i)
                                this.thumbnails.push({
                                    href: item.thumbnails[i],
                                    id: i
                                })

                        if (item.covers) {
                            this.covers = item.covers
                            this.theaterImage = this.covers[0]

                            // Wait and focus first thumbnail
                            setTimeout(() => {
                                this.$children[0].focused = true
                            }, 250)
                        }
                    }

                    this.loadingData = false
                })
        },

        updateThumbnailFocus (thumbId) {
            this.theaterImage = this.covers[thumbId]
            _.each(this.$children, (child) => {
                if(child.thumb.id === thumbId)
                    child.focus()
                else
                    child.unfocus()
            })
        },

        addToCart () {
            // Add item to storage
            CartStorage.addItem(this.code)

            // Update counter
            EventBus.$emit('update-counter')

            // Push notification
            EventBus.$emit('push-notification', this.name + " has been added to cart.")
        }
    }
}
</script>

<style lang="sass">
@import './assets/sass/components/animated-loading-text'
@import './assets/sass/components/material-button'
@import './assets/sass/components/material-card'

.app-detail
    width: 100%
    min-height: 100vh

    &-title
        padding: 16px
        font-size: 32px
        text-align: center

    &-wrapper
        display: flex 
        flex-direction: row
        justify-content: center

        &-cover
            padding: 16px

            &-theater
                width: 600px
                height: 338px
                display: block
                margin-left: auto
                margin-right: auto

            &-thumbnails-list
                margin: 16px
                overflow-x: auto
                display: flex
                flex-direction: row
                flex-wrap: nowrap
                width: 600px

                &-item
                    flex-grow: 0
                    flex-shrink: 0
                    height: 65px
                    width: 116px
                    margin: 8px
                    cursor: pointer
                    border: 2px solid transparent

                    &-focused
                        border: 2px solid gray !important

        &-description
            width: 250px
            padding: 16px
            margin-bottom: 32px
            display: flex
            flex-direction: column

            &-image
                width: 0.5 * 460px
                height: 0.5 * 215px
                box-sizing: border-box
                flex-grow: 0
                flex-shrink: 0

            &-wrapper-right
                &-content
                    padding: 16px
                    box-sizing: border-box
                    font-size: 14px

                &-add-to-cart-button
                    width: 150px
                    font-size: 16px

                &-price
                    padding: 8px
                    display: block
                    font-weight: bold
    
        @media screen and (max-width: 950px)
            flex-direction: column
            align-items: center

            &-cover
                order: 1

            &-description
                order: 0
                width: 600px
                flex-direction: row

                &-image
                    width: 0.75 * 460px
                    height: 0.75 * 215px

                &-wrapper-right
                    &-price
                        text-align: center

                    &-add-to-cart-button
                        margin-left: auto
                        margin-right: auto
</style>
