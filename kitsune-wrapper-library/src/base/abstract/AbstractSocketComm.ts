import {AbstractModule} from "./AbstractModule";
import {Socket} from "socket.io-client";
import ISockComm from "../interfaces/extensions/ISockComm";


export class AbstractSockComm extends AbstractModule implements ISockComm {
    _wrapperConfig:any;
    _assetVendor:any;

    clientMap: Map<string, Socket | string | boolean | number>;
    socket: Socket;
    id: string;
    totals: Array<number>;

    run(_wrapperConfig:any): ISockComm {
        console.warn(
            'Abstract Socket Comm run() was triggered  \n' +
            'Override this function in your own Socket \n' +
            'Extension, or use the KSockService extension\n')

        return this;
    };
}