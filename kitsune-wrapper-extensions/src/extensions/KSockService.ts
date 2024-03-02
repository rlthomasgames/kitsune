import {inject, injectable} from "inversify";
import ICommand from "kitsune-wrapper-library/dist/base/interfaces/ICommand";
import {AuthMsg, SOCK} from "kitsune-wrapper-library/dist/base/constants/SockConn";
import * as fflate from "fflate";
import {TYPES} from "kitsune-wrapper-library";
import KitsuneHelper from "kitsune-wrapper-library/dist/base/helper/KitsuneHelper";
import { AssetDataVendor } from './AssetDataVendor';

@injectable()
class KSockService implements ICommand {
    @inject(TYPES.FetchConfig)
    _wrapperConfig:any = container.get(TYPES.FetchConfig);

    //for rieeving and sending files over SCOKER
    @inject(TYPES.AssetDataVendor)
    _assetVendor:AssetDataVendor;

    public clientMap: Map<string, Socket | string | boolean | number>;
    public socket: Socket;
    public id: string;
    public totals: Array<number> = [];

    run(): KSockService {

        this.clientMap = new Map<string, Socket | string | boolean | number>();

        sessionStorage.clear();
        const newSessionKey = crypto.randomUUID();
        sessionStorage.setItem('kitsune_session', newSessionKey);

        const cookieApplication = `kitsune=kitsuneWrapper;`
        const cookieToSession = `session=${newSessionKey};`;
        const cookieUser = `user=genericUser;`
        const cookieExpires = `expires=${new Date(Date.now() + 3600000)}`;

        document.cookie = `${cookieApplication} ${cookieUser} ${cookieToSession} ${cookieExpires}`;

        this.socket = io ('ws://localhost:3000',
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
            this.id = this.socket.id ? this.socket.id : crypto.randomUUID();
            console.log('connect established :', this.socket, this.socket.id);
            this.clientMap.set(SOCK.CONNECT as unknown as string, true);
            if(this.id) {
                this.clientMap.set(SOCK.SOCK_ID, this.id);
            }
        });

        this.socket.on(SOCK.AUTH_TOKEN, (authMsg : AuthMsg) => {
            console.log('received  auth token', authMsg);
            sessionStorage.setItem(SOCK.AUTH_TOKEN, authMsg.auth_token);
            this.clientMap.set(SOCK.AUTH_TOKEN, true);
            const sentSockID = this.socket?.id !== undefined ? this.socket!.id : 'MISSING';
            const originalPayload = {assetPackREQ: this._wrapperConfig.getConfig().assetPacks, sock: sentSockID};
            this.sendAssetPakReq(originalPayload);
        })

        this.socket.on(SOCK.AP_RES, (responseData: {
            data: ArrayBuffer,
            index: number,
            assetPackUUID: string,
            total: number | undefined
        }) => {
            if(responseData.total != undefined ) {
                this.totals.push(responseData.total)
            }
            responseData.total = this.totals[this.totals.length -1];
            this._assetVendor.storeAssetResponseFromWS(responseData)
            console.log(`got parsed Asset Response : `, responseData.data.byteLength, responseData.index, responseData.total, responseData.assetPackUUID)
        })

        this.socket.connect().open();
        return this;
    }

    async sendGZipEmit( payload: Object): Promise<void | boolean> {
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

    sendAssetPakReq(payload: { assetPackREQ: string, sock: string }) {
        console.log('trying to send req', payload);
        if (this.socket && this.socket.id!=undefined && this.socket.id!.length > 0) {
            let val = (KitsuneHelper.asyncAwait(this.sendGZipEmit(payload)) as void | boolean)
            const isTrue: boolean = (val === true) ? val : false;
            isTrue !== true ? console.log('asset pack req sent') : setTimeout(() => {
                this.sendAssetPakReq(payload)
            }, 500)
        } else {
            setTimeout(() => {
                this.sendAssetPakReq(payload)
            }, 500);
        }
    }
}


export {KSockService as default, KSockService};

KitsuneHelper.getKitsuneFactories().set('KSockService', KSockService);
