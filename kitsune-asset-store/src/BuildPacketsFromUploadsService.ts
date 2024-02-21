import colors = require('colors');
import * as fs from "fs";
import * as Path from "path";
import {Zippable, ZippableFile, zipSync, zip, Zip, ZipInputFile, ZipPassThrough} from "fflate";

export default class BuildPacketsFromUploadsService {
    constructor() {
        //console.log('check path', Path.dirname('../../'));
        //delete all asset packs generated from uploads, dont delete original uploads!

        const directory = "../uploaded";
        /*

        fs.readdir(directory, (err, uploaded_folders) => {
            if (err) {
                console.log('ERRORS: ' + err + ''.red.bold);
                console.error(err);
                //throw err;
            } else {
                uploaded_folders.forEach(uploaded_asset_folder => {
                    const filePath = Path.join(directory, uploaded_asset_folder);
                    let fileSize:number;
                    fs.stat(filePath, (err, stats)=>{
                        fileSize = stats.size;
                    })
                    fs.readdir(filePath, (err, files) => {
                        if (err) {
                            console.log('ERRORS: '+err+''.red.bold);
                            console.error(err);
                            //throw err;
                        } else {
                            console.log('FILES: ' + files + ''.bgYellow.black.bold);
                            if (files.length > 0) {
                                const ALREADY_COMPRESSED = [
                                    'zip', 'gz', 'png', 'jpg', 'jpeg', 'pdf', 'doc', 'docx',
                                    'ppt', 'pptx', 'xls', 'xlsx', 'heic', 'heif', '7z', 'bz2',
                                    'rar', 'gif', 'webp', 'webm', 'mp4', 'mov', 'mp3', 'aifc'
                                    // Add whatever extensions you don't want to compress
                                ];
                                const zip = new Zip();
                                let fileNum = 0;
                                for (const file of files) {
                                    fileNum++;
                                    const filePath = Path.join(directory, uploaded_asset_folder, file);
                                    // If file is a File object, use this:
                                    const ext = file.slice(file.lastIndexOf('.') + 1);
                                    const defl = new ZipPassThrough(file);
                                    zip.add(defl);
                                    let ind = 262144;
                                    const fr = new FileReader();
                                    fr.addEventListener('progress', (ev)=>{
                                        console.log('\r splitting', file, 'into ', Math.ceil(fileSize/ind) , ' parts : progress =>', ((ev.total/100)*ev.loaded).toString()+"%".bgYellow.black.rainbow);
                                    })
                                    if(fileNum == files.length) {
                                        fr.readAsArrayBuffer(new Blob([fs.readFileSync(filePath) as BlobPart]));
                                    }
                                    fr.readAsArrayBuffer(new Blob([fs.readFileSync(filePath) as BlobPart]));
                                }
                            }
                        }
                    });
                })
            }
        });*/
    }
}