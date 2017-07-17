import _ from 'lodash'
import User from './User.js'
import md5 from 'blueimp-md5'

export default {

    validate (email, token) {
        return _.find(User.getDatabase(), function(o) {
            return o.email === email && md5(o.password) === token;
        }) ? true : false;
    }

};