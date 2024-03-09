import colors = require('colors');
import {Event, Server, Socket} from "socket.io"
import * as jwt from "jsonwebtoken";
import * as http from "http";
import {SOCK} from "kitsune-wrapper-library";
import * as fflate from "fflate";
import {strFromU8} from "fflate";
import {KVerboseLog} from "./index";
import * as fs from "fs";
import KitsuneHelper from "kitsune-wrapper-library/dist/base/helper/KitsuneHelper";
import {APResponseData} from "kitsune-wrapper-library/dist/base/constants/SockConn";

colors.enable();

let socketUsed: KitsuneSock;

export type SockEventHandler = (event: Event, next: Function) => void;

export const defaultEventHandler = (event: Event, next: Function) => {
    console.log(`server received ${event}`);
    const eventMap = event.map((value, index, array) => {
        console.log(`map: ${value} | index: ${index} | array: ${array}`);
    });
    switch (event[0] as string) {
        case SOCK.GZIPPED_EVENT:
            const data = (event[1] as unknown) as Uint8Array;
            console.log(KVerboseLog.log(`${SOCK.GZIPPED_EVENT} recieved data gzipped :  `));//${data}
            const unzipped = fflate.decompressSync(data);
            const blob = new Blob([unzipped], {type: 'text/plain'});
            blob.arrayBuffer().then((arrayBuf) => {
                const asString = strFromU8(new Uint8Array(arrayBuf));
                /*
                console.log(`UNZIPPED:`);
                console.log(
                    `${KVerboseLog.log("as Uint8Array :") + "\n"}${KVerboseLog.log(unzipped + "") + "\n"}
                    ${KVerboseLog.log("as String :") + "\n"}${KVerboseLog.log(`${asString}`) + "\n"}
                    ${KVerboseLog.log("as JSON object :")}`
                );

                 */
                const object = JSON.parse(`${asString}`);
                //console.log('current object', object);
                const assetReq: boolean = object[SOCK.AP_REQ] != undefined;
                let completeBuffer: string = '';
                if(assetReq) {
                    const arrayPaks = object[SOCK.AP_REQ] as Array<string>;
                    if(arrayPaks) {
                        console.log('trying to load : ', arrayPaks);
                        arrayPaks.forEach((pak: string, index) => {
                            const relativePath = `../kitsune-asset-store/packets/${pak}`
                            console.log('trying to open : ', relativePath, index);
                            if(fs.existsSync(relativePath)) {
                                console.log('path exists...', relativePath);
                                fs.readdir(relativePath, (err, files)=>{
                                    files.forEach((value, index, packetsArr) => {
                                        const packetPath = relativePath+'/'+value;
                                        const fd = fs.openSync(packetPath, 'r');
                                        if(fd){
                                            const fileNo = value.split('p')[0].split('|')[0];
                                            const buffer = fs.readFileSync(packetPath)
                                            const sendPromise = sendWhenPromised({
                                                data: buffer,
                                                index: index+1,
                                                assetPackUUID: pak,
                                                total: packetsArr.length,
                                                fileIndex: parseInt(fileNo)
                                            });
                                            //console.log(`sent packet ${index+1} of ${packetsArr.length} for asset pak ${pak} buffer: ${buffer}`)
                                        }
                                    })
                                })
                            } else {
                                console.log(colors.bgYellow.red("UNABLE TO FIND ASSET PACK... "+relativePath+""));
                            }
                        })
                    } else {
                        console.log('received erroneous asset pak request: IGNORING1 '+JSON.stringify(eventMap)+'')
                    }
                }
            })
            next();
            return;
        default:
            //console.log('check what events come in??', event, eventMap);
            next();
            return;
    }
};

interface T {
}

const sendWhenPromised = (payload:Promise<T|APResponseData>|T|APResponseData) => {
    if(socketUsed) {
        if(payload instanceof Promise) {
            socketUsed.socket.emit(SOCK.AP_RES, KitsuneHelper.asyncAwait(payload) as APResponseData);
        } else {
            socketUsed.socket.emit(SOCK.AP_RES, payload as APResponseData);
        }
    }
    return {socket: socketUsed, payload: payload}
}

export class KitsuneSockFactory {
    static async createServer(eventHandler: SockEventHandler): Promise<KitsuneSock> {
        const promise: Promise<KitsuneSock> = new Promise<KitsuneSock>((resolve, reject) => {
            const secretKey = this.generateSecretFromCookie();
            const httpServer = http.createServer();
            const server = new Server(httpServer, {
                cookie: true,
                transports: ["websocket", "polling"],
                cors: {
                    origin: 'http://localhost:8000',
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
                    resolve(socketUsed = new KitsuneSock(secretKey, server, socket));
                } else {
                    socket.emit(SOCK.KICK, {});
                }
            });
            server.on(SOCK.GZIPPED_EVENT, async (socket: Socket) => {
                console.log('ready to send the asset data r0', socket);
            });
            server.on(SOCK.AP_REQ, async (socket: Socket) => {
                console.log('ready to send the asset data r1', socket);
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
    public socket: Socket;

    constructor(secret_key: string, server: Server, socket: Socket) {
        this.secretKey = secret_key;
        this.server = server;
        this.socket = socket;
    }
}