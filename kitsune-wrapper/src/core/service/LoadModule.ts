import {injectable} from "inversify";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";
import container from "../ioc/ioc_mapping";
import {ExtensionValuedObject} from "../commands/InitWrapper";
import IAsyncRequest from "kitsune-wrapper-library/dist/base/interfaces/IAsyncRequest";
import * as fflate from 'fflate';
import KitsuneHelper from "kitsune-wrapper-library/dist/base/helper/KitsuneHelper";

type Class = { new(...args: any[]): any; };

export type EssentialLoadingParams = {
    moduleName: string,
    modulePath: string,
    location: HTMLHeadElement,
    gzipped: boolean,
};

@injectable()
export class LoadModule implements IAsyncRequest {

    cacheKeys: Array<String>;

    constructor() {
        window.caches.keys().then((resolution) => {
            this.cacheKeys = resolution;
        }, ()=>{
            this.cacheKeys = [];
        });
    }

    request(moduleVO: ExtensionValuedObject, gzipped: boolean): Promise<unknown> | undefined {
        const cachedIndex = this.cacheKeys.indexOf(moduleVO.moduleName);
        console.log('loading module...', moduleVO.moduleName, moduleVO, cachedIndex);
        const essentialLoadingParams: EssentialLoadingParams  = {modulePath: moduleVO.modulePath, moduleName: moduleVO.moduleName, location: document.head, gzipped: (moduleVO.gzipped==true)};
        if (cachedIndex == -1) {
            return this.loadJS(essentialLoadingParams);
        } else {
            return this.loadFromCache(essentialLoadingParams);
        }
    }

    loadJS(parameters:EssentialLoadingParams) {
        return new Promise((resolved, rejected) => {
            const append = parameters.gzipped ? `.gz` : undefined;
            let finalPath:string = `${parameters['modulePath']}`
            finalPath = !append ? finalPath : finalPath.concat(append);
            fetch(`${finalPath}`, { cache: "force-cache" })
                .then((response) => {
                    if (response.status === 200 || response.status === 0) {
                        return Promise.resolve(response.blob());
                    } else {
                        return Promise.reject(new Error(response.statusText));
                    }
                }).then(
                (blob: Blob) => {
                    blob.arrayBuffer().then((arrayBuffer) => {
                        let uint8Array = new Uint8Array(arrayBuffer);
                        if(parameters.gzipped) {
                            uint8Array = fflate.decompressSync(uint8Array);
                        }
                        const origText = fflate.strFromU8(uint8Array);
                        const scriptTag = document.createElement('script');
                        scriptTag.type = 'text/javascript';
                        scriptTag.text = `${origText}`;
                        parameters.location.appendChild(scriptTag);
                        const extension: Class = KitsuneHelper.getKitsuneFactories().get(parameters.moduleName) as unknown as Class;
                        container.bind<IInjectableExtensionModule>(parameters.moduleName).to(extension);
                        const instance: IInjectableExtensionModule = container.get(parameters.moduleName);
                        this.storeInCache(parameters.moduleName, origText).then(()=>{
                            console.info('stored in cache', parameters.moduleName);
                        });
                        resolved(instance);
                    });
                });
        });
    }

    async storeInCache(extensionName: string, extensionContent: string) {
        window.caches.open(extensionName).then((cache) => {
            const cacheStoreResponse = new Response(extensionContent);
            cache.put(extensionName, cacheStoreResponse).then((value)=>{
                console.log(`putting in cache... ${extensionName} - ${cacheStoreResponse}`);
            }).then(()=>{
                console.log(`completed cache storage of... ${extensionName} - ${cacheStoreResponse}`);
            });
        })
    }

    loadFromCache(parameters:EssentialLoadingParams) : Promise<unknown> {
        return new Promise((resolved, rejected) => {
            window.caches.open(parameters.moduleName).then(value => {
                caches.open(parameters.moduleName).then((returnedStorage) => {
                    returnedStorage.match(parameters.moduleName).then(contentValue => {
                        if (contentValue instanceof Response) {
                            contentValue.text().then(contentText => {
                                const blobURL = URL.createObjectURL(new Blob([contentText], { type : 'text/javascript' }))
                                const scriptTag = document.createElement('script');
                                scriptTag.type = 'text/javascript';
                                scriptTag.src = blobURL;
                                scriptTag.setAttribute('priority', 'highest');
                                scriptTag.onload = () => {
                                    const extension: Class = KitsuneHelper.getKitsuneFactories().get(parameters.moduleName) as unknown as Class;
                                    container.bind<IInjectableExtensionModule>(parameters.moduleName).to(extension);
                                    const instance: IInjectableExtensionModule = container.get(parameters.moduleName);
                                    resolved(instance);
                                }
                                scriptTag.onerror = (error) => {
                                    rejected(error);
                                }
                                parameters.location.appendChild(scriptTag);
                            });
                        }
                    })
                });
            })
        })
    }
}