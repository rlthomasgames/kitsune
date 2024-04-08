import ICommand from "kitsune-wrapper-library/dist/base/interfaces/ICommand";
import {inject, injectable} from "inversify";
import {SOCK, TYPES} from "kitsune-wrapper-library";
import {FetchConfig} from "kitsune-wrapper-library/dist/base/interfaces/extensions/FetchConfig";
import container from "../ioc/ioc_mapping";
import ISockComm from "kitsune-wrapper-library/dist/base/interfaces/extensions/ISockComm";
import * as fflate from "fflate";
import {Socket} from "socket.io-client";

@injectable()
export class ConnectToServer implements ICommand {

    @inject(TYPES.FetchConfig)
    _wrapperConfig:FetchConfig = container.get(TYPES.FetchConfig);

    @inject(TYPES.Socket)
    _socket:ISockComm;

    private socket: Socket;

    run() {
        console.log(`||||||||||| CONNECT TO SERVER CMD |||||||||||`);
        const configObject = this._wrapperConfig.getConfig();
        console.log(`Connecting to server...${configObject} ${this._socket}`);
        this._socket.run(configObject);
        this.socket = this._socket.socket;
        const originalPayload = { assetPackREQ: configObject.assetPacks };
        this.sendGZipEmit(originalPayload).then((value)=>{
            console.log('on full filled:', value);
        });
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
                    console.log(data, payload, payString);
                    this.socket.emit(SOCK.GZIPPED_EVENT, data);
                    resolve(true);
                }
            });
        })
        return await promiseSent;
    }
}