/**
 * Created by Bruger on 18-04-2016.
 */

module.exports = function(socket) {

    users = [];
    function broadcast(type, payload) {
        socket.broadcast.emit(type, payload)
        socket.emit(type, payload);
     }


    socket.on('set user', function (data, callback) {
        if (users.indexOf(data) != -1) {
            callback(false);
        } else {
            callback(true);
            socket.username = data;
            users.push(
                {
                    body: socket.username
                }
            );
            broadcast('users', users)
        }
        
    });
    


    socket.on('message', function(message){
        var now = new Date();
        var now_utc = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds())
        
        broadcast('message', now_utc.toTimeString().substring(0, 5)+" - "+socket.username+": "+message);
    });

};