import IWrapperModule from "../interfaces/IWrapperModule";

export class AbstractModule implements IWrapperModule {
    name: string = 'Abstract';
    startModule() {
        console.log('this is abstract implementation of IWrapperModule, please make sure to override');
    };
}
