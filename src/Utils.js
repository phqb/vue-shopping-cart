export default {
    getViewPortHeight () {
        return Math.max(
            document.documentElement.clientHeight, window.innerHeight || 0
        );
    },

    getScrollTop () {
        return window.pageYOffset || document.documentElement.scrollTop;
    }
}