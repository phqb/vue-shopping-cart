<template>
    <div id="app-review-list" class="app-review-list">
        <div class="animated-loading-text" 
            v-bind:style="{display: loadingData ? 'block' : 'none'}">
            Loading
        </div>
        <div class="app-review-list-title">
            Reviews
        </div>
        <div v-for="item in reviewList"
            v-bind:key="item.id"
            class="app-review-list-item material-card" >
            <div class="app-review-list-item-avatar">
                <img v-bind:src="item.avatar">
            </div>
            <div class="app-review-list-item-content">
                <div class="app-review-list-item-content-username">
                    {{ item.username }}
                </div>
                <div class="app-review-list-item-content-date">
                    {{ timeToDate(item.time) }}
                </div>
                <div v-html="item.content"
                    class="app-review-list-item-content-text">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import Utils from './Utils.js'
import marked from 'marked'

export default {
    data () {
        return {
            reviewList: [],
            loadingData: false,
            appCode: "",
            lastScrollY: Utils.getScrollTop(),
            scrollEventHandler: this.scrollEvent.bind(this)
        }
    },

    watch: {
        '$route' (to, from) {
            this.clearData()
            this.loadMoreData(1)
        }
    },

    methods: {
        timeToDate (time) {
            var d = new Date(0)
            d.setUTCMilliseconds(time)
            return d.toLocaleString()
        },

        clearData() {
            this.reviewList = []
            this.loadingData = false
            this.appCode = ""
            this.lastScrollY = Utils.getScrollTop()
        },

        loadMoreData (quantity) {
            if (this.loadingData) return

            this.loadingData = true

            this.appCode = this.$route.params.code

            var dataRef = firebase.database().ref("/Reviews")
            dataRef.orderByChild("app")
                .equalTo(this.appCode.toString())
                .limitToLast(this.reviewList.length + quantity)
                .on("value", (snapshot) => {
                    var snapshotVal = snapshot.val()
                    if (snapshotVal) {
                        _.forInRight(snapshotVal, (o, k) => {
                            if (k && o && !_.find(this.reviewList, { id: k })) {
                                o.content = marked(o.content, { sanitize: true })
                                this.reviewList.push(_.assign(o, { id: k }))
                            }
                        })
                    }
                    this.loadingData = false
                })
        },

        scrollEvent () {
            var st = Utils.getScrollTop()

            if (!this.loadingData && st > this.lastScrollY)
                // If the user scroll to bottom
                if (this.$el.getBoundingClientRect().top 
                    + this.$el.getBoundingClientRect().height 
                    <= Utils.getViewPortHeight())
                    this.loadMoreData(1)

            this.lastScrollY = st
        }
    },

    mounted () {
        this.loadMoreData(1)

        window.addEventListener('scroll', this.scrollEventHandler)
    },

    beforeDestroy () {
        window.removeEventListener('scroll', this.scrollEventHandler)
    }
}
</script>

<style lang="sass">
@import "./assets/sass/components/animated-loading-text"

.app-review-list
    padding: 16px

    &-title
        padding: 16px
        font-size: 24px
        text-align: center
        margin-bottom: 16px

    &-item
        display: flex
        flex-direction: row
        margin-bottom: 32px
        padding: 16px

        &-avatar
            height: 32px
            width: 32px
            padding: 16px
            padding-top: 0
            position: relative

        &-content

            &-username
                display: inline-block
                padding: 8px
                font-weight: bold

            &-date
                padding: 8px
                font-size: 12px
                display: inline-block

            &-text
                padding: 16px
                padding-left: 8px
</style>
