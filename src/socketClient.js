const io = require('socket.io-client');

export const socket = io('http://localhost:4200');

// setInterval(() => {
//     socket.emit('CLIENT_SEND_MESSAGE', Math.random());
// }, 1000);

// socket.on('CLIENT_SEND_MESSAGE', message => console.log(message));
