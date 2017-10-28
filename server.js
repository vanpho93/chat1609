const io = require('socket.io')(4200);

const arrUsername = [];

io.on('connection', socket => {
    socket.on('CLIENT_SEND_MESSAGE', message => {
        io.emit('SERVER_SEND_MESSAGE', 'You: ' + message);
    });

    socket.on('CLIENT_SIGN_IN', username => {
        const isExisted = arrUsername.indexOf(username) !== -1;
        if (isExisted) return socket.emit('CONFIRM_USERNAME', false);
        arrUsername.push(username);
        socket.emit('CONFIRM_USERNAME', true);
    });
});

// 1. Client gui username
// 2. Kiem tra ton tai // indexOf
// 3. Neu chua ton tai, emit cho client doi state isLoggedIn, push vao arrUsername
// 4. Neu da ton tai, emit cho client bao loi, alert ra loi
