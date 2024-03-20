//import * as workerPath from "file-loader?name=[name].js!./LowResOffScreenAnim";
import {Wrapper} from "./core/Wrapper";
//import * as workerPath from "./alphaWorkers/LowResOffScreenAnim";
import * as workerPath from "./LowResOffScreenAnim";
import * as path from "path";

const app = this;

console.log(app);

new Wrapper();
const workerIO = new Worker(new URL("./LowResOffScreenAnim.ts", import.meta.url));
console.log('worker IO -> ', workerPath, path.resolve('./'));
//const workerIO = new Worker(new URL( './LowResOffScreenAnim', import.meta.url ));
//const workerIO = new Worker( new URL( './alphaWorkers/LowResOffScreenAnim', import.meta.url ));
//const workerIO = new Worker(workerPath, {type:"module", name:"LowResOffScreenAnim"});
workerIO.onmessage = (ev) => {
    console.log(`req \x3e\x3e\x3e\x3e\x3e\x3e\x3e\x3e\x3e\x3e\x3e${ev}`, workerIO);
    //self.onmessage = (ev) => {
    //    console.log('secondary on message recieved??', ev);
    //}

}
workerIO.onerror = (err) => {
    console.log(`RES : ${err}`)
}
workerIO.addEventListener("message", (ev)=>{
    console.log('main thread received ', ev);
})
console.log(`working ------> ${workerIO}`, workerIO);
//const kCanvas = (document.getElementById('kCanvas') as HTMLCanvasElement).transferControlToOffscreen();
//const req = {data:kCanvas};
const req = `{data:'start', type:'custom'}`;
workerIO.postMessage(req);

/*
onload = () => {
}
*/

/*
const workerIO = new Worker('./alphaWorkers/LowResOffScreenAnim.js', {type:"module", name:"LowResOffScreenAnim"});
const req = {animation:"fire", canvas:null};
workerIO.postMessage(req);
console.log("WORKER", workerIO, );
workerIO.postMessage(JSON.stringify(req));

setInterval(()=>{
    workerIO.postMessage(req);
    console.log("WORKER", workerIO);
}, 4000)
*/


