import colors = require('colors');
import FlushAssetStoreService from "./FlushAssetStoreService";
import BuildPacketsFromUploadsService from "./BuildPacketsFromUploadsService";
import {UploadRoutes} from "./routes/UploadRoutes";
const port = 8081;
const express = require('express');
import fileUpload, {UploadedFile} from 'express-fileupload';
import {Fields, IncomingForm} from 'formidable';
import {NextFunction, Request, Response} from "express-serve-static-core";
import {base64ToBytes} from "./encoding/Base64";
import {strFromU8, strToU8} from "fflate";
import * as fs from "fs";
import {IncomingMessage} from "node:http";
const cors = require('cors');
const kChar = '🦊';
const app = express();
const routes: Array<UploadRoutes> = [];
import crypto from "crypto";

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
            app
            console.log('listening port', port);
            routes.forEach((route) => {
                console.log(`Routes configured for ${route.getName()}`);
            });
        });
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
        process.stdout.write(`${kChar} < wrote file :  ${tempName} \n\n`);

        const stringZip = strFromU8(uploadedFile);
        const arr = stringZip.split('Kitsune Wrapper Asset ')[1].split('|')
        const assetPackUUID = arr[1];

        const directory = "../uploaded/" + assetPackUUID + "";

        const filename = arr[2].split(' ')[2];
        process.stdout.write(`${kChar} Almost Finished ... \n`)
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, {recursive: true});
        }
        const fullPath = `${directory}/${filename}.zip`;
        fs.renameSync(tempName, fullPath);
        const successOut = (finial:()=>void) => {
            process.stdout.write(`${kChar} ~ ~ ~ ~ asset pack \n` +
                assetPackUUID.zebra + '\n' +
                `|......includes....<- `.bgGreen +
                `${filename}\n`.rainbow +
                `|...length zipped..<- `.bgGreen +
                `${uploadedFile.length}\n`.rainbow +
                `|....temp file.....<- `.bgGreen +
                `${tempName.replace(tempDirectory, '')}`.rainbow +`\n\n`.bgYellow.black.italic,
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

app.use(cors({origin:'https://localhost:8080'}));

// default options
app.use(fileUpload());

const asyncAwait = (p:Promise<any>)=>{
    return <Awaited<any>>p;
}

const stringToColour = (str: string) => {
    let hash = 0;
    str.split('').forEach(char => {
        hash = char.charCodeAt(0) + ((hash << 5) - hash)
    })
    let colour = '#'
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff
        colour += value.toString(16).padStart(2, '0')
    }
    return colour
}

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

type DataFiles = {
    files:string
};

routes.push(new UploadRoutes(app, 'UploadRoutes'));

app.route('/upload').post((
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    let form = new IncomingForm();
    form.on("progress", (bytesReceived, bytesExpected)=>{
        process.stdout.write("\r\x1b[k");
        process.stdout.write(`${kChar} > incoming data :  `.bgGreen.black.italic);
        process.stdout.write(`${(Math.floor(100/bytesExpected*bytesReceived)).toString()} %`.rainbow,);
        if(Math.floor(100/bytesExpected*bytesReceived) === 100){
            process.stdout.write(`\n -> complete\n`);
        }
    })
    form.on("error", (err:Error)=>{
        console.log('|||||||||||||| Error  |||||||||||||'.zebra.underline);
        console.log(`Error: ${err.name} : ${err}  \n`.bgRed.underline);
        err.stack != undefined ? console.log(err.stack!.bgYellow) : console.log(`... missing stack trace ... \n`.bgRed.underline);
        res.sendStatus(500);
        next();
    })
    form.parse(req as IncomingMessage, (err, fields:Fields)=> {
        if (err) {
            process.stdout.write(`${kChar} we got error`, err)
        } else {
            console.log();
            process.stdout.write(`\n`.reset + `${kChar} < some request info: \n`.bgYellow.green)
            if (fields.files) {
                const files = fields!.files!;
                const uploadedFile = base64ToBytes(files);
                const storedName = assetVendorService.storeFileFromUint8(uploadedFile, ()=>{
                    process.stdout.write(`${kChar} > FINISHED ${storedName}\n\n`);
                    process.stdout.write(`\n${kChar} moved file to asset pack successfully\n\n`.bgCyan.black.italic)
                    res.sendStatus(200);
                }, req as IncomingMessage);
            }
        }
        });
    });

export {AssetVendorService as default, AssetVendorService};