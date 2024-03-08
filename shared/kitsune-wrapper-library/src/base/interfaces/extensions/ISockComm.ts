<<<<<<< HEAD:shared/kitsune-wrapper-library/src/base/interfaces/extensions/ISockComm.ts
=======

import {Socket} from "socket.io-client";
>>>>>>> refs/remotes/origin/main:kitsune-wrapper-library/src/base/interfaces/extensions/ISockComm.ts
import IInjectableExtensionModule from "../IInjectableExtensionModule";
import IWrapperConfig from "../IWrapperConfig";
export default interface ISockComm extends IInjectableExtensionModule{
    _wrapperConfig:any;
    _assetVendor:any;

<<<<<<< HEAD:shared/kitsune-wrapper-library/src/base/interfaces/extensions/ISockComm.ts
    clientMap: Map<string, any | string | boolean | number>;

    socket: any;
=======
    clientMap: Map<string, Socket | string | boolean | number>;

    socket: Socket;
>>>>>>> refs/remotes/origin/main:kitsune-wrapper-library/src/base/interfaces/extensions/ISockComm.ts
    id: string;
    totals: Array<number>;

    run(_wrapperConfig:IWrapperConfig): ISockComm;
}