import {Server, Socket, Event} from "socket.io"
// import { authenticate } from "socketio-jwt-auth";
import * as http from "http";
import * as jwt from "jsonwebtoken";
import {AUTH_TOKEN} from "kitsune-wrapper-library/dist/base/constants/SockConn";

const secretKey = 'RIPLEY_AND_JONES';
const httpServer = http.createServer()
const server: Server = new Server(httpServer, {
    cookie: true,
    transports: ["websocket", "polling"],
    cors: {
        origin: 'http://localhost:8080',
        methods: ["GET", "POST"]
    }
});
server.on('connection', async (socket: Socket) => {
    if (socket.handshake.auth && socket.handshake.auth.token) {
        const jwtToken = jwt.sign({
            id: socket.handshake.auth.sessionId,
        }, secretKey, {
            expiresIn: '1h'
        });
        socket.emit(`${AUTH_TOKEN}`, { auth_token: jwtToken })
        // socket.send({ type:MsgType.AUTH_TOKEN, auth_token: jwtToken });
        console.log(`generated jwt token ${jwtToken} and sent to ${socket.client}`);
    }
    const sockets = await server.fetchSockets();
    console.log('check sockets.. ', sockets);
    sockets.forEach((sock)=>{
        console.log(`client ${sock.id} found in sockets`);
    });

    console.log('connection handshake', socket.handshake);
    socket.use((event: Event, next) => {
        console.log('check what events come in??', event);
        next();
    });

    socket.on("error", (err) => {
        if (err && err.message === "unauthorized event") {
            socket.disconnect();
        }
    });
    if(socket.handshake.auth) {
        console.log('CASE A : can authourize ?', socket.handshake);
    }
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

server.listen(3000);

console.log('running ws server');