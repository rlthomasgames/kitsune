import {inject, injectable, postConstruct} from "inversify";
import { TYPES } from "kitsune-wrapper-library";
import {FetchConfig} from "../service/FetchConfig";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";
import ICommand from "kitsune-wrapper-library/dist/base/interfaces/ICommand";

@injectable()
export class InitWrapperComplete implements ICommand {

    @inject(TYPES.FetchConfig)
    _wrapperConfig: FetchConfig;

    @inject('HelloWorldExtension')
    _helloWorld: IInjectableExtensionModule;

    @postConstruct()
    postConstruct() {
        this.run();
    }

    run() {
        console.log('Wrapper INITIALIZE COMPLETE!\n');
        this._helloWorld.startModule();
    }
}
