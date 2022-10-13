const { Server } = require("socket.io");

const io = new Server({
    cors: {
        origin: "http://localhost:3000",
    },
});



io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("sendGlobalMess", mess => {
        socket.local.emit("getGlobalMess", mess);
    })

    socket.on("joinRoom", room => {
        socket.join(room)
    })

    socket.on("sendMessage", (data) => {
        io.to(data.room).emit('getMessage', data.msg)
    })

    socket.on("disconnect", () => {
        console.log("a user disconnected");
    })
});


io.listen(5000);