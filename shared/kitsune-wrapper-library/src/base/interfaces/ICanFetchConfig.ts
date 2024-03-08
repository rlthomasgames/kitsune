<<<<<<< HEAD:shared/kitsune-wrapper-library/src/base/interfaces/ICanFetchConfig.ts
=======
export type InjectedConfig = {
    getConfig(...args: any[]):IConciseConfig;
}
>>>>>>> refs/remotes/origin/main:kitsune-wrapper-library/src/base/interfaces/ICanFetchConfig.ts
export interface IConciseConfig {
    assetPacks: string;
}

export default interface ICanFetchConfig {
    getConfig: ()=>IConciseConfig;
    request(valuedObject?: unknown, gzipped?: boolean): Promise<unknown> | undefined | void;
}