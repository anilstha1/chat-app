import {createServer} from "node:http";
import next from "next";
import {Server} from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 8000;
// when using middleware `hostname` and `port` must be provided below
const app = next({dev, hostname, port});
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  // Configure CORS in the Socket.IO server
  const io = new Server(httpServer, {
    cors: {
      origin: "*", // Allow all origins
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("register", (user) => {
      console.log(`${user.username} is connected`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    socket.on("sendMessage", ({sender, message, gif}) => {
      console.log(sender, message, gif);
      socket.broadcast.emit("message", {sender, message, gif});
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`Server is running on http://${hostname}:${port}`);
    });
});
