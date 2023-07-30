import {injectable} from "inversify";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";
import container from "../ioc/ioc_mapping";
import {ExtensionValuedObject} from "../commands/InitWrapper";
import IAsyncRequest from "kitsune-wrapper-library/dist/base/interfaces/IAsyncRequest";

type Class = { new(...args: any[]): any; };

@injectable()
export class LoadModule implements IAsyncRequest {

    request(moduleVO: ExtensionValuedObject) {
        return (moduleVO === null) ? undefined : this.loadJS(moduleVO.modulePath, moduleVO.moduleName, document.head);
    }


    loadJS(url: string, extensionName: string, location: Element) {
        return new Promise((resolved, rejected) => {
            const scriptTag = document.createElement('script');
            scriptTag.type = 'text/javascript';
            scriptTag.src = url;
            location.appendChild(scriptTag);
            scriptTag.onload = () => {
                // @ts-ignore
                const kitsuneExtensionFactories = window['kitsuneExtensionFactories'];
                const extension: Class = kitsuneExtensionFactories.get(extensionName);
                console.log(`binding ${extensionName} with ${extension} from kitsuneExtensionFactories: ${kitsuneExtensionFactories}`);
                container.bind<IInjectableExtensionModule>(extensionName).to(extension);
                const instance: IInjectableExtensionModule = container.get(extensionName);
                resolved(instance);
            }
            scriptTag.onerror = (error) => {
                rejected(error);
            }
        });
    }
}
