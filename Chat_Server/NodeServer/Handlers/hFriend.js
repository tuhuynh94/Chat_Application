var db = require('../Models/database');
//var query = require('');

var hFriend = (function () {

    var _load_friends = function (socket) {
        console.log("========== _load_friends =========");
        socket.friends = db.friends().filter(f => f.phone == socket.phone || f.friend_phone == socket.phone);
        console.log(socket.friends);
    };

    var _request_add_friend = function (io, socket, data, conn) {
        console.log("========== _response_add_friend =========");
        var sentTo = data['other_phone'];
        var otherSocket = io.sockets.sockets[sentTo];
        var other_phone = query.FindInfor(other);

        if (typeof (otherSocket) == 'undefined') {
            var sql = "INSERT INTO `invite_friend` (`from_phone`, `to_phone`, `invited_at`) VALUES ('" + socket.phone + "', '" + other_phone + "', '');";
            conn.query(sql, function (err, rows) {
                console.log("catch----: " + err);
            });
        } else {
            io.sockets.connected[otherSocket].emit('return_invite_friend', {
                form: socket.phone,
                form_username: socket.username,
                to: sentTo,
            });
        }
    };

    var _response_add_friend = function (io, socket, data) {
        console.log("========== _response_add_friend =========");
        var from = data['other_phone'];
        var otherSocket = io.sockets.sockets[from];
        if (data['is_accept']) {
            io.sockets.connected[otherSocket].emit('return_invite_friend', {
                is_accept: true
                , form: socket.phone
                , form_username: socket.username
                , to: sentTo
            });
        } else {
            io.sockets.connected[otherSocket].emit('return_invite_friend', {
                is_accept: false
                , form: socket.phone
                , form_username: socket.username
                , to: sentTo
            });
        }
    };

    var _update_new_friend = function (socket, data) {
        socket.friends.push({
            phone: data['phone']
            , friend_phone: data["friend_phone"]
            , add_at: data['add_at']
        });
    }

    var _inform_unfriend = function (socket, data) {
        console.log("========== _unfriend =========");
        var index = socket.friends.filter(f=>f.phone == data['phone'] || f.friend_phone == data['phone']);        
        socket.friends.splice(index,1);

        var otherSocket = io.sockets.sockets[data['phone']];
        io.sockets.connected[otherSocket].emit('inform_unfriend',{
            friend_phone: socket.phone
        })
    };

    var _unfriend = function (socket, data) {
        console.log("========= recieve ========")
         var index = socket.friends.filter(f=>f.phone == data['phone'] || f.friend_phone == data['phone']);        
         socket.friends.splice(index,1);
    }

    return {
        load_friends: _load_friends
        , request_add_friend: _request_add_friend
        , response_add_friend: _response_add_friend
        , update_new_friend: _update_new_friend
        , inform_unfriend: _inform_unfriend
        ,_unfriend: _unfriend
    };
})();
module.exports = hFriend;