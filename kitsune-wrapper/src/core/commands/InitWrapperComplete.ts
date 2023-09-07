import {inject, injectable, optional, postConstruct} from "inversify";
import { TYPES } from "kitsune-wrapper-library";
import {FetchConfig} from "../service/FetchConfig";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";
import ICommand from "kitsune-wrapper-library/dist/base/interfaces/ICommand";
import {LoadModule} from "../service/LoadModule";
import container from "../ioc/ioc_mapping";
import CoreState from "../constants/CoreState";

@injectable()
export class InitWrapperComplete implements ICommand {

    @inject(TYPES.FetchConfig)
    _wrapperConfig: FetchConfig;

    @optional()
    @inject('HelloWorldExtension')
    _helloWorld?: IInjectableExtensionModule;

    @inject(TYPES.LoadModule)
    _moduleLoader: LoadModule;

    @postConstruct()
    postConstruct() {
        this.run();
    }

    run() {
        const application = this._wrapperConfig.getConfig().application;
        if(application != undefined) {
            this.loadApplication(application);
        } else {
            this._helloWorld?.startModule();
        }
    }

    loadApplication(pathToApp:string) {
        console.log('loading app now');
        this._moduleLoader.request({moduleName: 'application', modulePath:pathToApp }, false)?.then((moduleInstance: IInjectableExtensionModule) => {

        }).then(()=>{
            container.get(CoreState.START_APPLICATION);
        });
    }
}
