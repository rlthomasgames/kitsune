import {injectable} from "inversify";
import {AbstractModule} from "kitsune-wrapper-library";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";
import {Application} from "pixi.js";

@injectable()
class PixiFrameworkExtension extends AbstractModule implements IInjectableExtensionModule {
    name: string = 'PixiFrameworkExtension';
    view!: Node;

    startModule() {
        const pixiApplication = new Application({width:window.innerWidth, height:window.innerHeight});
        this.view = pixiApplication.view;
        console.log('we are using pixijs framework here', pixiApplication);
        this.addView();
    }

    addView() {
        console.log('ran add view', this.view);
        document.getElementById('content')!.appendChild(this.view);
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
