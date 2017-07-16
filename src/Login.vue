<template>
    <div id="login-form">
        <div v-if="!hasLogin" class="login-form material-card">
            <h1>Login</h1>
            <div class="material-input-wrapper">
                <input v-model="email"
                    type="text" 
                    placeholder="Email"
                    onfocus="this.placeholder=''"
                    onfocusout="this.placeholder='Email'"
                    class="material-input-wrapper-input">
                <div class="material-input-wrapper-placeholder">
                    Email
                </div>
            </div>
            <div class="material-input-wrapper">
                <input v-model="password"
                    type="password" 
                    placeholder="Password"
                    onfocus="this.placeholder=''"
                    onfocusout="this.placeholder='Password'"
                    class="material-input-wrapper-input">
                <div class="material-input-wrapper-placeholder">
                    Password
                </div>
            </div>
            <br>
            <div class="material-checkbox-wrapper" 
                onclick="this.firstElementChild.firstElementChild.classList.toggle('material-checkbox-wrapper-checkbox-dot-checked')">
                <div class="material-checkbox-wrapper-checkbox">
                    <div class="material-checkbox-wrapper-checkbox-dot material-checkbox-wrapper-checkbox-dot-checked"></div>
                </div>
                <div class="material-checkbox-wrapper-text">Remember me</div>
            </div>
            <br><br>
            <button v-on:click="login"
                class="material-button login-form-login-button">
                <span v-if="loading" class="fa fa-circle-o-notch fa-spin"></span>&nbsp; Login
            </button>
            <br>
            <div v-if="!loading && loginMessage">
                {{ loginMessage }}
            </div>
        </div>
        <div v-else>
            What are you doing here?
        </div>
    </div>
</template>

<script>
import User from './User.js'
import { EventBus } from './EventBus.js'

export default {
    data () {
        return {
            email: "",
            password: "",
            hasLogin: User.hasLogin(),
            loginMessage: "",
            loading: false,
            loginFired: false
        }
    },
    
    methods: {
        login () {
            if (!this.email || !this.password)
                this.loginMessage =
                    "You must enter your email and password."
            else if (!loginFired) {
                this.loading = true
                this.loginFired = true
                var user = User.hasUser(this.email)
                setTimeout(() => {
                    if (user && User.validUser(this.email, this.password)) {
                        User.login(this.email, this.password)
                        this.loginMessage =
                            "Login successfully. Redirecting ..."
                        EventBus.$emit('updateuserwidget')
                        setTimeout(() => window.location.replace("/"), 2000)
                    } else {
                        this.loginMessage =
                            "There was an error with your login details. Please try again."
                    }
                    this.loading = false
                }, 1000)
            }
        }
    },

    mounted () {
        EventBus.$emit('componentMounted')
    }
}
</script>

<style lang="sass">
@import "./assets/sass/components/material-card"
@import "./assets/sass/components/material-button"
@import "./assets/sass/components/material-checkbox"
@import "./assets/sass/components/material-input"

.login-form
    width: 400px
    padding: 32px
    margin-left: auto
    margin-right: auto

    &-login-button
        width: 200px
        margin-left: auto
        margin-right: auto
        display: block
</style>

