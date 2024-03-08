import colors = require('colors');
import FlushAssetStoreService from "./FlushAssetStoreService";
import BuildPacketsFromUploadsService from "./BuildPacketsFromUploadsService";
import {UploadRoutes} from "./routes/UploadRoutes";

import express from 'express';
import fileUpload from 'express-fileupload';
import {Fields, IncomingForm} from 'formidable';
import {NextFunction, Request, Response} from "express-serve-static-core";
import {base64ToBytes} from "./encoding/Base64";
import {strFromU8} from "fflate";
import * as fs from "fs";
import {IncomingMessage} from "node:http";
import cors from 'cors';
const app = express();
const routes: Array<UploadRoutes> = [];
import crypto from "crypto";
const port = 8081;
import KitsuneHelper from "kitsune-wrapper-library/dist/base/helper/KitsuneHelper";


interface AnyPromise<T> extends Promise<T>{

}

const startExpress = ()=> {
    app.listen(port, () => {
        //app
        console.log('listening port', port);
        routes.forEach((route) => {
            console.log(`Routes configured for ${route.getName()}`);
        });
    });
    return true;
}

class AssetVendorService {
    //1 : clear any assets stored for time being, so work on uploader and gzipper can be carried out.
    constructor() {
        colors.enable();
        console.log('CLEARING STORE');
        const chained:Array<Function|AnyPromise<boolean>> = [
            ()=> asyncAwait(new FlushAssetStoreService() as Promise<boolean>) as boolean,
            ()=>{new BuildPacketsFromUploadsService(); return true},
            startExpress
        ]
        while (chained[0] !== undefined) {
            (chained[0] as ()=>boolean).call(null) ? chained.splice(0, 1) : console.log('startup failed');
        }
    }

    storeFileFromUint8(files:Uint8Array,cb:()=>void,incomingMessage?:IncomingMessage) {
        incomingMessage ? console.log(incomingMessage) : null;
        const uploadedFile = files;
        const tempDirectory = "../uploaded/incoming";
        if (!fs.existsSync(tempDirectory)) {
            fs.mkdirSync(tempDirectory, {recursive: true});
        }
        const uID = crypto.randomUUID();
        const uShortID = (uID.slice(uID.length-12, uID.length-1));
        const hashHex = hexUtil(uShortID, 6, false);
        const tempName = tempDirectory + `/incoming${hashHex}.tmp`;
        fs.writeFileSync(tempName, uploadedFile);
        // @ts-ignore
        process.stdout.write(`${KitsuneHelper.kChar} < wrote file :  ${tempName} \n\n`);

        const stringZip = strFromU8(uploadedFile);
        const arr = stringZip.split('Kitsune Wrapper Asset ')[1].split('|')
        const assetPackUUID = arr[1];

        const directory = "../uploaded/" + assetPackUUID + "";

        const filename = arr[2].split(' ')[2];
        // @ts-ignore
        process.stdout.write(`${KitsuneHelper.kChar} Almost Finished ... \n`)
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, {recursive: true});
        }
        const fullPath = `${directory}/${filename}.zip`;
        fs.renameSync(tempName, fullPath);
        const successOut = (finial:()=>void) => {
            // @ts-ignore
            process.stdout.write(`${KitsuneHelper.kChar} ~ ~ ~ ~ asset pack \n` +
                assetPackUUID.zebra + '\n' +
                `|......includes....<- ` +
                `${filename}\n`.rainbow +
                `|...length zipped..<- ` +
                `${uploadedFile.length}\n` +
                `|....temp file.....<- \n` +
                `${tempName.replace(tempDirectory, '')}` +`\n\n`,
            )
            finial();
        }
        const failOut = () => {
            console.log('something went horribly wrong...\n', `${tempName}\n${fullPath}\n${uploadedFile.length}\n${fullPath}\n${filename}\n${assetPackUUID}\n`)
        }
        fs.stat(fullPath, (err, stats)=>{
                const success = stats.isFile() && fullPath.toString().split('/').pop() === filename + '.zip';
                success ? (successOut(cb) ) : failOut();
        })
        const moveSuccess =  filename+`.zip`;
        return moveSuccess;
    }
}

export function startAssetVendorService() { return new AssetVendorService()};

//this is our entry into AssetServices
const assetVendorService = startAssetVendorService();
// @ts-ignore
app.use(cors({origin:'https://localhost:8080'}));

// default options
app.use(fileUpload());

const hexUtil = (str: string, reduceSize:number, pad:boolean) => {
    console.log('hexing string: '+str);
    let hash = 0;
    str.split('').forEach(char => {
        hash = char.charCodeAt(0) + ((hash << reduceSize-1) - hash)
    })
    let hex = ''
    for (let i = 0; i < Math.floor(reduceSize/2); i++) {
        const value = (hash >> (i * 8)) & 0xff
        hex += value.toString(16)
    }
    return (pad ? hex.padStart(3, '00x') : hex as String);
}

routes.push(new UploadRoutes(app, 'UploadRoutes'));

app.route('/upload').post((
    req: Request,
    res: Response,
    next: NextFunction
)=> {

    let form = new IncomingForm();
    form.once("end", ()=>{
        process.stdout.write(`END =) \n`);
    })
    process.stdout.write('incoming form has events ... '+form.eventNames()+'');
    form.on("fileBegin", (formName, file)=>{
        process.stdout.write("\r\x1b[k");
        // @ts-ignore
        process.stdout.write(`${KitsuneHelper.kChar} > file begin :  `);
        process.stdout.write(`\n`);
    });
    form.on("file", (formName, file)=>{
        process.stdout.write("\r\x1b[k");
        // @ts-ignore
        process.stdout.write(`${KitsuneHelper.kChar} > file :  `);
        process.stdout.write(`\n`);
    })
    form.on("progress", (bytesReceived, bytesExpected)=>{
        process.stdout.write("\r\x1b[k");
        // @ts-ignore
        process.stdout.write(`${KitsuneHelper.kChar} > progress :  `);
        process.stdout.write(`${(Math.floor(100/(bytesExpected*bytesReceived))).toString()} %`.rainbow,);
        if(Math.floor(100/bytesExpected*bytesReceived) === 100){
            process.stdout.write(`\n -> complete\n`);
        }
    })
    form.on("error", (err:Error)=>{
        process.stdout.write("\r\x1b[k");
        // @ts-ignore
        process.stdout.write(`${KitsuneHelper.kChar} > incoming data :  `);

        console.log('|||||||||||||| Error  |||||||||||||');
        console.log(`Error: ${err.name} : ${err}  \n`);
        err.stack != undefined ? console.log(err.stack!.bgYellow) : console.log(`... missing stack trace ... \n`);
        process.stdout.write(`\n`);
        process.stdout.write(`\n`);
        res.sendStatus(500);
        next();
    })
    form.parse(req as IncomingMessage, (err, fields:Fields)=> {
        if (err) {
            // @ts-ignore
            process.stdout.write(`${KitsuneHelper.kChar} we got error`, err)
        } else {
            console.log();
            // @ts-ignore
            process.stdout.write(`\n`.reset + `${KitsuneHelper.kChar} < some request info: \n`)
            if (fields.files) {
                const files = fields!.files!;
                const uploadedFile = base64ToBytes(files);
                const storedName = assetVendorService.storeFileFromUint8(uploadedFile, ()=>{
                    // @ts-ignore
                    process.stdout.write(`${KitsuneHelper.kChar} > FINISHED ${storedName}\n\n`);
                    // @ts-ignore
                    process.stdout.write(`\n${KitsuneHelper.kChar} moved file to asset pack successfully\n\n`)
                    //res.sendStatus(200);
                    next();
                }, req as IncomingMessage);
            }
        }
        next(err);
        });
    });

app.route('/pack').post((
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    console.log('pack', req);
    res.sendStatus(200)
    next();
});

export {AssetVendorService as default, AssetVendorService};

//export {T as AssetVendorService.T, T};

export function asyncAwait(p: AnyPromise<any>):any{
    return p.then(value => value) as Awaited<any>;
}