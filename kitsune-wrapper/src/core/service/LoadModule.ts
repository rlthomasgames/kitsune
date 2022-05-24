import {injectable} from "inversify";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";
import container from "../ioc/ioc_mapping";
import {ExtensionValuedObject} from "../commands/InitWrapper";
import IAsyncRequest from "kitsune-wrapper-library/dist/base/interfaces/IAsyncRequest";

type Class = { new(...args: any[]): any; };

@injectable()
export class LoadModule implements IAsyncRequest {
    constructor() {
    }

    request(moduleVO: ExtensionValuedObject) {
        if (moduleVO !== null) {
            return this.loadJS(moduleVO.modulePath, moduleVO.moduleName, 'test', document.head);
        }
        return;
    }


    loadJS(url: string, extensionName: string, implementation: unknown, location: Element) {
        const promise = new Promise((resolved, rejected) => {
            const scriptTag = document.createElement('script');
            scriptTag.type = 'text/javascript';
            scriptTag.src = url;
            location.appendChild(scriptTag);
            scriptTag.onload = (loadEvent) => {
                // @ts-ignore
                const kitsuneExtensionFactories = window['kitsuneExtensionFactories'] as Map;
                const extension: Class = kitsuneExtensionFactories.get(extensionName);
                container.bind<IInjectableExtensionModule>(extensionName!).to(extension);
                const instance: IInjectableExtensionModule = container.get(extensionName!);
                resolved(instance);
                console.log('created new Extension:', extensionName, 'from', url, ' | dependancy injected instance :', instance);
            }
            scriptTag.onerror = (error) => {
                rejected(error);
            }
        });
        return promise;
    }
}
