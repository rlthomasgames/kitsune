import { Tail } from "tail";
export type ServerEventHandler = (event: Event, next: Function) => void;
export declare class KSFactory {
    static createServer(eventHandler: ServerEventHandler, MONGO_DB?: number, REST_SERVER?: number, WS_PORT?: number, ASSET_STORE?: number): Promise<KServer>;
}
export declare class KServer {
    blockingProcesses: Array<string>;
    constructor(...args: any[]);
    channelEventHandler(data: string, channel: string): void;
}
export declare const defaultEventHandler: (event: Event, next: Function) => void;
export declare const shuffle: (array: any) => any;
export declare const ColourizeMsg: (msg: string, channel: string) => void;
export declare class KServerChannel {
    output: Tail;
    outputStr: string;
    constructor(file: string, cmd: string, fullCmd?: boolean, newWindow?: boolean);
}
