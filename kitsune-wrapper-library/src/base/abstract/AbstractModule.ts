import IInjectableExtensionModule from "../interfaces/IInjectableExtensionModule";

export class AbstractModule implements IInjectableExtensionModule {
    name: string = 'Abstract';
    startModule() {
        console.log('this is abstract implementation of IInjectableExtensionModule, please make sure to override');
    };
}
