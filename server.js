const port = process.env.PORT || 5000;
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: [
            'http://localhost:3000',
            'https://orders-products.netlify.app/',
        ],
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true,
    },
});

let sessions = 0;

io.on('connection', socket => {
    sessions++;
    io.emit('sessions', sessions);

    socket.on('disconnect', () => {
        sessions--;
        io.emit('sessions', sessions);
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
