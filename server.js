const io = require('socket.io')(4200);

const arrUsername = [];
const arrUser = [];

io.on('connection', socket => {
    let socketUsername;

    socket.emit('LIST_USER', arrUsername);

    socket.on('CLIENT_SEND_MESSAGE', message => {
        io.emit('SERVER_SEND_MESSAGE', 'You: ' + message);
    });

    socket.on('CLIENT_SEND_PRIVATE_MESSAGE', ({ message, activeUser }) => {
        const user = arrUser.find(u => u.username === activeUser);
        const { id } = user;
        socket.to(id).emit('SERVER_SEND_MESSAGE', message);
    });

    socket.on('CLIENT_SIGN_IN', username => {
        const isExisted = arrUsername.indexOf(username) !== -1;
        if (isExisted) return socket.emit('CONFIRM_USERNAME', false);
        socketUsername = username;
        io.emit('NEW_USER', username);
        arrUsername.push(username);
        arrUser.push({ username, id: socket.id });
        socket.emit('CONFIRM_USERNAME', true);
    });

    socket.on('disconnect', () => {
        if (!socketUsername) return;
        io.emit('USER_DISCONNECT', socketUsername);
        const index = arrUsername.indexOf(socketUsername);
        arrUsername.splice(index, 1);
        arrUser.splice(index, 1);
    });
});

// 1. Gui mang arrUsername khi vua ket noi
// 2. Moi khi ai dang ky thanh cong, emit ve cho tat ca user
// 3. Khi ma ai do disconnect, xoa khoi mang
