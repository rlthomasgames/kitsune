<<<<<<< HEAD:client/kitsune-wrapper-extensions/src/extensions/AssetDataVendor.ts
import {injectable} from "inversify";
import {AbstractModule} from "kitsune-wrapper-library";
import KitsuneHelper from "kitsune-wrapper-library/dist/base/helper/KitsuneHelper";
import IInjectableExtensionModule from "kitsune-wrapper-library/dist/base/interfaces/IInjectableExtensionModule";
import {IDataDescriptor, IDataStore} from "kitsune-wrapper-library/dist/base/interfaces/extensions/IDataStore";
import IAsyncRequest from "kitsune-wrapper-library/dist/base/interfaces/IAsyncRequest";
=======
import {inject, injectable} from "inversify";
import IAsyncRequest from "kitsune-wrapper-library/dist/base/interfaces/IAsyncRequest";
import {TYPES} from "kitsune-wrapper-library";
import KitsuneHelper from "kitsune-wrapper-library/dist/base/helper/KitsuneHelper";


/*
    ===================================================================
    ======= ASSET PACK FILE STRUCT LITTLE STRICT AT THE MOMENT ========
    ===================================================================
    ===================================================================
    ===================================================================
    Asset Packs Represent a Group of Files broken into Smaller Partials

    Asset Pak (Grouping for a collection of files) =>

 */
>>>>>>> refs/remotes/origin/main:kitsune-wrapper-extensions/src/extensions/AssetDataVendor.ts

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

<<<<<<< HEAD:client/kitsune-wrapper-extensions/src/extensions/AssetDataVendor.ts
@injectable()
class AssetDataVendor extends AbstractModule implements IInjectableExtensionModule, IAsyncRequest, IDataStore {
    name: string = 'ThreeFrameworkExtension';
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

/*
@injectable()
class AssetDataVendor extends AbstractModule implements IInjectableExtensionModule, IAsyncRequest, IDataStore {
    name: string = 'AssetDataVendor';
    container?:{instance:any};

    descriptors:Array<IDataDescriptor>=[]//reference to storage location
    dataWells: {}//storage locations

    startModule(){
        //
        console.log(` ${KitsuneHelper.kChar} : AssetDataVendor - STARTED`);
    }

    @inject(TYPES.FetchConfig)
    _wrapperConfig: any;

    private static _instance:IDataStore;

=======
let animCycle : number = 0;

@injectable()
class AssetDataVendor implements IAsyncRequest {
    @inject(TYPES.FetchConfig)
    _wrapperConfig: any;

>>>>>>> refs/remotes/origin/main:kitsune-wrapper-extensions/src/extensions/AssetDataVendor.ts
    allAssets: KADataLibrary = {
        allPacks:{},
        allFiles:{},
    };

<<<<<<< HEAD:client/kitsune-wrapper-extensions/src/extensions/AssetDataVendor.ts
    public static getInstance():IDataStore {
        return this._instance;
    }

    constructor()
    {
        super();
        const bool = AssetDataVendor._instance === undefined;
        this.container = (bool) ? this.container = {
            instance: this
        } : this.container = this.container;
    }

=======
>>>>>>> refs/remotes/origin/main:kitsune-wrapper-extensions/src/extensions/AssetDataVendor.ts
    public request(valuedObject?:unknown, gzipped?:boolean) {
        console.log('request was' + valuedObject);
        const gotAssets: Promise<Array<{
            file: number,
            packetNumber: number,
            packUID: string,
            fullPath: string,
        }>> = new Promise<Array<{
            file: number;
            packetNumber: number;
            packUID: string;
            fullPath: string
        }>>((resolve) => {
            console.log('got aSSets resolved ????');
        });
        console.log(`OldFetchAssets Triggered `);
        return gotAssets;
    }

    private animatedFoxTowerProgressBar(progress:number, total?:number):void {
        const consoleAnim: Array<Function> = [
            () => {
                console.log(`wobbly tower of foxes : "
            \n\n\r  ${KitsuneHelper.kChar}\n\r ${KitsuneHelper.kChar}\n\r ${KitsuneHelper.kChar}\n\r ${KitsuneHelper.kChar}\n\r ${KitsuneHelper.kChar}`)
                total!==undefined ? console.log(`downloaded > ${progress} / ${total} ${KitsuneHelper.kChar}`) : console.log(`downloaded > ${progress}`);
            },
            () => {
                console.log(`wobbly tower of foxes : "
            \n\n\r${KitsuneHelper.kChar}\n\r ${KitsuneHelper.kChar}\n\r ${KitsuneHelper.kChar}\n\r ${KitsuneHelper.kChar}\n\r ${KitsuneHelper.kChar}`)
                total!==undefined ? console.log(`downloaded > ${progress} / ${total} ${KitsuneHelper.kChar}`) : console.log(`downloaded > ${progress}`);
            },
            () => {
                console.log(`wobbly tower of foxes : "
            \n\n\r  ${KitsuneHelper.kChar}\n\r ${KitsuneHelper.kChar}\n\r ${KitsuneHelper.kChar}\n\r ${KitsuneHelper.kChar}\n\r ${KitsuneHelper.kChar}`)
                total!==undefined ? console.log(`downloaded > ${progress} / ${total} ${KitsuneHelper.kChar}`) : console.log(`downloaded > ${progress}`);
            }
        ]
        consoleAnim[animCycle]()
        animCycle++;
        if (animCycle > 2) {
            animCycle = 0;
        }
    }

    storeAssetResponseFromWS(responseData:{ data:ArrayBuffer, index:number, assetPackUUID:string, total?:number }){
        const assetPackUUID = responseData.assetPackUUID.split(('/'))[0];
        let assetPack: KAFileDataWrap = {
                pack:assetPackUUID,
                files:[],
                total:NaN,
            appendedData:0,
        };

        if(!Number.isNaN(responseData.total) && (!responseData.total !== undefined)) {
            assetPack.total = responseData.total;
        }
        let assemblyMaterial:{assetPackUUID:string, fileNo:number, packetNumber:number, data?:ArrayBuffer}
            = {
            assetPackUUID:assetPackUUID,
            fileNo:NaN,
            packetNumber:NaN,
            data:undefined};
        responseData.assetPackUUID.split(('/'))[1].split('|').map((val, index, array) => {
            index===0 ? assemblyMaterial.fileNo = parseInt(val) : null;
            index===1 ? assemblyMaterial.packetNumber = parseInt(val) : null;
            console.log(`mapping ------------ ${JSON.stringify(assemblyMaterial)}`)
        })
        assemblyMaterial.data = responseData.data;
        const fileNo = assemblyMaterial.fileNo;
//        const packetNum = assemblyMaterial.packetNumber;

        let persistentPack = this.allAssets.allPacks[assetPackUUID];

        if(persistentPack === undefined){
            this.allAssets.allPacks[assetPackUUID] = assetPack;
            persistentPack = this.allAssets.allPacks[assetPackUUID];
        }

        if(persistentPack.files[fileNo] === undefined){
            persistentPack.files[fileNo] = [];
            persistentPack.files[fileNo].push(assemblyMaterial);
            persistentPack.appendedData++;
        } else {
            persistentPack.files[fileNo].push(assemblyMaterial);
            persistentPack.appendedData++;
        }

        let lengthCollected = 0;
        persistentPack.files.forEach(file => {
            file.forEach(pak =>{
                if(pak.data && pak.data.byteLength > 0)
                {
                    lengthCollected = lengthCollected + pak.data!.byteLength!
                    console.log(pak, pak.data.byteLength, lengthCollected);
                }

            })
        })
        persistentPack.files.forEach((value, index, array)=>{


        });
        this.animatedFoxTowerProgressBar(lengthCollected)
    }
}
<<<<<<< HEAD:client/kitsune-wrapper-extensions/src/extensions/AssetDataVendor.ts
*/
export {AssetDataVendor as default, AssetDataVendor};

KitsuneHelper.getKitsuneFactories().set('AssetDataVendor', AssetDataVendor);
=======

export {AssetDataVendor as default, AssetDataVendor};

KitsuneHelper.getKitsuneFactories().set('assetDataVendor', AssetDataVendor);
>>>>>>> refs/remotes/origin/main:kitsune-wrapper-extensions/src/extensions/AssetDataVendor.ts
