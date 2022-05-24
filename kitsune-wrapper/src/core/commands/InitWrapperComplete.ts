import {inject, injectable, postConstruct} from "inversify";
import { TYPES } from "kitsune-wrapper-library";
import Command from "kitsune-wrapper-library/dist/base/interfaces/Command";
import {FetchConfig} from "../service/FetchConfig";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";

@injectable()
export class InitWrapperComplete implements Command {

    @inject(TYPES.FetchConfig)
    _wrapperConfig: FetchConfig;

    @inject('HelloWorldExtension')
    _helloWorld: IInjectableExtensionModule;

    @postConstruct()
    postConstruct() {
        this.run();
    }

    run() {
        console.log('Wrapper INIT_COMPLETE!\n', 'try injecting into this');
        console.log('checking here...', this._helloWorld);
        this._helloWorld.startModule();
    }
}
