import { inject, injectable } from "inversify";
import { TYPES } from "kitsune-wrapper-library";
import { FetchConfig } from "../service/FetchConfig";
import { LoadModule } from "../service/LoadModule";
import container from "../ioc/ioc_mapping";
import CoreState from "../constants/CoreState";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";
import ICommand from "kitsune-wrapper-library/dist/base/interfaces/ICommand";
import {io, Socket} from "socket.io-client";

@injectable()
export class InitWrapper implements ICommand {
    @inject(TYPES.FetchConfig)
    _wrapperConfig: FetchConfig;

    @inject(TYPES.LoadModule)
    _moduleLoader: LoadModule;

    private socket: Socket;

    private totalModules:number;
    private totalLoaded:number = 0;

    run() {
        sessionStorage.clear();
        const newSessionKey = JSON.stringify(Date.now() + crypto.randomUUID());
        sessionStorage.setItem('sessionKey', newSessionKey);
        this.socket = io('ws://localhost:3000', {port:3000, autoConnect:false, host:'http://localhost:3000', upgrade:true});
        this.socket.on('connect', ()=> {
            console.log('connect', this.socket, 'get ready to send new session key', newSessionKey);
        })
        this.socket.connect();
        this._wrapperConfig.request().then(() => {
            this.loadModules();
        });
    }

    loadModules() {
        const modules : Array<ExtensionValuedObject> | undefined = (this._wrapperConfig).getConfig().modules;
        if(!modules) {
            return;
        }
        this.totalModules = modules.length;
        if (this.totalModules === 0) {
            this.completeInit();
            return;
        }
        modules.forEach((module) => {
            this._moduleLoader.request(module, true)?.then((moduleInstance: IInjectableExtensionModule) => {
                this.totalLoaded++;
                if (this.totalLoaded === this.totalModules) {
                    this.completeInit();
                    return;
                }
            });
        })
    }



    completeInit() {
        container.get(CoreState.INIT_COMPLETE);
    }
}

export type ExtensionValuedObject = {
    moduleName: string;
    modulePath: string;
    gzipped?: boolean | undefined;
}
