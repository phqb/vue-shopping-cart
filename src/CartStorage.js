export const CartStorage = {
    
    COUNTER_KEY: "cart-counter",

    ADDED_ITEMS_KEY: "added-items",

    getCounter () {
        return window.localStorage.getItem(this.COUNTER_KEY) || 0;
    },

    getAll () {
        return JSON.parse(window.localStorage.getItem(this.ADDED_ITEMS_KEY) || '[]');
    },

    setAll (items) {
        window.localStorage.setItem(this.ADDED_ITEMS_KEY, JSON.stringify(items));
        window.localStorage.setItem(this.COUNTER_KEY, items.length);
    },

    addItem (itemCode) {
        // Update counter
        var counter = window.localStorage.getItem(this.COUNTER_KEY) || 0;
        counter = +(counter) + 1;
        window.localStorage.setItem(this.COUNTER_KEY, counter);

        // Update added items
        var addedItems = JSON.parse(window.localStorage.getItem(this.ADDED_ITEMS_KEY) || "[]");
        addedItems.push(itemCode);
        window.localStorage.setItem(this.ADDED_ITEMS_KEY, JSON.stringify(addedItems));
    }

}