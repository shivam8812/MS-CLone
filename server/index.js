import express from 'express'
import router from './routes';
import database from './models';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import path from 'path'
dotenv.config();


const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;


database.mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

const server = require("http").createServer(app);
export const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, "../client/build")));
    // Step 2:
    app.get("*", function (request, response) {
        response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
    });
}

io.on("connection", (socket) => {
    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded")
    });

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    });

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    });
});



app.use('/api/v1', router.user)

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));