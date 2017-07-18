<template>
    <div>
        <div id="about-page1" class="about-page">
            <div class="transparent-box" style="width: fit-content">
                <h1>WELLCOME TO STEEM</h1>
                <p>The ultimate entertainment platform.</p>
                <p>Play, connect, create and more.</p>
                <p>Install Steem today and start gaming!</p><br><br>
                <button class="about-page-button material-button">Install Steem now</button>
                <p><small>Also available for <a href=" ">Windows</a>, and <a href=" ">Mac</a>.</small></p>
            </div>
        </div>
        <div id="about-page2" class="about-page">
            <div id="about-page2-left" class="about-page-left"></div>
            <div id="about-page2-right" class="about-page-right">
                <h1>Instant Access to Games</h1>
                <p style="line-height: 2em">We have thousands of games from Action to Indie and everything in-between.
                Enjoy exclusive deals, automatic game updates and other great perks.</p><br><br>
                <button class="about-page-button material-button">Browse games</button>
            </div>
        </div>
        <div id="about-page3" class="about-page">
            <div id="about-page3-left" class="about-page-left">
                <h1>Join the Community</h1>
                <p style="line-height: 2em">Meet new people, join game groups, form clans, chat in-game and more! With over 100 million potential friends (or enemies), the fun never stops.</p>
                <br><br>
                <button class="about-page-button material-button">Join the community</button>
            </div>
            <div id="about-page3-right" class="about-page-right"></div>
        </div>
        <div id="about-page4" class="about-page">
            <div class="transparent-box" style="width: 50%; text-align: right">
                <h1>Create and Share Content</h1>
                <p style="line-height: 2em">
                    Gift your friends, trade items, and even create new content for games in the Steam Workshop. Help shape the future of your favorite games.
                </p>
            </div>
        </div>
        <div id="about-page5" class="about-page">
            <h2 style="line-height: 2em">Well, what the heck are you waiting for?
            Join Steem today and gain access to even more features.</h2>
            <br><br>
            <button class="about-page-button material-button">Install Steem now</button>
            <p><small>Also available for <a href=" ">Windows</a>, and <a href=" ">Mac</a>.</small></p>
        </div>
    </div>
</template>

<script>
import { EventBus } from './EventBus.js'
import Utils from './Utils.js'

export default {
    data () {
        return {
            lastScrollY: Utils.getScrollTop(),
            lastPage: 1,
            scrollEventHandler: this.scrollEvent.bind(this)
        }
    },

    methods: {
        scrollEvent () {
            // Get current scroll
            var st = Utils.getScrollTop()

            // Get viewport height
            var vh = Utils.getViewPortHeight()

            // If scrolling down
            if (st > this.lastScrollY) {
                // Find first snapped page from bottom to top
                for (var p = 5; p > 0; --p)
                    if (document.getElementById("about-page" + p)
                        .getBoundingClientRect().top <= vh)
                        break
            } else 
            // If scrolling up
            if (st < this.lastScrollY) {
                // Find first snapped page from top to bottom
                for (var p = 1; p <= 5; ++p)
                    if (document.getElementById("about-page" + p)
                        .getBoundingClientRect().bottom >= 84)
                        break
            }

            // Scroll to that page (p)
            if (p != this.lastPage) {
                this.lastPage = p
                window.scrollTo(0, (p - 1) * (vh - 10 - 64))
            }

            // Update last scoll Y
            this.lastScrollY = st
        }
    },

    mounted () {
        EventBus.$emit('componentMounted')
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
@import "./assets/sass/components/material-button"

.about-page 
    width: 100%
    height: calc(100vh - 96px - 10px)
    padding: 32px
    box-sizing: border-box
    margin-bottom: 32px

    &-left, &-right
        position: relative
        transition-duration: 0.2s

    &-left
        left: -100vw

    &-right
        right: -100vw

    &:hover &-left
        left: 0

    &:hover &-right
        right: 0

#about-page1 
    background-image: url(./assets/images/Touhou.full.483834.jpg)
    background-position: left top
    background-blend-mode: overlay
    background-size: auto 100%
    background-repeat: no-repeat

#about-page2-left
    width: 50% 
    height: 100% 
    float: left 
    background-image: url(./assets/images/luck_star.png)
    background-position: left top
    background-size: auto 100%
    background-repeat: no-repeat

#about-page2-right
    width: 50%
    text-align: right
    float: right

#about-page3-left
    width: 50%
    height: 100%
    float: left

#about-page3-right 
    width: 50% 
    height: 100% 
    text-align: right 
    float: right 
    background-image: url(./assets/images/watamote.jpg)
    background-repeat: no-repeat
    background-position: right top

#about-page4 
    background-image: url(./assets/images/1931d9d28656a24221678b4f2d5d766a.jpg)
    background-size: 100% auto
    background-position: left top
    background-repeat: no-repeat

.page-button
    padding: 16px 
    font-size: 14px 

.transparent-box 
    background: rgba(255,255,255,0.75)
    padding: 32px
</style>
