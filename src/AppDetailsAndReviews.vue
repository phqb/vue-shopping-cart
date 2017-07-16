<template>
    <div>
        <app-details></app-details>
        <app-reviews></app-reviews>
    </div>
</template>

<script>
import { EventBus } from './EventBus.js'
import AppDetails from './AppDetails.vue'
import AppReviews from './AppReviews.vue'

export default {
    components: {
        'app-details': AppDetails,
        'app-reviews': AppReviews
    },
    mounted () {
        EventBus.$emit('componentMounted')
    }
}
</script>

