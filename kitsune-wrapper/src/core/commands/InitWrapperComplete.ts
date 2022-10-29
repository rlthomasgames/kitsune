import {inject, injectable, optional, postConstruct} from "inversify";
import { TYPES } from "kitsune-wrapper-library";
import {FetchConfig} from "../service/FetchConfig";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";
import ICommand from "kitsune-wrapper-library/dist/base/interfaces/ICommand";

@injectable()
export class InitWrapperComplete implements ICommand {

    @inject(TYPES.FetchConfig)
    _wrapperConfig: FetchConfig;

    @optional()
    @inject('HelloWorldExtension')
    _helloWorld?: IInjectableExtensionModule;

    @optional()
    @inject('PixiFrameworkExtension')
    _pixi?: IInjectableExtensionModule;

    @postConstruct()
    postConstruct() {
        this.run();
    }

    run() {
        this._helloWorld?.startModule();
        this._pixi?.startModule();
        /*
        global!.window!.document!.getElementById('kitsune-logo-info').addEventListener('click', ()=> {
            global!.window!.location.href = "https://codepen.io/rlthomasgames/full/NWzqeLR";
        })
        */
    }
}
