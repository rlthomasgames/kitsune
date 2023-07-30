import {injectable} from "inversify";
import {AbstractModule} from "kitsune-wrapper-library";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";
import {Application} from "pixi.js";

@injectable()
class PixiFrameworkExtension extends AbstractModule implements IInjectableExtensionModule {
    name: string = 'PixiFrameworkExtension';
    container: Application;

    startModule() {
        const pixiApplication = new Application();
        console.log('we are using pixijs framework here', pixiApplication);
        this.container = pixiApplication;
    }
}

export {PixiFrameworkExtension as default, PixiFrameworkExtension};

// @ts-ignore
let kitsuneExtensionFactories = window['kitsuneExtensionFactories'];
if(kitsuneExtensionFactories == undefined) {
    kitsuneExtensionFactories = new Map();
    // @ts-ignore
    window['kitsuneExtensionFactories'] = kitsuneExtensionFactories;
}
kitsuneExtensionFactories.set('PixiFrameworkExtension', PixiFrameworkExtension);
