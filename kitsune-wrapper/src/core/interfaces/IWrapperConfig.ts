import IWrapperLayout from "./IWrapperLayout";

export default interface IWrapperConfig {
    version?: number;
    language?: string;
    modules?:Array<string>;
    securityToken?: string;
    gameConfig?: string;
    platformAddress?: string;
    layout?: IWrapperLayout;
}
