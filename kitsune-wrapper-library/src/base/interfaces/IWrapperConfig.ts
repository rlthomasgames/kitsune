import IWrapperLayout from "../../../../kitsune-wrapper/src/core/interfaces/IWrapperLayout";
import {ExtensionValuedObject} from "../../../../kitsune-wrapper/src/core/commands/InitWrapper";

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
