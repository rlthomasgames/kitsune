import { inject, injectable } from "inversify";
import {SOCK, TYPES} from "kitsune-wrapper-library";
import { LoadModule } from "../service/LoadModule";
import container from "../ioc/ioc_mapping";
<<<<<<< HEAD:client/kitsune-wrapper/src/core/commands/InitWrapper.ts
import CoreState from "../constants/CoreState";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";
import ICommand from "kitsune-wrapper-library/dist/base/interfaces/ICommand";
import {io, Socket} from "socket.io-client";
import * as fflate from "fflate";
import {FetchConfig} from "kitsune-wrapper-library/dist/base/interfaces/extensions/FetchConfig";
import {AuthMsg} from "kitsune-wrapper-library/dist/base/constants/SockConn";
=======
>>>>>>> refs/remotes/origin/main:kitsune-wrapper/src/core/commands/InitWrapper.ts

@injectable()
export class InitWrapper implements ICommand {
    @inject(TYPES.FetchConfig)
    _wrapperConfig:FetchConfig = container.get(TYPES.FetchConfig);

    @inject(TYPES.LoadModule)
    _moduleLoader:LoadModule = container.get(TYPES.LoadModule);

    @inject(TYPES.Socket)
    _socket:KSockService;

    @inject(TYPES.AssetDataVendor)
    _assetDataVendor:OldFetchAssets;

    // TODO : !!!!!!!IMPORTANT!!!!!!!! - clean web sockets and gzip out into separate command and / or module !!!

    run() {
        this._wrapperConfig.request().then((value)=>{
            this._moduleLoader.loadModules(this._wrapperConfig.getConfig())
            console.log(`got configs? ${this._wrapperConfig} and  ${this._moduleLoader}`)
        })
    //: console.log('cant load no modules specified')

<<<<<<< HEAD:client/kitsune-wrapper/src/core/commands/InitWrapper.ts
        this.socket.on(SOCK.AP_RES, (responseData:ArrayBuffer)=>{
            const textDecoder = new TextDecoder();
            const decodedString = textDecoder.decode(responseData, {stream:false});
            console.log('check we get here', responseData, decodedString);
            console.log('received asset pack response...', 'a', /*deflated,*/ 'b', decodedString);
        });
        this.socket.connect().open();
    }

    async sendGZipEmit( payload: Object): Promise<boolean> {
        const payString = JSON.stringify(payload);
        // TODO ? possibly encrypt data here, REMINDER: but MUST-DO on server side more probable
        let promiseSent: void | Promise<boolean>;
        promiseSent = new Promise((resolve, reject)=>{
            fflate.gzip(fflate.strToU8(payString), (err, data) => {
                //
                if (err) {
                    resolve(false);
                    console.warn(err?.stack, err);
                    console.error(err);
                    throw new Error(`${SOCK.GZIPPED_EVENT} failed : ${err}`);
                } else if( data) {
                    resolve(true);
                    this.socket.emit(SOCK.GZIPPED_EVENT, data);
                }
            });
        })
        return await promiseSent;
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
        const originalPayload = { assetPackREQ: this._wrapperConfig.getConfig().assetPacks };
        this.sendGZipEmit(originalPayload).then((value)=>{
            console.log('on full filled =', value);
        });
=======
>>>>>>> refs/remotes/origin/main:kitsune-wrapper/src/core/commands/InitWrapper.ts
    }
}

export type ExtensionValuedObject = {
    moduleName: string;
    modulePath: string;
    gzipped?: boolean | undefined;
}
