
export interface IDataDescriptor {
    //information for object file types stored
    ext?:string,
    loader?:string,
    framework?:string,
    dataWell?:string,
}
export interface IDataStore {
    descriptors:Array<IDataDescriptor>//reference to storage location
    dataWells:{//all wells
        [z:string]:{//asset type
            [w:string]:ArrayBuffer//asset data
        }
    }
}