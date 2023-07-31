import {injectable} from "inversify";
import {AbstractModule} from "kitsune-wrapper-library";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";
import {WebGLRenderer} from "three";

@injectable()
class ThreeFrameworkExtension extends AbstractModule implements IInjectableExtensionModule {
    name: string = 'ThreeFrameworkExtension';
    container: {canvas:HTMLCanvasElement, renderer:WebGLRenderer };

    startModule() {
        console.log('we do get here??');
        const canvas = document.createElement('canvas');
        const webGLRenderer = new WebGLRenderer({canvas:canvas});
        console.log('we are using three framework here', canvas, webGLRenderer);
        this.container = {canvas:canvas, renderer:webGLRenderer};
    }
}

export {ThreeFrameworkExtension as default, ThreeFrameworkExtension};

// @ts-ignore
let kitsuneExtensionFactories = window['kitsuneExtensionFactories'];
if(kitsuneExtensionFactories == undefined) {
    kitsuneExtensionFactories = new Map();
    // @ts-ignore
    window['kitsuneExtensionFactories'] = kitsuneExtensionFactories;
}
kitsuneExtensionFactories.set('ThreeFrameworkExtension', ThreeFrameworkExtension);
