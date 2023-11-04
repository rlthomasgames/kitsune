import { inject, injectable } from "inversify";
import { TYPES } from "kitsune-wrapper-library";
import { FetchConfig } from "../service/FetchConfig";
import { LoadModule } from "../service/LoadModule";
import container from "../ioc/ioc_mapping";
import CoreState from "../constants/CoreState";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";
import ICommand from "kitsune-wrapper-library/dist/base/interfaces/ICommand";
import {io, Socket} from "socket.io-client";
import {AUTH_TOKEN, AuthMsg, CONNECT, SOCK_ID} from "../../../../kitsune-wrapper-library/src/base/constants/SockConn";

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

        this.socket.on(CONNECT, ()=> {
            console.log('connect established :', this.socket);
            this.clientMap.set(CONNECT, true);
            this.clientMap.set(SOCK_ID, this.socket.id);
        });

        this.socket.on(AUTH_TOKEN, (authMsg : AuthMsg) => {
            console.log('received  auth token', authMsg);
            sessionStorage.setItem(AUTH_TOKEN, authMsg.auth_token);
            this.clientMap.set(AUTH_TOKEN, true);
            this._wrapperConfig.request().then(() => {
                this.loadModules();
            });
        })
        this.socket.connect().open();
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
