<template>
    <div class="notification-list" id="notification-list">
        <div v-for="noti in noties" v-bind:key="noti.id" class="notification-list-item material-card">
            {{ noti.text }}
        </div>
    </div>
</template>

<script>
import { EventBus } from './EventBus.js'

export default {
    name: 'notification',
    data () {
        return {
            noties: [],
            count: 0
        }
    },
    methods: {
        push: function(text) {
            this.noties.push({ text: text, id: this.count++ });

            // Auto dequeue notifications after 2 seconds
            setTimeout(function() {
                this.noties.splice(0, 1);
            }.bind(this), 2000);
        }
    },
    beforeCreate () {
        EventBus.$on('push-notification', (text) => {
            this.push(text)
        })
    }
}
</script>

<style lang="sass">
.notification-list
    width: 400px
    height: fit-content
    position: fixed
    top: 0
    right: 0
    z-index: 2
    padding: 10px

    &-item
        font-size: 16px
        padding: 10px
        color: gray
        margin-bottom: 10px
        background: white
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
</style>
