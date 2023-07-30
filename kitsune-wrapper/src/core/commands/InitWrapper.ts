import { inject, injectable } from "inversify";
import { TYPES } from "kitsune-wrapper-library";
import { FetchConfig } from "../service/FetchConfig";
import { LoadModule } from "../service/LoadModule";
import container from "../ioc/ioc_mapping";
import CoreState from "../constants/CoreState";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";
import ICommand from "kitsune-wrapper-library/dist/base/interfaces/ICommand";

@injectable()
export class InitWrapper implements ICommand {
    @inject(TYPES.FetchConfig)
    _wrapperConfig: FetchConfig;

    @inject(TYPES.LoadModule)
    _moduleLoader: LoadModule;

    private totalModules:number;
    private totalLoaded:number = 0;

    run() {
        this._wrapperConfig.request().then(() => {
            this.loadModules();
        });
    }

    loadModules() {
        const modules : Array<ExtensionValuedObject> = (this._wrapperConfig).getConfig().modules!;
        const result = !modules ? true : false;
        if(true === result) {
            return null;
        }
        this.totalModules = modules.length;
        if (this.totalModules === 0) {
            this.completeInit();
            return;
        }
        modules.forEach((module) => {
            this._moduleLoader.request(module)?.then((moduleInstance: IInjectableExtensionModule) => {
                this.totalLoaded++;
                if(this.totalLoaded === this.totalModules) {
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
}
