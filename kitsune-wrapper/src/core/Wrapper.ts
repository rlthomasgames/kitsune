import container from "./ioc/ioc_mapping";
import CoreState from "./constants/CoreState";
import ICommand from "kitsune-wrapper-library/dist/base/interfaces/ICommand";
import KitsuneHelper from "kitsune-wrapper-library/dist/base/helper/KitsuneHelper";
import {FlateError, Zip, ZipInputFile, zip, AsyncZippableFile, AsyncZippable} from "fflate";
import {bytesToBase64} from "./encoding/Base64";

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
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        const buttonActions = {
            closemenu: () => {
                logo!.removeEventListener('click', buttonActions.closemenu);
                logo!.addEventListener('click', buttonActions.openMenu);
                kMenu!.classList.remove('default');
                kMenu!.classList.remove('active');
                kMenu!.classList.add('inactive');
                uploadButton!.removeEventListener('click', buttonActions.submitAssets);
            },
            openMenu: () => {
                logo!.removeEventListener('click', buttonActions.openMenu);
                logo!.addEventListener('click', buttonActions.closemenu);
                kMenu!.classList.remove('default');
                kMenu!.classList.remove('inactive');
                kMenu!.classList.add('active');
                uploadButton!.addEventListener('click', buttonActions.submitAssets);
            },
            submitAssets: async () => {
                console.log('submitting')
                //let zippedData: Uint8Array = new Uint8Array();
                const totalFiles = fileInput.files!.length;
                const all_files = new Zip();
                all_files.ondata = this.onZipInputData;
                console.log(all_files);
                const collectedZippedData:Array<Uint8Array> = [];
                this.loadFilesAsArrayofBuffers(fileInput.files!, (buffers)=>{
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
                        const receipt = JSON.stringify(fileStructure);
                        console.log('here is the receipt of single file structure\n\n\n\r', receipt);
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
                                    collectedZippedData.forEach((zippedFile)=>{
                                        console.log('now converting each zipped ')
                                        const base64String = bytesToBase64(zippedFile);
                                        this.uploadFile(base64String);
                                    })
                                    /*
                                    let finalZipDataToSend = new Uint8Array([]);
                                    while(collectedZippedData.length > 0) {
                                        finalZipDataToSend = this.concatUint8Arrays(finalZipDataToSend, collectedZippedData[0]);
                                        collectedZippedData.splice(0,1);
                                        if(collectedZippedData.length == 0){
                                            //const asBuffer = this.bufferFromByteArr(finalZipDataToSend);
                                            //const asString = strFromU8(finalZipDataToSend);
                                            const base64String = bytesToBase64(finalZipDataToSend);
                                            console.log('sending data : \n', base64String);
                                            //console.log('here is the buffer', asBuffer);
                                            this.uploadFile(base64String)

                                        }
                                    }
                                     */
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
        }

        console.log('document loaded???', logo, kMenu);

        logo!.addEventListener('click', buttonActions.openMenu);
    }

    onZipInputData(err:FlateError, data:Uint8Array, final:boolean) {
        console.log('ondata from whole zip', err, data, final);
    }

    async awaitedFetch(url: string, body: Blob) {
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml'
            },
            body: body
        })
            .then(
                (value) => {
                    return value;
                },
                (reason) => {

                })
    }

    concatUint8Arrays(a:Uint8Array, b:Uint8Array){
        const merged : Uint8Array = new Uint8Array(a.length+b.length);
        merged.set(a);
        merged.set(b, a.length)
        return merged;
    }

    async uploadFile(file:string) {
        //const formData = new FormData()
        //formData.set("files", file, "file.txt");
        console.log('strigified', file);
        return fetch(`http://localhost:8081/upload`, { method:"POST", body:JSON.stringify({files:file}), headers: {
            'Content-Type': 'application/json'
        }, mode:"cors" /* ... */ });
    }

    httpCall(method: string, url:string, data:string, callback:(rText:string)=>void) {
        const thedata = new FormData();
        //const jsonStringFromBlob = JSON.stringify(new Blob([data], {type:'application/zip'}));
        //thedata.append('file', new File([data], 'assets.zip', {type:'text/plain'}), 'assets.zip');
        const file = new File([data], 'assets.zip', {type:'text/plain'})
        console.log('the file', file);
        thedata.set('body', JSON.stringify(file), 'assets.zip');
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        if (callback) xhr.onload = function(ev) {
            console.log(`httpCall ${url} | ${method} - Progress = ${ev.loaded} / ${ev.total}`)
            callback(xhr['responseText']);
        };
        if (data != null) {
            console.log('we have data to send', data, 'in form', thedata)
            xhr.setRequestHeader('Content-Type', 'application/json');
            const jsonString = JSON.stringify(file);
            console.log('json string =', jsonString, thedata);
            xhr.send(jsonString);
        } else {
            xhr.send();
        }
        return xhr;
    }

    bufferFromByteArr(fileByteArray: Uint8Array) {
        return this.asyncAwait(new Blob([fileByteArray]).arrayBuffer()) as ArrayBuffer
    }

    asyncAwait(p:Promise<any>) {
        return <Awaited<any>>p;
    }

    fileNameFromPath(path: string)  {
        let arr = path.split('/');
        return arr[arr.length - 1].split('.')[0] as string
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
                console.log('fileReader got on load', e)
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
