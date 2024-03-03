export type InjectedConfig = {
    getConfig(...args: any[]):IConciseConfig;
}
export interface IConciseConfig {
    assetPacks: string;
}

export default interface ICanFetchConfig {
    getConfig: ()=>IConciseConfig;
    request(valuedObject?: unknown, gzipped?: boolean): Promise<unknown> | undefined | void;
}