import {Application} from "pixi.js";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";
import {inject, injectable} from "inversify";
import BaseApplication from "kitsune-wrapper-library/dist/base/application/BaseApplication";

@injectable()
export class application extends BaseApplication implements IInjectableExtensionModule {

    @inject('PixiFrameworkExtension')
    _pixi: IInjectableExtensionModule;
    constructor() {
        console.log("instantiated application");
        super();
    }

    startModule() {
        console.log(`startModule executed in application krash test dummy \n pixi test : ${this._pixi}`);
        if(this._pixi) {
            this._pixi.startModule();
            console.log('hello?', (this._pixi.container as Application));
        }
    }
}

// @ts-ignore
let kitsuneExtensionFactories = window['kitsuneExtensionFactories'];
console.log('adding class into kitsune extension factory', application);
kitsuneExtensionFactories.set('application', application);

