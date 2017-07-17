import _ from 'lodash'
import Authentication from './Authentication'
import md5 from 'blueimp-md5'

export default {

    login (email, password) {
        if (this.hasUser(email)) {
            window.localStorage.setItem("user-token", md5(password))
            window.localStorage.setItem("user-email", email)
        }
    },

    logout () {
        window.localStorage.removeItem("user-token")
        window.localStorage.removeItem("user-email")
    },

    hasLogin () {
        return window.localStorage.getItem("user-token")
            && window.localStorage.getItem("user-email") ? true : false
    },

    getLogin () {
        return { 
            username: window.localStorage.getItem("user-username"),
            email: window.localStorage.getItem("user-email"),
            token: window.localStorage.getItem("user-token")
        }
    },

    getDatabase () {
        return JSON.parse(window.localStorage.getItem("users-database") || "[]")
    },

    hasUser (email) {
        return _.find(this.getDatabase(), { email: email }) ? true : false
    },

    validUser (email, password) {
        return _.find(this.getDatabase(), { email: email, password: password }) 
            ? true : false
    },

    getUser (email, token) {
        if (Authentication.validate(email, token))
            return _.find(this.getDatabase(), { email: email })
        else
            return null
    },

    addUser (data) {
        var db = this.getDatabase()
        db.push(data)
        window.localStorage.setItem("users-database", JSON.stringify(db))
    },

    addPurchases (email, purchases) {
        if (!this.hasLogin())
            return
        var login = this.getLogin()
        if (Authentication.validate(login.email, login.token)) {
            var purchasesDb = 
                JSON.parse(window.localStorage.getItem("purchase-db") || "{}")
            if (purchasesDb[email])
                purchasesDb[email] = _.concat(purchasesDb[email], purchases)
            else
                purchasesDb[email] = purchases
            window.localStorage.setItem("purchase-db", JSON.stringify(purchasesDb))
        }
    },

    getPurchases (email) {
        if (!this.hasLogin())
            return []
        var login = this.getLogin()
        if (Authentication.validate(login.email, login.token)) {
            var purchasesDb = 
                JSON.parse(window.localStorage.getItem("purchase-db") || "{}")
            return purchasesDb[email] || []
        }
    }

}