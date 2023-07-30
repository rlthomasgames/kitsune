import {injectable} from "inversify";
import {AbstractModule} from "kitsune-wrapper-library";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";
import {sayHello} from "hwrld";

@injectable()
class HelloWorldExtension extends AbstractModule implements IInjectableExtensionModule {
    name: string = 'HelloWorldExtension';

    startModule() {
        sayHello();
        console.log('\n');
        console.log('\n');
        console.log('If your seeing this then no application specified in wrapper.json - so nothing to load');
        console.log('\n');
        console.log('\n');
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
