"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetPackSplitter = void 0;
const fs = __importStar(require("fs"));
const fflate_1 = require("fflate");
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
const RUN_TEST = true;
const testGzip = '81d96cd2ae3b0418c03755031305a5ca612acf549eac4e672da9b18f18a4f1f2';
class AssetPackSplitter {
    constructor(urlGZIP) {
        this.assetsLocationPrefix = './cms/uploaded/';
        this.assetsSuffix = '.gz';
        this.assetsPacketsPrefix = './cms/packets/';
        this.splitPartSize = 500;
        if (RUN_TEST) {
            urlGZIP = `${this.assetsLocationPrefix}${testGzip}${this.assetsSuffix}`; //test
            this.promiseOfManifest = this.splitWithManifest(urlGZIP).then((value) => {
                return value;
            });
        }
    }
    async splitWithManifest(url) {
        const manifest = this.splitAssets(url);
        return await manifest.then((returnedManifest) => {
            console.log('manifest', returnedManifest);
            return returnedManifest;
        });
    }
    async splitAssets(url) {
        const fileSize = await this.getFileSize(url);
        const numParts = this.numParts(fileSize);
        return await new Promise((resolve, reject) => {
            const packets = [];
            fs.open(url, (err, fd) => {
                fs.read(fd, (err2, bytesRead, buffer) => {
                    const wholeString = buffer.toString();
                    const array = wholeString.split('');
                    console.log('buffer = ', buffer, 'byte length = ', buffer.byteLength, 'array length = ', array.length, bytesRead);
                    console.log(array);
                    for (let i = 0; i < numParts; i++) {
                        let part = [];
                        for (let j = 0; j < this.splitPartSize; j++) {
                            part.push(array[j]);
                        }
                        packets.push(part);
                        console.log('part ', i, ' = ', part);
                        array.splice(0, this.splitPartSize);
                    }
                });
                fs.close(fd);
            });
            console.log('all packets', packets);
            const paths = [];
            // @ts-ignore
            const encoder = new TextEncoder();
            const uniqueID = encoder.encode(url.slice(0, 12)).join('');
            fs.opendir(this.assetsPacketsPrefix, (err, dir) => {
                console.log('open dir', this.assetsPacketsPrefix, err, dir);
                if (!err) {
                    fs.mkdir(`${dir.path}${uniqueID}`, undefined, (err, path) => {
                        console.log(`completed mkdir with`, err, path);
                        packets.forEach((packet, index) => {
                            const packetBuffer = Buffer.from((0, fflate_1.strToU8)(packet.join('')));
                            const packetFileName = `${this.assetsPacketsPrefix}${uniqueID}/${index}`;
                            fs.promises.writeFile(`${packetFileName}`, packetBuffer, {
                                flag: 'w',
                                encoding: 'binary'
                            }).then((value) => {
                                // paths.push(`${packetFileName}`);
                            });
                            paths.push(`${packetFileName}`);
                        });
                    });
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
    numParts(size) {
        const parts = Math.ceil(size / this.splitPartSize);
        if (parts < 1) {
            return 1;
        }
        return parts;
    }
    async getFileSize(url) {
        const stats = await fs.promises.stat(url);
        return stats.size;
    }
    getManifest() {
        return this.promiseOfManifest;
    }
}
exports.AssetPackSplitter = AssetPackSplitter;
