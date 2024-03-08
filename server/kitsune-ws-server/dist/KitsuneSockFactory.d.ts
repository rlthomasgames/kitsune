import { Event, Server, Socket } from "socket.io";
export type SockEventHandler = (event: Event, next: Function) => void;
export declare const defaultEventHandler: (event: Event, next: Function) => void;
export declare class KitsuneSockFactory {
    static createServer(eventHandler: SockEventHandler): Promise<KitsuneSock>;
    private static generateSecretFromCookie;
}
export declare class KitsuneSock {
    private readonly secretKey;
    private server;
    socket: Socket;
    constructor(secret_key: string, server: Server, socket: Socket);
}
