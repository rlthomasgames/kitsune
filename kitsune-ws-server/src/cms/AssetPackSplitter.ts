import * as fs from "fs";
import sha256 from "sha256";
import {strToU8} from "fflate";

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
const RUN_TEST: boolean = true;
const testGzip = '81d96cd2ae3b0418c03755031305a5ca612acf549eac4e672da9b18f18a4f1f2'

export class AssetPackSplitter {
    private assetsLocationPrefix = './cms/uploaded/';
    private assetsSuffix = '.gz';
    private assetsPacketsPrefix: string = './cms/packets/';
    private splitPartSize = 500;
    private promiseOfManifest:Promise<IAssetPacksManifest>;

    constructor(urlGZIP: string) {
        if (RUN_TEST) {
            urlGZIP = `${this.assetsLocationPrefix}${testGzip}${this.assetsSuffix}` //test
            this.promiseOfManifest = this.splitWithManifest(urlGZIP).then((value) => {
                return value;
            });
        }
    }

    async splitWithManifest(url:string) {
        const manifest = this.splitAssets(url);
        return await manifest.then((returnedManifest) => {
            console.log('manifest', returnedManifest);
            return returnedManifest;
        });
    }

    async splitAssets(url: string) {
        const fileSize = await this.getFileSize(url);
        const numParts = this.numParts(fileSize);
        return await new Promise<IAssetPacksManifest>((resolve, reject) => {
            const packets: Array<Array<string>> = [];
            fs.open(url, (err, fd) => {
                fs.read(fd, (err2, bytesRead, buffer) => {
                    const wholeString = buffer.toString();
                    const array: Array<string> = wholeString.split('');
                    console.log('buffer = ', buffer, 'byte length = ', buffer.byteLength, 'array length = ', array.length, bytesRead);
                    console.log(array);
                    for (let i = 0; i < numParts; i++) {
                        let part: Array<string> = [];
                        for (let j = 0; j < this.splitPartSize; j++) {
                            part.push(array[j]);
                        }
                        packets.push(part);
                        console.log('part ', i, ' = ', part);
                        array.splice(0, this.splitPartSize);
                    }
                })
                fs.close(fd);
            })
            console.log('all packets', packets);
            const paths: Array<string> = [];
            // @ts-ignore
            const encoder = new TextEncoder();
            const uniqueID = encoder.encode(url.slice(0,12)).join('');
            fs.opendir(this.assetsPacketsPrefix, (err, dir) => {
                console.log('open dir', this.assetsPacketsPrefix, err, dir);
                if (!err) {
                    fs.mkdir(`${dir.path}${uniqueID}`, undefined, (err, path) => {
                        console.log(`completed mkdir with`, err, path);
                        packets.forEach((packet: Array<string>, index) => {
                            const packetBuffer = Buffer.from(strToU8(packet.join('')) as Uint8Array);
                            const packetFileName = `${this.assetsPacketsPrefix}${uniqueID}/${index}`;
                            fs.promises.writeFile(`${packetFileName}`, packetBuffer, {
                                flag: 'w',
                                encoding: 'binary'
                            }).then((value) => {
                                // paths.push(`${packetFileName}`);
                            });
                            paths.push(`${packetFileName}`);
                        });
                    })
                }
                dir.close(() => {
                    fs.promises.writeFile(`${uniqueID}.pak`, JSON.stringify({
                        uniqueID,
                        pathsToParts: paths
                    }));
                    resolve({
                        uniqueID,
                        pathsToParts: paths
                    });
                });
            });
        });
    }

    numParts(size: number) {
        const parts = Math.ceil(size / this.splitPartSize);
        if (parts < 1) {
            return 1;
        }
        return parts;
    }

    async getFileSize(url: string) {
        const stats = await fs.promises.stat(url);
        return stats.size;
    }

    getManifest() {
        return this.promiseOfManifest;
    }
}

export interface IAssetPacksManifest {
    uniqueID: string;
    pathsToParts: string[];
}