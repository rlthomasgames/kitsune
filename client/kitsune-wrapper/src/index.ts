//import * as workerPath from "file-loader?name=[name].js!./LowResOffScreenAnim";
import {Wrapper} from "./core/Wrapper";
//import * as workerPath from "./alphaWorkers/LowResOffScreenAnim";
const app = this;

console.log(app);

new Wrapper();
const workerIO = new Worker(new URL("./LowResOffScreenAnim", import.meta.url));
workerIO.onmessage = (ev) => {
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    console.log(`returned ...... ${ev}`, workerIO, ev);
}
workerIO.onerror = (err) => {
    console.log(`RES : ${err}`)
}
workerIO.addEventListener("message", (ev)=>{
    console.log('main thread received ', ev);
})
console.log(`working ------> ${workerIO}`, workerIO);

//const req = {data:kCanvas};
//const req = `hello`;
setInterval(()=>{
    workerIO.postMessage('twistedfirestarter🐜');
}, 1000)


