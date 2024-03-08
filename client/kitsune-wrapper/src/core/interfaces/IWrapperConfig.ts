import IWrapperLayout from "./IWrapperLayout";
import {ExtensionValuedObject} from "../commands/InitWrapper";

export default interface IWrapperConfig {
    assetPacks: string;
    version?: number;
    language?: string;
    modules?:Array<ExtensionValuedObject>;
    application?: ExtensionValuedObject;
    securityToken?: string;
    gameConfig?: string;
    platformAddress?: string;
    layout?: IWrapperLayout;
}
