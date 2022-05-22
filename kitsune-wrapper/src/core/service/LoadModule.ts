import {injectable} from "inversify";
import AsyncRequest from "kitsune-wrapper-library/dist/base/interfaces/AsyncRequest";
import IWrapperModule from "kitsune-wrapper-library/dist/base/interfaces/IWrapperModule";
import container from "../ioc/ioc_mapping";

@injectable()
export class LoadModule implements AsyncRequest {
    constructor() {
    }

    request(moduleName?:string) {
        if(moduleName !== null) {
            const loadingModule = import(`./extensions/${moduleName}`);
            loadingModule.then(module => {
                // TODO : use as example of how to start a game thats loaded externally
                // @ts-ignore
                const moduleClass = module[moduleName];
                console.log('testing here..', moduleClass, module, moduleName);
                container.bind<IWrapperModule>(moduleName!).to(moduleClass);
                const instance = container.get(moduleName!);
                console.log('instance is...', instance);
            });
            return loadingModule;
        }
        return;
    }
}
