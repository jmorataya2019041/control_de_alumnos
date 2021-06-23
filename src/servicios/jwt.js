'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta'

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().date(1,'years').unix()
    }

    return jwt.encode(payload, secret);
}