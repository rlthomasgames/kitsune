import colors = require('colors');
import * as fs from "fs";
import * as Path from "path";
export default class FlushAssetStoreService {
    constructor() {
        //console.log('check path', Path.dirname('../../'));
        //delete all asset packs generated from uploads, dont delete original uploads!

        const directory = "../packets";

        fs.readdir(directory, (err, files) => {
            if (err) {
                console.log('ERRORS: '+err+''.red.bold);
                console.error(err);
                //throw err;
            } else {
                console.log('FILES: ' + files + ''.bgYellow.black.bold);
                if(files.length > 0) {
                    for (const file of files) {
                        console.log(`attempting unlink with ${Path.join(directory, file)}`)
                        fs.unlink(Path.join(directory, file), (err) => {
                            if (err) throw err;
                        });
                    }
                }
            }
        });
    }
}