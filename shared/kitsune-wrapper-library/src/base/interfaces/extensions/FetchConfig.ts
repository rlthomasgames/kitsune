import {inject, injectable} from "inversify";
import * as _ from "lodash";
import IAsyncRequest from "kitsune-wrapper-library/dist/base/interfaces/IAsyncRequest";
import IWrapperConfig from "../IWrapperConfig";

@injectable()
export class FetchConfig implements IAsyncRequest {
    private baseConfig: IWrapperConfig;
    private urlParams: IWrapperConfig;
    private finalConfig: IWrapperConfig;

    name : 'FetchConfig';

    public request(): Promise<boolean|Response> {
        const params = {};
        this.getUrlParams().forEach((value, key, parent) => {
            Object.defineProperty(params, key, {value: value});
        });
        this.urlParams = params as unknown as IWrapperConfig;
        this.baseConfig = Object.assign({}, baseConfig);
        const resp:Promise<boolean|Response> = fetch('./config/wrapper.json').then((value)=>{
            if(value.body !== null) {
                console.log(JSON.parse(JSON.stringify(value)))
                const dataReturned = value.json()
                return dataReturned.then((data: any) => {
                    return Promise.resolve(this.configLoaded(data));
                })
            } else {
                return Promise.resolve(false);
            }
        })
        return resp;
    }

    configLoaded(fetchedConfig:IWrapperConfig) {
        const merge0 = _.merge(this.urlParams, this.baseConfig);
        this.finalConfig = Object.assign({}, fetchedConfig, merge0);
        this.finalConfig = _.merge(this.finalConfig, fetchedConfig);
        return true;
    }

    getConfig = () => this.finalConfig;

    private getUrlParams = () =>  new URLSearchParams(window.location.search);
}

const baseConfig: IWrapperConfig = {
    assetPacks: "",
    version: 0,
    securityToken: "none",
    language: "en-UK",
    gameConfig: "localhost:9090/config/lobby.json",
    platformAddress: "localhost:7070/socket",
    layout: {
        name: "layout0"
    }
};
