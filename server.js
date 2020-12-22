/* var app = require('express')();
var http = require('http').createServer(app);
const PORT = 5000;
var io = require('socket.io')(http);
const STATIC_CHANNELS = ['global_notifications', 'global_chat'];

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client *
    console.log('new client connected');
    socket.emit('connection', null);
});
*/
