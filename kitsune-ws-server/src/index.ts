import {Server, Socket} from "socket.io"
// import { authenticate } from "socketio-jwt-auth";
import * as http from "http";


const httpServer = http.createServer()
const server: Server = new Server(httpServer, {
    transports: ["websocket", "polling"],
    cors: {
        origin: 'http://localhost:8080',
        methods: ["GET", "POST"]
    }
});

server.on('connection', (socket: Socket) => {
    console.log('connection', socket);
    socket.use((packet, next: (err: Error) => void) => {
        console.log('incoming packet...', packet);

    })
    /*
    authenticate({
        secret:'SECRET_KEY'
    }, (payload, done) => {
        console.log('verify ---> ', payload, done);
    })

     */
});
server.on('authenticated', (socket: Socket) => {
    //this socket is authenticated, we are good to handle more events from it.
    console.log(`Hello! ${socket}`);
});

httpServer.listen(3000);

console.log('running ws server');