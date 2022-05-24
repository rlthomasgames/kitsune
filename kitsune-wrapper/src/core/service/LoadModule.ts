import {injectable} from "inversify";
import AsyncRequest from "kitsune-wrapper-library/dist/base/interfaces/AsyncRequest";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";
import container from "../ioc/ioc_mapping";

type Class = { new(...args: any[]): any; };

@injectable()
export class LoadModule implements AsyncRequest {
    constructor() {
    }

    request(moduleName: string) {
        if (moduleName !== null) {
            return this.loadJS('./extensions/helloWorldExtension.bundle.js', 'HelloWorldExtension', 'test', document.head);
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
