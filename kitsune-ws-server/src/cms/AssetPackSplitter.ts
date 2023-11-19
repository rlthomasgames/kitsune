 import * as fs from "fs";

/*========================================

  intentions assets uploaded to server in gzip format
  server will save locally into splits parts and returns a manifest
  with a uniqueID and number of parts

  these parts are later served to client over web socket connection
  in small packets and reconstructed to form a .gz which can be
  decompressed and used to serve assets

  I: <string>local file location of entire asset pack in gzip form
  O: uniqueID<string>, amount of packets<number>

======================================= */
const RUN_TEST :boolean = true;
const testGzip = './cms/split_pack_test/81d96cd2ae3b0418c03755031305a5ca612acf549eac4e672da9b18f18a4f1f2.gz'

export class AssetPackSplitter {
     private splitPartSize = 500;
    constructor(urlGZIP: string) {
        if(RUN_TEST) {
            urlGZIP = testGzip //test
            const manifest = this.splitAssets(urlGZIP);
            manifest.then((returnedManifest) => {
                console.log('manifest', manifest);
            });
        }
    }

    async splitAssets(url:string) {
        const fileSize = await this.getFileSize(url);
        const numParts = this.numParts(fileSize);
        return await new Promise<IAssetPacksManifest>(async (resolve, reject) => {
            fs.open(url, (err, fd)=>{
                fs.read(fd, (err2, bytesRead, buffer)=>{
                    const wholeString = buffer.toString();
                    const array = wholeString.split('');
                    console.log('buffer = ', buffer, 'byte length = ', buffer.byteLength, 'array length = ', array.length, bytesRead);
                    console.log(array);
                    for(let i = 0; i < numParts; i++){
                        let part = [];
                        for( let j = 0; j < this.splitPartSize; j++) {
                            part.push(array[j]);
                        }
                        console.log('part ', i, ' = ', part);
                        array.splice(0, this.splitPartSize);
                    }
                })
            })
        });
    }

    numParts(size:number){
        const parts = Math.ceil(size / this.splitPartSize);
        if(parts < 1) {
            return 1;
        }
        return parts;
    }

    async getFileSize(url:string) {
        const stats = await fs.promises.stat(url);
        return stats.size;
    }
}

export interface IAssetPacksManifest {
    uniqueID:string;
    pathsToParts:string[];
}