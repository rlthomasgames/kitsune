import {Application} from "pixi.js";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";
import {inject, injectable} from "inversify";
import BaseApplication from "kitsune-wrapper-library/dist/base/application/BaseApplication";
import {WebGLRenderer} from 'three';
import KitsuneHelper from "kitsune-wrapper-library/dist/base/helper/KitsuneHelper";
import {TYPES} from "kitsune-wrapper-library";
import IAsyncRequest from "kitsune-wrapper-library/dist/base/interfaces/IAsyncRequest";
import {IDataStore} from "kitsune-wrapper-library/dist/base/interfaces/extensions/IDataStore";
import IInjectParser from "kitsune-wrapper-library/dist/base/interfaces/extensions/IInjectParser";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";

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

    @inject('DracoParser')
    _dParser: IInjectableExtensionModule;

    @inject(TYPES.AssetData)
    _assetData: IDataStore;

    constructor() {
        super();
    }

    startModule() {
        console.log(`startModule executed in application krash test dummy \n pixi test : ${this._pixi} \n three test : ${this._three}`);
        if(this._pixi && this._three) {
            this._pixi.startModule();
            this._three.startModule();
            this._dParser.startModule();
            console.log('hello from pixi?', (this._pixi.container as Application), this._pixi);
            console.log('hello from three?', (this._three.container as ThreeContainer), this._three);

            document.getElementById('content')!.appendChild((this._pixi.container as Application).view);
            document.getElementById('content')!.appendChild((this._three.container! as ThreeContainer).canvas);

            const labU8A: Uint8Array = this._assetData.dataStore[this._wrapperConfig.getConfig().assetPacks[0]]['base-all-anims_mixamo_animations_importer_script.glb'];
            const blob = new Blob([labU8A], {type:'model/gltf-binary'});
            console.log('the blob = ', blob);
            const url = URL.createObjectURL(blob);
            console.log('the url = ', url);
            const gltf = (this._dParser as unknown as IInjectParser).parse<Promise<GLTF>>(url)
            console.log("parsed data using draco ", gltf);
            console.log("parsed data using draco ", gltf);
            gltf.then((scene3d)=>{
                //const renderer = (this._three.container! as ThreeContainer).renderer;
                //create a camera and add to gltf scene, or have a scene with a camera and add the gltf
                //renderer.render() // <--- using camera / scene
            })
        }
    }
}

declare type ThreeContainer = {
    canvas:HTMLCanvasElement,
    renderer:WebGLRenderer,
}

KitsuneHelper.getKitsuneFactories().set('application', application);

