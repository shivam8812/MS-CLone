import express from 'express'
import router from './routes';
import database from './models';
import dbconfig from './db.config.json'
import mongoose from 'mongoose';
import dotenv from 'dotenv'


const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

dotenv.config();

database.mongoose.connect(`mongodb+srv://${dbconfig.username}:${dbconfig.password}@${dbconfig.url}/${dbconfig.database}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
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