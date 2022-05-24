import { inject, injectable } from "inversify";
import { TYPES } from "kitsune-wrapper-library";
import Command from "kitsune-wrapper-library/dist/base/interfaces/Command";
import { FetchConfig } from "../service/FetchConfig";
import { LoadModule } from "../service/LoadModule";
import container from "../ioc/ioc_mapping";
import CoreState from "../constants/CoreState";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";

@injectable()
export class InitWrapper implements Command {
    @inject(TYPES.FetchConfig)
    _wrapperConfig: FetchConfig;

    @inject(TYPES.LoadModule)
    _moduleLoader: LoadModule;

    private totalModules:number;
    private totalLoaded:number = 0;

    run() {
        console.log('Wrapper INITIALIZE sequence started...\n');
        this._wrapperConfig.request()?.then(() => {
            console.log('requested wrapper config loading completed', (this._wrapperConfig as FetchConfig).getConfig());
            this.loadModules();
        });
    }

    loadModules() {
        const modules : Array<ExtensionValuedObject> = (this._wrapperConfig as FetchConfig).getConfig().modules!;
        this.totalModules = modules.length;
        if (this.totalModules === 0) {
            this.completeInit();
            return;
        }
        modules.forEach((module) => {
            console.log('fetching wrapper extension ', module, ' specified in wrapper config');
            this._moduleLoader.request(module)?.then((moduleInstance: IInjectableExtensionModule) => {
                console.log('wrapper extension ', module, ' finished loading');
                this.totalLoaded++;
                if(this.totalLoaded === this.totalModules) {
                    console.log('loading all wrapper extensions from wrapper config completed : ', this.totalLoaded, 'extensions added in total');
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
