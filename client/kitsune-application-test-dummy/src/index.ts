import {Application} from "pixi.js";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";
import {inject, injectable} from "inversify";
import BaseApplication from "kitsune-wrapper-library/dist/base/application/BaseApplication";
import {WebGLRenderer} from 'three';
import KitsuneHelper from "kitsune-wrapper-library/dist/base/helper/KitsuneHelper";
import {TYPES} from "kitsune-wrapper-library";
import IAsyncRequest from "kitsune-wrapper-library/dist/base/interfaces/IAsyncRequest";

interface IConciseConfig {
    assetPacks: string;
}

export interface ICanFetchConfig {
    getConfig: ()=>IConciseConfig;
}
@injectable()
export class application extends BaseApplication implements IInjectableExtensionModule {
    name: string = 'application';

    @inject(TYPES.FetchConfig)
    _wrapperConfig: IAsyncRequest & ICanFetchConfig;

    @inject('PixiFrameworkExtension')
    _pixi: IInjectableExtensionModule;

    @inject('ThreeFrameworkExtension')
    _three: IInjectableExtensionModule;
    constructor() {
        super();
    }

    startModule() {
        console.log(`startModule executed in application krash test dummy \n pixi test : ${this._pixi} \n three test : ${this._three}`);
        if(this._pixi && this._three) {
            this._pixi.startModule();
            this._three.startModule();
            console.log('hello from pixi?', (this._pixi.container as Application), this._pixi);
            console.log('hello from three?', (this._three.container as ThreeContainer), this._three);

            document.getElementById('content')!.appendChild((this._pixi.container as Application).view);
            document.getElementById('content')!.appendChild((this._three.container! as ThreeContainer).canvas);
        }
    }
}

declare type ThreeContainer = {
    canvas:HTMLCanvasElement,
    renderer:WebGLRenderer,
}

KitsuneHelper.getKitsuneFactories().set('application', application);

