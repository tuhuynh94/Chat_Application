var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
server.listen(3000, "0.0.0.0");

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chat',
    charset: 'utf8_general_ci'
});

var db = require('./Models/database');
var hClient = require('./Handlers/hClient');
var hUser = require('./Handlers/hUser');
var hRegister = require('./Handlers/hRegister');
var hFriend = require('./Handlers/hFriend');
setTimeout(function(){
    console.log("all users ----"+ db.users().length);
    console.log("all conversations ----"+ db.conversations().length);
    console.log("all friends ----"+ db.friends().length);
    console.log("all invite_friends ----"+ db.invite_friends().length);
    console.log("all message_seen ----"+ db.message_seen().length);
    console.log("all messages ----"+ db.messages().length);
},1000);

io.on('connection',function(socket){
    //console.log(socket.client.conn.id + ", ip : " + socket.handshake.address);
    console.log(">>>>>>>>>> Join <<<<<<<<<");

    socket.on('connect_to_server', function (data) {        
        console.log("connected devices");
        hClient.connect(socket,data);
    });

    socket.on('disconnect', function (data) {
        console.log("disconnect devices");
        hClient.disconnect(socket,data);
    });

    //-------------------- sent request to get verification code
    socket.on('request', function (data) {
        socket.phone = data["phone"];
        hRegister.request(socket, data);
    });
    //-------------------- sent verification code to verification
    socket.on('respose', function (data) {
        hRegister.respose(socket, data);
    });
    //-------------------- register
    socket.on('register', function (data) {
        console.log("---------- register ---------------");
        hUser.register(socket, data, connection);
    });
    //-------------------- login
    socket.on('login', function (data) {
        console.log("----------------- user login --------------");
        hUser.login(socket, data, connection);
    });
    //-------------------- forgot_pass
    socket.on('forgot_pass', function (data) {
        hRegister.request(socket,data);
    });
    //-------------------- request_add_friend
    socket.on('request_add_friend', function (data) {
        hFriend.request_add_friend(io, socket, data, connection);
    });
    //-------------------- response_add_friend
    socket.on('response_add_friend', function (data) {
        hFriend.response_add_friend(io, socket, data);
    });
    //-------------------- unfriend
    socket.on('unfriend', function (data) {
        hFriend.inform_unfriend(io, socket, data);
    });
    //--------------------recive unfriend
    socket.on('unfriend', function (data) {
        hFriend._unfriend(io, socket, data);
    });
});
