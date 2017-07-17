<template>
    <div class="page-loading-bar"></div>
</template>

<script>
import { EventBus } from './EventBus.js'

export default {
    methods: {
        enable () {
            this.$el.style.transistionDuration = '0.5s'
        },

        disable () {
            this.$el.style.transistionDuration = '0s'
        },

        setPercent (percent) {
            this.$el.style.width = percent + '%'
        },

        updatePercent (percent) {
            this.enable()
            this.setPercent(percent)
            if (percent === 100)
                setTimeout(() => {
                    this.disable()
                    this.setPercent(0)
                }, 500)
        }
    },

    beforeCreate () {
        EventBus.$on('componentBeforeRoute', () => this.updatePercent(70 - 20*Math.random()))
        EventBus.$on('componentMounted', () => this.updatePercent(100))
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
</style>
