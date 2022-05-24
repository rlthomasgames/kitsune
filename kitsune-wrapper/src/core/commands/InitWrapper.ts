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
        console.log('Wrapper check INIT...\n');
        this._wrapperConfig.request()?.then(() => {
            console.log('finished loading config', (this._wrapperConfig as FetchConfig).getConfig());
            this.loadModules();
        });
    }

    loadModules() {
        const modules = (this._wrapperConfig as FetchConfig).getConfig().modules!;
        this.totalModules = modules.length;
        if (this.totalModules === 0) {
            this.completeInit();
            return;
        }
        console.log('will load??');
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
