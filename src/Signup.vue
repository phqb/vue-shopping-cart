<template>
    <div>
        <div v-if="!hasLogin" class="signup-form material-card">
            <h1>Signup</h1>
            <div class="material-input-wrapper">
                <input 
                    v-model="email"
                    type="text" 
                    placeholder="Email"
                    onfocus="this.placeholder=''"
                    onfocusout="this.placeholder='Email'"
                    class="material-input-wrapper-input">
                <div class="material-input-wrapper-placeholder">
                    Email
                </div>
                <div v-if="!emailAccepted" class="signup-form-tooltip">
                    Invalid email
                </div>
            </div>
            <div class="material-input-wrapper">
                <input 
                    v-model="password"
                    type="password" 
                    placeholder="Password"
                    onfocus="this.placeholder=''"
                    onfocusout="this.placeholder='Password'"
                    class="material-input-wrapper-input">
                <div class="material-input-wrapper-placeholder">
                    Password
                </div>
                <div v-if="!passwordAccepted" class="signup-form-tooltip">
                    Password must have at least an uppercase character, 
                    a lowercase character, a number and a special character 
                </div>
            </div>
            <div class="material-input-wrapper">
                <input 
                    v-model="retypePassword"
                    type="password" 
                    placeholder="Retype password"
                    onfocus="this.placeholder=''"
                    onfocusout="this.placeholder='Retype password'"
                    class="material-input-wrapper-input">
                <div class="material-input-wrapper-placeholder">
                    Retype password
                </div>
                <div v-if="!passwordsMatched" class="signup-form-tooltip">
                    Passwords don't match
                </div>
            </div>
            <br>
            <small><a href="https://termsfeed.com/terms-conditions/5862adc8e937bea52d4591c4c0a4d285" target="_blank">Terms and Conditions</a></small><br><br>
            <div class="material-checkbox-wrapper" 
                v-on:click="toggleTermCheckbox">
                <div class="material-checkbox-wrapper-checkbox">
                    <div
                        v-bind:class="{ 'material-checkbox-wrapper-checkbox-dot-checked': haveReadTerm }"
                        class="material-checkbox-wrapper-checkbox-dot">
                    </div>
                </div>
                <div class="material-checkbox-wrapper-text">
                    <small>
                        I have read <b>the terms and conditions</b> and agreed.
                    </small>
                </div>
            </div>
            <br><br>
            <button v-on:click="signup"
                class="material-button login-form-login-button">
                <span v-if="loading" class="fa fa-circle-o-notch fa-spin"></span>&nbsp; Signup
            </button>
            <br>
            <div v-if="signupMessage">
                {{ signupMessage }}
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
            retypePassword: "",
            loading: false,
            signupMessage: "",
            haveReadTerm: false,
            signupFired: false,
            hasLogin: User.hasLogin()
        }
    },

    computed: {
        emailAccepted () {
            return !this.email
                || /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/i
                .test(this.email)
        },
        passwordAccepted () {
            return !this.password 
                || /(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*[0-9].*).*\W.*/
                .test(this.password)
        },
        passwordsMatched () {
            if (this.password && this.retypePassword)
                if (this.password !== this.retypePassword)
                    return false
            return true
        }
    },

    methods: {
        toggleTermCheckbox () {
            this.haveReadTerm = !this.haveReadTerm
        },
        signup () {
            if (this.signupFired) 
                return

            if (this.email 
                && this.password 
                && this.retypePassword
                && this.emailAccepted 
                && this.passwordAccepted
                && this.passwordsMatched) 
            {
                if (!this.haveReadTerm)
                    this.signupMessage =
                        "You must read and agree the terms and condidions."
                else {
                    this.loading = true
                    setTimeout(() => {
                        this.loading = false
                        if (User.hasUser(this.email))
                            this.signupMessage = 
                                "Sorry, there is existing an account with this email."
                        else {
                            this.signupFired = true
                            User.addUser({
                                email: this.email,
                                password: this.password
                            })
                            this.signupMessage =
                                "Signed up successfully. Redirecting to login page ..."
                        }

                    }, 1000)
                }
            } else
                this.signupMessage =
                    "You must enter your email and password"
        }
    },

    mounted () {
        EventBus.$emit('componentMounted')
    },

    beforeCreate () {
        EventBus.$emit('componentLoaded')
    }
}
</script>

<style lang="sass">
@import "./assets/sass/components/material-card"
@import "./assets/sass/components/material-button"
@import "./assets/sass/components/material-checkbox"
@import "./assets/sass/components/material-input"

.signup-form
    width: 400px
    padding: 32px
    margin-left: auto
    margin-right: auto

    &-tooltip
        position: absolute
        top: -22px
        right: 0
        color: red
        font-weight: bold
        font-size: 12px
        text-align: right
        width: calc(100% - 64px)    
</style>
