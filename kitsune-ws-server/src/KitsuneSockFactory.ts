import {Event, Server, Socket} from "socket.io"
import * as jwt from "jsonwebtoken";
import * as http from "http";
import * as fflate from "fflate";
import {strFromU8} from "fflate";
import {KVerboseLog} from "./index";
import * as fs from "fs";
import {SOCK, SOCK_FLAG} from "kitsune-wrapper-library/dist/base/constants/SockConn";
import KitsuneHelper from "kitsune-wrapper-library/dist/base/helper/KitsuneHelper";


export class KitsuneSockFactory {

    protected static kSockCollection : KSocCollection;
    static async createServer(eventHandler: SockEventHandler): Promise<KitsuneSock> {
        this.kSockCollection = new KSocCollection();
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
                    socketUsed = new KitsuneSock(secretKey, server, socket);
                    KSocCollection.add(socketUsed)
                    resolve(socketUsed);

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


let socketUsed: KitsuneSock;

export type SockEventHandler = (event: Event, next: Function) => void;

export type AssetPakPartial = {file:number, packetNumber:number, packUID:string, fullPath:string};

export const defaultEventHandler = (event: Event, next: Function) => {
    let assetQueue:Array<AssetPakPartial> = [];
    console.log(`server received ${event}`);
    event.map((value, index, array) => {
        console.log(`map: ${value} | index: ${index} | array: ${array}`);
    });
    switch (event[0] as string) {
        case SOCK.GZIPPED_EVENT:
            //GOT A REQ, BUT ITS ENCRYPTED AND ZIPPED
            const data = (event[1] as unknown) as Uint8Array;
            console.log(KVerboseLog.log(`${SOCK.GZIPPED_EVENT} recieved data : gzipped : ${data} `));
            const unzipped = fflate.decompressSync(data);
            const blob = new Blob([unzipped], {type: 'text/plain'});
            blob.arrayBuffer().then((arrayBuf) => {
                const asString = strFromU8(new Uint8Array(arrayBuf));
                console.log(`UNZIPPED:`);
                console.log(
                    `${KVerboseLog.log("as Uint8Array :") + "\n"}${KVerboseLog.log(unzipped + "") + "\n"}
                    ${KVerboseLog.log("as String :") + "\n"}${KVerboseLog.log(`${asString}`) + "\n"}
                    ${KVerboseLog.log("as JSON object :")}`
                );
                const object = JSON.parse(`${asString}`)
                console.log('current object', object);

                /*
                Object.keys(object).forEach((key:string, index:number)=>{
                    switch (key) {
                        case SOCK.AP_REQ:
                            console.log*
                            break;
                        case SOCK.GZIP_TEST:

                            break;
                    }
                })

                 */

                const assetReq: boolean = object[SOCK.AP_REQ] != undefined;
                if(assetReq) {
                    const assetReq = object as unknown as {assetPackREQ:Array<string>, sock:string};
                    const arrayPaks = assetReq.assetPackREQ;
                    console.log('trying to load : ', arrayPaks);
                    arrayPaks.forEach((pak:string, index)=>{
                        const packUID = pak;

                        const dirPath = `./../kitsune-asset-store/packets/${packUID}/`
                        const currentPath = fs.readdirSync(`./`);
                        console.log(currentPath)
                        const paks = fs.readdirSync(dirPath);
                        paks.forEach(
                            (value, pkindex) => {
                                console.log('should load paks :', value);
                                const incomingPackData = value.split('|')

                                const fullPath = `${dirPath}${value}`;
                                const splitName = value.split(`.`)[0].split(`|`);
                                const fileOwnerNo = parseInt(splitName[0]);
                                const filePacketNo = parseInt(splitName[1]);
                                const assetPackPart: AssetPakPartial = {
                                    file: fileOwnerNo,
                                    packetNumber: filePacketNo,
                                    packUID: `${packUID}/${fileOwnerNo}|${filePacketNo}`,
                                    fullPath:fullPath,
                                }
                                assetQueue.push(assetPackPart as AssetPakPartial);
                                if(assetQueue.length === paks.length){
                                    socketUsed.sendAssetQueue(assetQueue);
                                }
                            }
                        )
                    })
                }
            })
            next();
            return;
        default:
            console.log('check what events come in??', event);
            next();
            return;
    }
};

export const WrapperEventHandler = (ev:Event | Object, next:Function ) =>{
    Object.keys(ev).forEach((key: string)=>{
        switch (key) {
            case SOCK.GZIPPED_EVENT:
                //if the event is gzipped event
                //decode and pass back through event handler
                //as normal event
                const data = ev[key] as Uint8Array;
                const unzipped = fflate.decompressSync(data); //unzipped
                const blob = new Blob([unzipped], {type: 'text/plain'});
                //console.log(KVerboseLog.log(`${SOCK.GZIPPED_EVENT} recieved data : gzipped : ${data} `));
                KitsuneHelper.asyncAwait(blob.arrayBuffer().then((arrayBuf) => {
                    const asString = strFromU8(new Uint8Array(arrayBuf));
                    console.log(`UNZIPPED:`);
                    console.log(
                        `${KVerboseLog.log("as Uint8Array :") + "\n"}${KVerboseLog.log(unzipped + "") + "\n"}
                    ${KVerboseLog.log("as String :") + "\n"}${KVerboseLog.log(`${asString}`) + "\n"}
                    ${KVerboseLog.log("as JSON object :")}`
                    );
                    const object = JSON.parse(`${asString}`)
                    WrapperEventHandler(object, next);
                }));
                break;
            case SOCK.AP_REQ:
                console.log('got AP request');
                break;
        }
    })
}

interface T {
}

export class KSocCollection{

    private static _collection:{[z:string]:KitsuneSock}
    constructor() {
        KSocCollection._collection = {};
    }

    public static add(sock:KitsuneSock){
        KSocCollection._collection[sock.socket.id] = sock;
    };

    public static get(id:string) {
        return KSocCollection._collection[id];
    }

    public static get collection(){ return KSocCollection._collection};
}
export class KitsuneSock {
    private readonly secretKey: string;
    private server: Server;
    public socket: Socket;
    public readonly id: string;

    constructor(secret_key: string, server: Server, socket: Socket) {
        this.secretKey = secret_key;
        this.server = server;
        this.socket = socket;
        this.id = socket.id;
    }

    public sendAssetQueue (assetQueue:Array<AssetPakPartial>) {
        let whileLoop = 0;
        assetQueue = assetQueue.sort((a, b) => {
            let fileScore = 0;
            let packetScore = 0;
            let fileD = 0;
            packetScore = (a.packetNumber < b.packetNumber) ? -1 : packetScore;
            packetScore = (a.packetNumber > b.packetNumber) ? 1 : packetScore;
            packetScore = a.packetNumber === b.packetNumber ? 0 : packetScore;
            fileScore = ((a.file === b.file) ? 0 : fileScore);
            fileScore = (a.file < b.file) ? -1 : fileScore;
            fileScore = (a.file > b.file) ? 1 : fileScore;
            fileScore = (a.file === b.file) ? 0 : fileScore;
            return fileScore !== 0 ? fileScore : packetScore
        });
        console.log(`send asset queue`)
        assetQueue.forEach((value, index) => {
            const data = fs.readFileSync(value.fullPath)
            console.log(`sending data : ${value.packUID} | ${value.file} | ${value.packetNumber} <<<< sending from ${value.fullPath}`, data.length, index);
            if(index === 0) {
                this.socket.emit(SOCK.AP_RES, {data: data, index:value.packetNumber, assetPackUUID:value.packUID, total:assetQueue.length});
            } else {
                this.socket.emit(SOCK.AP_RES, {data: data, index:value.packetNumber, assetPackUUID: value.packUID});
            }
            //console.log('sending...', data.length)
        })
    }
}


