import {injectable} from "inversify";
import {AbstractModule} from "kitsune-wrapper-library";
import IWrapperModule from "kitsune-wrapper-library/dist/base/interfaces/IWrapperModule";

@injectable()
class HelloWorldExtension extends AbstractModule implements IWrapperModule {
    name: string = 'HelloWorldExtension';

    startModule() {
        console.log('empty module started');
    }
}

export {HelloWorldExtension as default, HelloWorldExtension};

// @ts-ignore
let kitsuneExtensionFactories = window['kitsuneExtensionFactories'];
if(kitsuneExtensionFactories == undefined) {
    kitsuneExtensionFactories = new Map();
}
kitsuneExtensionFactories.set('HelloWorldExtension', HelloWorldExtension);
