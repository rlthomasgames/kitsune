import {injectable} from "inversify";
import {AbstractModule} from "kitsune-wrapper-library";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";

@injectable()
class HelloWorldExtension extends AbstractModule implements IInjectableExtensionModule {
    name: string = 'HelloWorldExtension';

    startModule() {
        console.log('Hello from injected "Hello World" extension');
    }
}

export {HelloWorldExtension as default, HelloWorldExtension};

// @ts-ignore
let kitsuneExtensionFactories = window['kitsuneExtensionFactories'];
if(kitsuneExtensionFactories == undefined) {
    kitsuneExtensionFactories = new Map();
    // @ts-ignore
    window['kitsuneExtensionFactories'] = kitsuneExtensionFactories;
}
kitsuneExtensionFactories.set('HelloWorldExtension', HelloWorldExtension);
