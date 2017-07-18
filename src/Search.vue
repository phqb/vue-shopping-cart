<template>
    <div class="search-bar" id="search-bar">
        <input
            v-model="searchTerm"
            v-on:input="query"
            class="search-bar-input"
            type="text"
            placeholder="Search the store">
        <div v-for="item in searchResults" v-bind:key="item.code" class="search-bar-result">
            <router-link v-bind:to="{ name: 'app', params: { code: item.code }}">
                <div class="search-bar-result-item">
                    <img v-bind:src="item.image" 
                        class="search-bar-result-item-image">
                    <div class="search-bar-result-item-name">
                        {{ item.name }}
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'

export default {
    data () {
        return {
            debug: false,
            searching: false,
            searchTerm: '',
            lastSearchTerm: '',
            searchResults: []
        }
    },

    methods: {
        query: _.debounce(function() {
            // Clear old search results
            if (!this.searchTerm || this.searchTerm != this.lastSearchTerm)
                this.searchResults.splice(0, this.searchResults.length);

            // Nothing to search
            if (!this.searchTerm) return;

            this.searching = true;
            var dataRef = firebase.database().ref("/Products");
            dataRef
                .orderByChild("name")
                .equalTo(this.searchTerm)
                .on("value", (snapshot) => {
                    var snapshotValue = snapshot.val();
                    if (this.debug) console.log(snapshotValue);
                    if (snapshotValue) {
                        _.forInRight(snapshotValue, (v, k) => {
                            this.searchResults.push(_.assign(v, { code: k }));
                        });
                    }
                    this.searching = false;
                });

            // Update last search term
            this.lastSearchTerm = this.searchTerm;
        }, 250, { leading: false, trailing: true })
    }
}
</script>

<style lang="sass">
.search-bar 
    width: 100%
    padding: 0 32px 0 32px
    box-sizing: border-box
    vertical-align: middle
    display: inline-block
    float: right

    &:hover &-result
        display: block


    &-input 
        width: 100%
        height: 2em
        padding: 0.5em
        padding-left: 16px
        padding-right: 16px
        font-size: 16px
        color: gray
        box-sizing: border-box
        background: lighten(lightgray, 10)
        border: none
        outline: none
        transition: 0.2s

        &:focus
            background: lighten(lightgray, 5)

    &-result 
        width: 100%
        box-sizing: border-box
        display: none
        color: gray
        background: white
        box-shadow: 0 2px 3px rgba(0,0,0,0.12), 0 2px 3px rgba(0,0,0,0.24)
        margin-top: 8px

        &-item 
            box-sizing: border-box
            width: 100%
            height: 48px
            border-top: none
            padding: 0
            font-size: 14px

            &-image
                height: 48px
                width: auto
                display: inline-block
                vertical-align: middle

            &-name 
                display: inline-block
                vertical-align: middle
                padding-left: 16px
</style>
