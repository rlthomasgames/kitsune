
import {Socket} from "socket.io-client";
import IInjectableExtensionModule from "../IInjectableExtensionModule";
import IWrapperConfig from "../IWrapperConfig";
export default interface ISockComm extends IInjectableExtensionModule{
    _wrapperConfig:any;
    _assetVendor:any;

    clientMap: Map<string, Socket | string | boolean | number>;
    socket: Socket;
    id: string;
    totals: Array<number>;

    run(_wrapperConfig:IWrapperConfig): ISockComm;
}