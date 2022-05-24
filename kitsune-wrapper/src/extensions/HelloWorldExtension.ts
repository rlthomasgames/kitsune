import {injectable} from "inversify";
import {AbstractModule} from "kitsune-wrapper-library";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";

@injectable()
class HelloWorldExtension extends AbstractModule implements IInjectableExtensionModule {
    name: string = 'HelloWorldExtension';

    startModule() {
        console.log('empty module started');
    }
}

export {HelloWorldExtension as default, HelloWorldExtension};

// @ts-ignore
let kitsuneExtensionFactories = window['kitsuneExtensionFactories'];
console.log('attempting code execution', kitsuneExtensionFactories);
if(kitsuneExtensionFactories == undefined) {
    console.log('got here', kitsuneExtensionFactories);
    kitsuneExtensionFactories = new Map();
    // @ts-ignore
    window['kitsuneExtensionFactories'] = kitsuneExtensionFactories;
    console.log('attempting map', kitsuneExtensionFactories);
    // @ts-ignore
    console.log('window value', window['kitsuneExtensionFactories']);
}
kitsuneExtensionFactories.set('HelloWorldExtension', HelloWorldExtension);
console.log('attempting write', kitsuneExtensionFactories);
// @ts-ignore
console.log('final window value', window['kitsuneExtensionFactories']);
