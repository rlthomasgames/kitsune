import colors = require('colors');
import FlushAssetStoreService from "./FlushAssetStoreService";
import BuildPacketsFromUploadsService from "./BuildPacketsFromUploadsService";
import {UploadRoutes} from "./routes/UploadRoutes";
const port = 8081;
const express = require('express');
const fileUpload = require('express-fileupload');
import {IncomingForm} from 'formidable';

import {NextFunction, Request, Response} from "express-serve-static-core";
import {base64ToBytes} from "./encoding/Base64";
import fflate_1, {strFromU8, strToU8, unzip, Zip, zip} from "fflate";
import {createUnzip} from "node:zlib";
import * as fs from "fs";
const cors = require('cors');
const app = express();
const routes: Array<UploadRoutes> = [];
app.use(cors({origin:'https://localhost:8080'}));

// default options
app.use(fileUpload());

const asyncAwait = (p:Promise<any>)=>{
    return <Awaited<any>>p;
}

routes.push(new UploadRoutes(app, 'UploadRoutes'));

app.route('/upload').post((
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    let form = new IncomingForm();
    const readRequest = req.read();
    //console.log('received body', req.body, readRequest);
    form.parse(req, (err, fields, files)=> {
        //console.log('parsing form data with uploaded file', req);
        if (err) {
            console.log('we got error', err)
        } else {
            const allfiles: { files: string } = JSON.parse(JSON.stringify(fields!));
            const files = allfiles.files;
            const rawZipped = base64ToBytes(files);
            const stringZip = strFromU8(rawZipped);
            //console.log('blobZip =', string);
            const arr = stringZip.split('Kitsune Wrapper Asset ')[1].split('|')
            const assetPackUUID = arr[1];
            const filename = arr[2].split(' ')[2];
            console.log('asset pack ', assetPackUUID, filename);
            console.log('filename :', arr[2].split(' '));
            const directory = "../uploaded/"+assetPackUUID+"";
            if(!fs.existsSync(directory)){
                fs.mkdirSync(directory, {recursive:true});
                fs.writeFileSync(directory+"/"+filename+".zip", rawZipped);
            }
                /*
                .split('|');

                 */
            /*
            unzip(rawZipped, {}, (err, data) => {
                if (err) {
                    console.log('err:', err);
                } else {
                    console.log('finished unzip')
                    if(data){
                        console.log('unzipped:', data)
                        const filename = Object.keys(data)[0];
                        const dataObject : {[x:string]:Uint8Array} = data;
                        const blob = new Blob()
                        //const filename = Object.keys(dataObject)[0];
                        const file = fs.writeFile(filename, dataObject[filename], ()=>{
                            console.log
                        })
                        const unzippedFile:File = new File([data[filename]], filename);
                        console.log('ready to store', unzippedFile);
                    }
                }
            })

             */
        }
    });
});

class AssetVendorService {
    //1 : clear any assets stored for time being, so work on uploader and gzipper can be carried out.
    task0:FlushAssetStoreService;
    task1:BuildPacketsFromUploadsService;
    constructor() {
        colors.enable();
        console.log('CLEARING STORE'.green.bgMagenta.bold);
        this.task0 = new FlushAssetStoreService();
        console.log('UNIFY UPLOADS'.green.bgMagenta.bold);
        this.task1 = new BuildPacketsFromUploadsService();
        app.listen(port, ()=> {
            console.log('listening port', port);
            routes.forEach((route) => {
                console.log(`Routes configured for ${route.getName()}`);
            });
        });
    }
}

export function startAssetVendorService() { return new AssetVendorService()};

//this is our entry into AssetServices
startAssetVendorService();

export {AssetVendorService as default, AssetVendorService};