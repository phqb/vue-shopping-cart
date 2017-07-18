<template>
    <div v-bind:style="{ width: percent + '%', top: enable ? '0' : '-4px' }" class="page-loading-bar"></div>
</template>

<script>
import { EventBus } from './EventBus.js'

export default {
    data () {
        return {
            percent: 0,
            enable: true
        }  
    },

    methods: {
        setPercent (percent) {
            if (!this.enable)
                this.enable = true
            this.percent = percent
            if (percent === 100)
                setTimeout(() => {
                    this.enable = false
                    this.percent = 0
                }, 500)
        },

        increasePercent (increment) {
            if (this.percent + increment > 100)
                this.percent = 100
            else
                this.percent += increment
        }
    },

    beforeCreate () {
        EventBus.$on('componentBeforeLoad', () => this.setPercent(60 + 20*Math.random()))
        EventBus.$on('componentBeforeRoute', () => this.increasePercent(20*Math.random()))
        EventBus.$on('componentMounted', () => this.setPercent(100))
    },

    mounted () {
        this.$el.style.transistionDuration = '0.5s'
    }
}
</script>

<style lang="sass">
.page-loading-bar
    height: 4px
    position: fixed
    top: 0
    left: 0
    background: gray
    z-index: 1
    transition: width 0.5s
</style>
