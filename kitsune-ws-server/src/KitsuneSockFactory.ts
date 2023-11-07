import {Event, Server, Socket} from "socket.io"
import * as jwt from "jsonwebtoken";
import * as http from "http";
import {SOCK} from "kitsune-wrapper-library";
import * as fflate from "fflate";
import {strFromU8} from "fflate";
import {KVerboseLog} from "./index";

export type SockEventHandler = (event: Event, next) => void;

export const defaultEventHandler = (event: Event, next) => {
    console.log(`server received ${event}`);
    console.log(`${event.map((value, index, array) => {
        console.log(`map: ${value} | index: ${index} | array: ${array}`);
    })}`);
    switch (event[0] as string) {
        case SOCK.GZIP_TEST:
            const data = (event[1] as unknown) as Uint8Array;
            console.log(KVerboseLog.log(`${SOCK.GZIP_TEST} recieved data : gzipped : ${data} `));
            const unzipped = fflate.decompressSync(data);
            const blob = new Blob([unzipped], {type: 'text/plain'});
            blob.arrayBuffer().then((arrayBuf) => {
                const asString = strFromU8(new Uint8Array(arrayBuf));
                console.log(`UNZIPPED:`);
                console.log(
                    `${KVerboseLog.log("as Uint8Array :") + "\n"}${KVerboseLog.log(unzipped + "") + "\n"}${KVerboseLog.log("as String :") + "\n"}${KVerboseLog.log(`${asString}`) + "\n"}${KVerboseLog.log("as JSON object :")}`
                );
                console.log(JSON.parse(asString));
            })
            next();
            return;
        default:
            console.log('check what events come in??', event);
            next();
            return;
    }
};

export class KitsuneSockFactory {
    static async createServer(eventHandler: SockEventHandler): Promise<KitsuneSock> {
        const promise: Promise<KitsuneSock> = new Promise<KitsuneSock>((resolve, reject) => {
            const secretKey = this.generateSecretFromCookie();
            const httpServer = http.createServer();
            const server = new Server(httpServer, {
                cookie: true,
                transports: ["websocket", "polling"],
                cors: {
                    origin: 'http://localhost:8080',
                    methods: ["GET", "POST"]
                }
            });
            server.on(SOCK.CONNECTION, async (socket: Socket) => {
                if (socket.handshake.auth && socket.handshake.auth.token) {
                    const jwtToken = jwt.sign({
                        id: socket.handshake.auth.sessionId,
                    }, secretKey, {
                        expiresIn: '1h'
                    });
                    socket.emit(`${SOCK.AUTH_TOKEN}`, {auth_token: jwtToken});

                    // socket.send({ type:MsgType.AUTH_TOKEN, auth_token: jwtToken });
                    // console.log(`generated jwt token ${jwtToken} and sent to ${socket.client}`);

                    const sockets = await server.fetchSockets();
                    // console.log('check sockets.. ', sockets);
                    sockets.forEach((sock) => {
                        console.log(`client ${sock.id} found in sockets`);
                    });

                    console.log('connection handshake', socket.handshake);
                    socket.use(eventHandler);
                    socket.on("error", (err) => {
                        if (err && err.message === "unauthorized event") {
                            socket.disconnect();
                        }
                    });
                    resolve(new KitsuneSock(secretKey, server, socket));
                } else {
                    socket.emit(SOCK.KICK, {});
                }
            });
            server.listen(3000);

        })
        return await promise;
    }

    private static generateSecretFromCookie() {
        return 'SECRET_KEY';
    }
}

export class KitsuneSock {
    private readonly secretKey: string;
    private server: Server;
    private socket: Socket;

    constructor(secret_key: string, server: Server, socket: Socket) {
        this.secretKey = secret_key;
        this.server = server;
        this.socket = socket;
    }
}