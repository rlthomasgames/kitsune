import {Server, Socket, Event} from "socket.io"
// import { authenticate } from "socketio-jwt-auth";
import * as http from "http";
import * as jwt from "jsonwebtoken";
import * as fflate from "fflate";
import {SOCK} from "kitsune-wrapper-library";
import {strFromU8} from "fflate";

// TODO : CLEAN INTO A PROPER ENGINE ( modular classes) FOR BETTER SERVER STRUCTURE !!!!!! - currently just vanilla :P

const secretKey = 'RIPLEY_AND_JONES'; // TODO : Look into using some php or better for generating key
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
        socket.emit(`${SOCK.AUTH_TOKEN}`, { auth_token: jwtToken })
        // socket.send({ type:MsgType.AUTH_TOKEN, auth_token: jwtToken });
        console.log(`generated jwt token ${jwtToken} and sent to ${socket.client}`);

        const sockets = await server.fetchSockets();
        console.log('check sockets.. ', sockets);
        sockets.forEach((sock)=>{
            console.log(`client ${sock.id} found in sockets`);
        });

        console.log('connection handshake', socket.handshake);
        socket.use((event: Event, next) => {
            switch(event[0] as string){
                case SOCK.GZIP_TEST:
                    const data = (event[1] as unknown) as Uint8Array;
                    const unzipped = fflate.decompressSync(data);
                    const blob = new Blob([unzipped], {type:'text/plain'});
                    blob.arrayBuffer().then((arrayBuf)=>{
                        console.log('arrayBuffer :', JSON.parse(strFromU8(new Uint8Array(arrayBuf))));
                    })
                    console.log(`gzipped string ${data} is !?!? ${blob}`, blob);
                    next();
                    return;
                default:
                    console.log('check what events come in??', event);
                    next();
                    return;
            }
        });

        socket.on("error", (err) => {
            if (err && err.message === "unauthorized event") {
                socket.disconnect();
            }
        });
    } else {
        socket.emit(SOCK.KICK, {});
    }

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