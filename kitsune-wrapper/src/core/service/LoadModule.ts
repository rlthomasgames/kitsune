import {injectable} from "inversify";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";
import container from "../ioc/ioc_mapping";
import {ExtensionValuedObject} from "../commands/InitWrapper";
import IAsyncRequest from "kitsune-wrapper-library/dist/base/interfaces/IAsyncRequest";
import * as fflate from 'fflate';

type Class = { new(...args: any[]): any; };

@injectable()
export class LoadModule implements IAsyncRequest {

    request(moduleVO: ExtensionValuedObject, gzipped:boolean = true) {
        if(gzipped) {
            return this.loadGZipJS(moduleVO.modulePath, moduleVO.moduleName, document.head);
        } else {
            return (moduleVO === null) ? undefined : this.loadJS(moduleVO.modulePath, moduleVO.moduleName, document.head);
        }
    }

    loadGZipJS(url: string, extensionName: string, location: Element) {
        return new Promise((resolved, rejected) => {
            fetch(`${url}.gz`)
            .then((response) => {
                if (response.status === 200 || response.status === 0) {
                    return Promise.resolve(response.blob());
                } else {
                    return Promise.reject(new Error(response.statusText));
                }
            }).then(
            (blob: Blob) => {
                blob.arrayBuffer().then((arrayBuffer) => {
                    const uint8Array = new Uint8Array(arrayBuffer);
                    const ungzipped = fflate.decompressSync(uint8Array);
                    const origText = fflate.strFromU8(ungzipped);
                    console.log(`uint8Array ${origText} -> `);
                    const scriptTag = document.createElement('script');
                    scriptTag.type = 'text/javascript';
                    scriptTag.text = `${origText}`;
                    location.appendChild(scriptTag);
                    // @ts-ignore
                    const kitsuneExtensionFactories = window['kitsuneExtensionFactories'];
                    const extension: Class = kitsuneExtensionFactories.get(extensionName);
                    console.log(`binding ${extensionName} with ${extension} from kitsuneExtensionFactories: ${kitsuneExtensionFactories}`);
                    container.bind<IInjectableExtensionModule>(extensionName).to(extension);
                    const instance: IInjectableExtensionModule = container.get(extensionName);
                    resolved(instance);
                });
            });
        });
    }

    loadJS(url: string, extensionName: string, location: Element) {
        return new Promise((resolved, rejected) => {
            const scriptTag = document.createElement('script');
            scriptTag.type = 'text/javascript';
            scriptTag.src = `${url}`;
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
