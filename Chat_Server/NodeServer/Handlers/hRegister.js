
const Client = require('authy-client').Client;
const authy = new Client({
    key: '229D9wObUA8tWTVw6rDOeLqq15mQdgLU' });

const enums = require('authy-client').enums;


var hRegister = (function () {
    var _request = function (socket, data) {
        console.log("========== REQUEST =========");
        authy.startPhoneVerification({ countryCode: 'VN', locale: 'vn', phone: socket.phone, via: enums.verificationVia.SMS }, function (err, res) {
            if (err) {
                socket.emit('return_verfication_code', {
                  success: false
                });
            } else {
              socket.emit('return_verfication_code', {
                  success: true
                });
            }
        });
    }   

    var _respose = function (socket, data) {
        console.log("========== RESPOSE =========");
        authy.verifyPhone({ countryCode: 'VN', phone: socket.phone, token: data['code'] }, function (err, res) {
            if (err) {
                console.log(err)
                socket.emit('return_verfication', {
                  success: false
                });
            } else {
              socket.emit('return_verfication', {
                  success: true
                  ,code: data['code']
                });
            }
        });
    }    

    return {
        request: _request,
        respose: _respose
    };
})();
module.exports = hRegister;