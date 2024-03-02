import { inject, injectable } from "inversify";
import { TYPES } from "kitsune-wrapper-library";
import { FetchConfig } from "../service/FetchConfig";
import { LoadModule } from "../service/LoadModule";
import container from "../ioc/ioc_mapping";

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

    }
}

export type ExtensionValuedObject = {
    moduleName: string;
    modulePath: string;
    gzipped?: boolean | undefined;
}
