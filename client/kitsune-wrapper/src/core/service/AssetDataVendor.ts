import {injectable} from "inversify";
import {AbstractModule} from "kitsune-wrapper-library";
import KitsuneHelper from "kitsune-wrapper-library/dist/base/helper/KitsuneHelper";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";
import {IDataDescriptor, IDataStore} from "kitsune-wrapper-library/dist/base/interfaces/extensions/IDataStore";
import IAsyncRequest from "kitsune-wrapper-library/dist/base/interfaces/IAsyncRequest";
import {APResponseData} from "kitsune-wrapper-library/dist/base/constants/SockConn";
import {unzipSync} from "fflate";


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
    APFileNo:number,
    filename:string,
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

    dataWells: { [a: string]: { [p: string]: ArrayBuffer } } = {};
    descriptors: Array<IDataDescriptor>;
    animCycle: number = 0;

    startModule() {
        console.log('running asset vendor')
        this.container = {dataVendor: this.dataStore};
    }

    public request(valuedObject?:unknown, gzipped?:boolean) {
        console.log(`asset data vendor REQUEST ca;;ed with : ${valuedObject}  - ${gzipped}  |||`);
    }

    storeAssetResponseFromWS(data: APResponseData) {
        console.log('STORE DATA:', data.data);
        if(this.dataWells[data.assetPackUUID] === undefined){
            this.dataWells[data.assetPackUUID] = {};
        }
        this.dataWells[data.assetPackUUID]['p'+data.index] = data.data;
        const keys = Object.keys(this.dataWells[data.assetPackUUID])
        if(data.index === data.total && keys.length === data.total) {
            keys.sort((a, b)=>{
                const numA = a.split('p')[0];
                const numB = b.split('p')[0];
                if(numA > numB) return -1
                return 1
            });
            let dataParts:Array<ArrayBuffer> = [];
            keys.forEach((p)=>{
                dataParts.push(this.dataWells[data.assetPackUUID][p])
            });
            const zippedBlob = new Blob(dataParts, {type:'application/zip'});
            let fileReader = new FileReader();
            fileReader.onload = function(event) {
                const arrayBuffer:ArrayBuffer = event.target!.result as ArrayBuffer;
                console.log('final array buffer >>>>', arrayBuffer);
                let newUint = new Uint8Array(arrayBuffer)
                const unzipped = unzipSync(newUint);
                console.log('decompressed = ', unzipped)
            };
            fileReader.readAsArrayBuffer(zippedBlob);
        }
    }
    /**
     * Creates a new Uint8Array based on two different ArrayBuffers
     *
     * @private
     * @param {ArrayBuffer} buffer1 The first buffer.
     * @param {ArrayBuffer} buffer2 The second buffer.
     * @return {ArrayBuffer} The new ArrayBuffer created out of the two.
     */
    appendBuffer(buffer1:ArrayBuffer, buffer2:ArrayBuffer) {
        var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
        tmp.set(new Uint8Array(buffer1), 0);
        tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
        return tmp;
    };

}
export {AssetDataVendor as default, AssetDataVendor};

KitsuneHelper.getKitsuneFactories().set('AssetDataVendor', AssetDataVendor);