import { inject, injectable } from "inversify";
import { TYPES } from "kitsune-wrapper-library";
import { FetchConfig } from "../service/FetchConfig";
import { LoadModule } from "../service/LoadModule";
import container from "../ioc/ioc_mapping";
import CoreState from "../constants/CoreState";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";
import ICommand from "kitsune-wrapper-library/dist/base/interfaces/ICommand";
import {io, Socket} from "socket.io-client";
import {AuthMsg, SOCK} from "../../../../kitsune-wrapper-library/src/base/constants/SockConn";
import * as fflate from "fflate";

@injectable()
export class InitWrapper implements ICommand {
    @inject(TYPES.FetchConfig)
    _wrapperConfig: FetchConfig;

    @inject(TYPES.LoadModule)
    _moduleLoader: LoadModule;

    private clientMap: Map<string, Socket | string | boolean | number>;
    private socket: Socket;

    private totalModules:number;
    private totalLoaded:number = 0;

    // TODO : !!!!!!!IMPORTANT!!!!!!!! - clean web sockets and gzip out into separate command and / or module !!!

    run() {
        sessionStorage.clear();
        this.clientMap = new Map<string, Socket | string | boolean | number>();
        const newSessionKey = crypto.randomUUID();
        sessionStorage.setItem('kitsune_session', newSessionKey);

        const cookieApplication = `kitsune=kitsuneWrapper;`
        const cookieToSession = `session=${newSessionKey};`;
        const cookieUser = `user=genericUser;`
        const cookieExpires = `expires=${new Date(Date.now() + 3600000)}`;

        document.cookie = `${cookieApplication} ${cookieUser} ${cookieToSession} ${cookieExpires}`;

        this.socket = io('ws://localhost:3000',
            {
                autoConnect: false,
                host: 'http://localhost:3000',
                port: 3000,
                transports: ["websocket", "polling"],
                upgrade: true,
                auth: {
                    token: newSessionKey
                },
            });

        this.socket.on(SOCK.CONNECT, ()=> {
            console.log('connect established :', this.socket);
            this.clientMap.set(SOCK.CONNECT, true);
            if(this.socket.id) {
                this.clientMap.set(SOCK.SOCK_ID, this.socket.id);
            }
        });

        this.socket.on(SOCK.AUTH_TOKEN, (authMsg : AuthMsg) => {
            console.log('received  auth token', authMsg);
            sessionStorage.setItem(SOCK.AUTH_TOKEN, authMsg.auth_token);
            this.clientMap.set(SOCK.AUTH_TOKEN, true);
            this._wrapperConfig.request().then(() => {
                this.loadModules();
            });
        })
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
                    throw new Error(`${SOCK.GZIP_TEST} failed : ${err}`);
                } else if( data) {
                    resolve(true);
                    this.socket.emit(SOCK.GZIP_TEST, data);
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
    }
}

export type ExtensionValuedObject = {
    moduleName: string;
    modulePath: string;
    gzipped?: boolean | undefined;
}
