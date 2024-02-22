import container from "./ioc/ioc_mapping";
import CoreState from "./constants/CoreState";
import ICommand from "kitsune-wrapper-library/dist/base/interfaces/ICommand";
import KitsuneHelper from "kitsune-wrapper-library/dist/base/helper/KitsuneHelper";
import {FlateError, Zip, ZipInputFile, zip, AsyncZippableFile, AsyncZippable} from "fflate";
import {bytesToBase64} from "./encoding/Base64";
import {Transform} from "stream-browserify";

const kChar = '🦊';

type PathAndData = {path:string, data:ArrayBuffer, file:File, index:number};

export class Wrapper {
    constructor() {
        new KitsuneHelper();
        const startUpCommand = container.get<ICommand>(CoreState.INIT);
        startUpCommand.run();
        this.handleHTMLButtonEvents();
    }

    handleHTMLButtonEvents() {
        const kMenu = document.getElementById('kitsuneMenuContainer');
        const logo = document.getElementById('logo');
        const uploadButton = document.getElementById('uploadButton');
        const  backClickDiv = document.getElementById('backCli')

        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        const buttonActions = {
            closemenu: () => {
                logo!.removeEventListener('click', buttonActions.closemenu);
                logo!.addEventListener('click', buttonActions.openMenu);
                kMenu!.classList.remove('default');
                kMenu!.classList.remove('active');
                backClickDiv!.classList.remove('active');
                kMenu!.classList.add('inactive');
                uploadButton!.removeEventListener('click', buttonActions.submitAssets);
            },
            openMenu: () => {
                logo!.removeEventListener('click', buttonActions.openMenu);
                logo!.addEventListener('click', buttonActions.closemenu);
                kMenu!.classList.remove('default');
                kMenu!.classList.remove('inactive');
                kMenu!.classList.add('active');
                backClickDiv!.classList.add('active');
                uploadButton!.addEventListener('click', buttonActions.submitAssets);
            },
            submitAssets: async () => {
                console.log('submitting')
                fileInput.files ? this.uploadAllFiles(fileInput.files) : console.log('no files selected');
            }
        }

        console.log('document loaded???', logo, kMenu);

        logo!.addEventListener('click', buttonActions.openMenu);
    }

    onZipInputData(err:FlateError, data:Uint8Array, final:boolean) {
        console.log('ondata from whole zip', err, data, final);
    }

    async uploadFile(file:string) {
        //const formData = new FormData()
        //formData.set("files", file, "file.txt");
        console.log('strigified', file);
        const objectPackage = {files:kChar};
        let injectableString = JSON.stringify(objectPackage);
        console.log('kChar Injectable Object as JSON String: \n', injectableString);
        injectableString = injectableString.replace(kChar, file);
        //const jsonStream = parser();
        const inoutStream: Transform = new Transform({
            transform(chunk:any, encoding:any, callback:Function) {
                this.push(chunk);
                callback();
            },
        });
        (inoutStream as unknown as any).write(injectableString, undefined, (error: any) => {
            error ? console.log('write stream error', error) : ()=>{
                console.log('write stream completed');
            }
        })
        return this.asyncAwait(fetch(`http://localhost:8081/upload`, {
            method:"POST",
            body:(inoutStream as unknown as any).read(),
            headers: {
            'Content-Type': 'application/json'
        }, mode:"cors" /* ... */ })) as Response;
    }

    asyncAwait(p:Promise<any>) {
        return <Awaited<any>>p.then((val)=>val);
    }

    fileNameFromPath(path: string)  {
        let arr = path.split('/');
        return arr[arr.length - 1].split('.')[0] as string
    }

    uploadAllFiles(inputFiles:FileList) {
        //let zippedData: Uint8Array = new Uint8Array();
        const totalFiles = inputFiles.length;
        const all_files = new Zip();
        all_files.ondata = this.onZipInputData;
        console.log(all_files);
        const collectedZippedData:Array<Uint8Array> = [];
        this.loadFilesAsArrayofBuffers(inputFiles!, (buffers)=>{
            const assetPackUID = crypto.randomUUID();
            console.log('sending with assetpack id ', assetPackUID)
            buffers.forEach((bufferAndPath, index)=>{
                // 1 . create zip header info
                const zipInput: ZipInputFile = {
                    size: bufferAndPath.file.size,
                    crc: 0,
                    filename: this.fileNameFromPath(bufferAndPath.path),
                    compression: 0,
                    mtime: Date.now(),
                    ondata: (err, data, final) => {
                        console.log('ondata from zip[input', err, data, final)
                        return data;
                    }
                };
                all_files.add(zipInput);
                const zipData = new Uint8Array(bufferAndPath.data);
                const fileStructure: {[x:string] : string} | AsyncZippable = {[bufferAndPath.path as string]: zipData as AsyncZippableFile};
                zip(fileStructure, {
                    comment:`Kitsune Wrapper Asset |${assetPackUID}| : ${bufferAndPath.path} `,
                    mtime: Date.now(),
                    mem:12,
                    level:4,
                }, (err, data)=>{
                    if(err){
                        console.log('error??', err);
                    }
                    if(data){
                        console.log('this is the zipped bytearray for file ', bufferAndPath.file.name, data);
                        collectedZippedData.push(data);
                        if(collectedZippedData.length === totalFiles){
                            let expectedResponses = 0;
                            let finalResp = 0;
                            collectedZippedData.forEach((zippedFile)=>{
                                console.log('now converting each zipped ')
                                const base64String = bytesToBase64(zippedFile);
                                const uploadResponse = <Awaited<Response>>this.asyncAwait(this.uploadFile(base64String)) as unknown as Promise<Response>;
                                uploadResponse.finally(()=>{
                                    finalResp++;
                                    console.log('got finally?', uploadResponse);
                                    if(finalResp == totalFiles) {
                                        console.log(`\n\n\n${kChar} < UPLOAD VERIFIED ${finalResp} / ${totalFiles}\n`);
                                    }
                                })
                                console.log(`${kChar} : upload response`, uploadResponse);
                                expectedResponses++;
                                console.log(`${kChar} < uploaded ${expectedResponses} / ${totalFiles}`);
                                if (uploadResponse) {
                                    console.log(`${kChar} < abnormal response status`, uploadResponse, uploadResponse);
                                }
                                if(expectedResponses === totalFiles) {

                                    console.log(`${kChar} < all files packed successfully by server!`);

                                }
                            })
                        }
                    }
                })
                if(index == buffers.length-1){
                    all_files.end();
                    console.log('ready to send zip', all_files);
                    console.log('collected data might need concatting into one', collectedZippedData);
                }
            })
        });
    }

    loadFilesAsArrayofBuffers(files:FileList, cb:(buffers:Array<PathAndData>)=>void){
        const fileItems:Array<File> = [];
        const totalFiles = files.length;
        let index = 1;
        while(index <= totalFiles)
        {
            const item = files.item(index-1)!;
            fileItems.push(item as File);
            console.log(item)
            index++;
        }
        console.log('file items is', fileItems);
        const fileBuffers:Array<PathAndData> = [];
        while (fileItems[0] !== undefined) {
            const file: File = fileItems[0] ;
            const filePath = file.name;
            const fileReader = new FileReader();
            let fileByteArray: Uint8Array;
            let fileBuffer: ArrayBuffer;
            fileReader.onload = (e) => {
                console.log(`${kChar} | Loading file ${filePath} - `, `${Math.floor(e.loaded*(100/e.total))}%`);
                if(e.target)
                    fileBuffer = e.target!.result as ArrayBuffer;
                fileByteArray = new Uint8Array(e.target!.result as ArrayBuffer);
                file.arrayBuffer = () =>Promise.resolve(fileBuffer);
                const blobbed = new Blob([fileByteArray])
                file.stream=blobbed.stream;
                console.log("INPUT BLOB SIZE: ", blobbed.size, 'buffer', fileBuffer.byteLength);
                fileBuffers.push({path:filePath, data:fileBuffer, file:file, index:fileBuffers.length-1} as PathAndData);

                if(e.total == e.loaded){
                    console.log('NOW can be added to zip or sent - next step')
                }

                if((fileBuffers as Array<PathAndData>).length == totalFiles){
                    console.log('ready to make zip', fileBuffers)
                    cb(fileBuffers);
                }
            };
            fileReader.onerror = (e) => {
                console.log('file read error', e)
            };
            fileReader.readAsArrayBuffer(file);
            fileItems.splice(0, 1);
        }
    }
}
