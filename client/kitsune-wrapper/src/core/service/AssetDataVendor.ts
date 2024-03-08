import {injectable} from "inversify";
import {AbstractModule} from "kitsune-wrapper-library";
import KitsuneHelper from "kitsune-wrapper-library/dist/base/helper/KitsuneHelper";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";
import {IDataDescriptor, IDataStore} from "kitsune-wrapper-library/dist/base/interfaces/extensions/IDataStore";
import IAsyncRequest from "kitsune-wrapper-library/dist/base/interfaces/IAsyncRequest";


/*
    ===================================================================
    ======= ASSET PACK FILE STRUCT LITTLE STRICT AT THE MOMENT ========
    ===================================================================
    ===================================================================
    ===================================================================
    Asset Packs Represent a Group of Files broken into Smaller Partials

    Asset Pak (Grouping for a collection of files) =>

 */

export type KAPacketMaterial = {
    assetPackUUID:string,
    fileNo:number,
    packetNumber:number,
    data?:ArrayBuffer
};

export type KAFileDataWrap = {
    pack:string,
    files:Array<Array<KAPacketMaterial>>
    total:number|undefined,
    appendedData:number
}

export type individualFileLookUpValues = {
    assetPackUUID:string,
    fileName:string,
    id:string
}
export type KADataLibrary = {
    allPacks:{[assetPackUUID:string]:KAFileDataWrap},
    allFiles:{[id:string]:individualFileLookUpValues}
}

@injectable()
class AssetDataVendor extends AbstractModule implements IInjectableExtensionModule, IAsyncRequest, IDataStore {
    name: string = 'AssetDataVendor';
    container = {
        dataVendor: {}
    };

    lib:KADataLibrary = {
        allPacks:{},
        allFiles:{}
    }

    dataStore = {};

    _wrapperConfig: any;

    dataWells: { [p: string]: { [p: string]: ArrayBuffer } };
    descriptors: Array<IDataDescriptor>;
    animCycle: number = 0;

    startModule() {
        console.log('running asset vendor')
        this.container = {dataVendor: this.dataStore};
    }

    public request(valuedObject?:unknown, gzipped?:boolean) {
        console.log(`asset data vendor REQUEST ca;;ed with : ${valuedObject}  - ${gzipped}  |||`);
    }

}
export {AssetDataVendor as default, AssetDataVendor};

KitsuneHelper.getKitsuneFactories().set('AssetDataVendor', AssetDataVendor);