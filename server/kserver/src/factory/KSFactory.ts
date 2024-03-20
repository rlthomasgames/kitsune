import {Tail} from "tail";
import KitsuneHelper from "kitsune-wrapper-library/dist/base/helper/KitsuneHelper";

const {exec} = require('child_process');
var process = require('process');

export type ServerEventHandler = (event: Event, next: Function) => void;
export class KSFactory {

    // TODO : kill processes blocking server starting
    // hint shell command for killing processes by port ---
    // ps aux | grep 3000 && netstat -lntp | grep node > filename.txt && awk '{ print $2 $7 } ' filename.txt > pid.txt
    static async createServer(eventHandler: ServerEventHandler, MONGO_DB: number = 27017, REST_SERVER: number = 3090, WS_PORT:number = 3000, ASSET_STORE:number = 8081)   {     const promise: Promise<KServer> = new Promise<KServer>((resolve, reject) => {
            if(true===true){
                resolve(new KServer())
            }
        })
        return promise;
    }
}

export class KServer{

    blockingProcesses:Array<string> = [];
    constructor(...args) {

        setTimeout(()=>{
            const sock = new KServerChannel('sock.txt', '../kitsune-ws-server', false, false);
            sock.output.on('line', (kSockData: string)=> this.channelEventHandler(`${kSockData}`, 'WS'));

            const rest = new KServerChannel('rest.txt', '../kitsune-rest-server', false, false);
            rest.output.on('line', (kSockData: string)=> this.channelEventHandler(`${kSockData}`, 'REST'));

            const wrapper = new KServerChannel('wrapper.txt', '../../client/kitsune-wrapper', false, false);
            wrapper.output.on('line', (kSockData: string)=> this.channelEventHandler(`${kSockData.split('"')[0]}`, 'WRAPPER'));

            const asset = new KServerChannel('asset.txt', '../kitsune-asset-store', false, false);
            asset.output.on('line', (kSockData: string)=> this.channelEventHandler(`${kSockData}`, 'ASSETS'));

            const mongo = new KServerChannel('asset.txt', 'sudo mongod --dbpath ~/mongodb/ --bind_ip 127.0.0.1 --port 27017', true, false);
            mongo.output.on('line', (kSockData: string)=> this.channelEventHandler(`${kSockData}`, 'MONGO'));
        }, 5000)
    }



    channelEventHandler(data: string, channel:string) {
        // const IN_USE = kSockData.toUpperCase().includes('listen EADDRINUSE'.toUpperCase())
        const INUSE = data.includes('EADDRINUSE');
        //process.stdout.write(`${data.stripColors} \n`);
        ColourizeMsg(`${data}`, channel)
    }
}


export const defaultEventHandler = (event: Event, next: Function) => {
    //ColourizeMsg(event[0], '')
    console.log(`server received ${event}`);
    switch (event[0] as string) {
        case "":
            break;
        default:
            console.log("event hadler got something", event);
            break;
    }
}

export const shuffle = (array)=>{
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

let msgs:number = 0;
let lastCol = 'none';
export const ColourizeMsg = (msg:string, channel:string) => {
    //const decor0 = [`█`.inverse,`▉`.inverse,`▊`.inverse,`▋`.inverse,`▌`.inverse,`▍`.inverse,`▎`.inverse,`▏`.inverse,`▎`.inverse,`▍`.inverse,`▌`.inverse,`▋`.inverse,`▊`.inverse,`▉`.inverse,`█`.inverse]
    const decor0 = [`█`,`▉`,`▊`,`▋`,`▌`,`▍`,`▎`,`▏`,`▎`,`▍`,`▌`,`▋`,`▊`,`▉`,`█`]
    //const decor1 = [`▀`.bgYellow.red,`▀`.bgYellow.red]
    //let decor2 = [colors.bgRed.red,colors.bgRed.yellow,colors.bgYellow.red,colors.bgYellow.yellow,colors.bgYellow.red,colors.bgRed.yellow,colors.bgRed.red];
    let decor2 = [""];
    //let decor2 = [colors.bgRed.red,colors.bgRed.yellow,colors.bgYellow.red,colors.bgYellow.yellow,colors.bgYellow.red,colors.bgRed.yellow,colors.bgRed.red, colors.bgMagenta.cyan,colors.bgBlue.magenta,colors.bgGreen.green,colors.bgGreen.cyan,colors.bgCyan.cyan,colors.bgCyan.blue,colors.bgCyan.yellow];
    //const decor2 = [colors.bgMagenta.bold];
    const gradient4 = ['█','▓','▒','░',' ','░','▒','▓'];
    const gradient3 = ['█','▉','█','▇','▆','▅','▄','▃','▂','▁'];
    //const grades = ['█'.inverse,'▉'.inverse,'█'.inverse,'▇'.inverse,'▆'.inverse,'▅'.inverse,'▄'.inverse,'▃'.inverse,'▂'.inverse,'▁'.inverse];
    const gradient2 = ['▚','█','▓','▒','░',' ','░','▒','▓','█','▉','█','▇','▆','▅','▄','▃','▂','▁','▂','▃','▄','▅','▆','█'];
    const gradient = ['█','▛','▜','▙','▟','▚','▞','▘','▖','▗','▝',' ',' '];
    //const allgrades = [gradient, gradient2, gradient3, gradient4];
    //const fire = [`░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░','▒▒▒▒▒▒▒▒▒','▓▓▓▓▓▓▓▓▓▓','████████████████████████████████████████████████','▉','█','▇','▆','▅','▄','▃','▂','▁`].join('').split('');
    //const allgrades = [fire];
    const grades = gradient4;
    //decor2 = shuffle(decor2);
    //let grades = shuffle(allgrades[Math.floor(Math.random()*allgrades.length << msgs % allgrades.length)]);
    //let grades = shuffle([gradient.join('').replace(',',''), gradient.slice(1, gradient.length-2).reverse().join('').replace(',','')].join('').replace(',','').split('').join(gradient4.join('')).split('').join(gradient3.join('')).split(''));

    //const grades = ['▚'];
    const fillDecor:Array<string> = decor2;
    let m = `${msg}`;
    /*
     m = `${m.replace("TypeError:", "TypeError:".bgRed.black.bold)}`;
     m = `${m.replace("Error:", "Error:".bgRed.black.bold)}`;
     m = `${m.replace("Error", "Error".bgRed.black.bold)}`;
     m = `${m.replace("ERROR", "ERROR".bgRed.black.bold)}`;
     m = `${m.replace("undefined", "undefined".bgRed.black.bold)}`;
     m = `${m.replace("null", "null".bgRed.black.bold)}`;
     m = `${m.replace("cannot", "cannot".bgRed.black.bold)}`;
     m = `${m.replace("webpack-dev-server", "webpack-dev-server".green)}`;
     m = `${m.replace("express", "express".green)}`;
     m = `${m.replace("socket.io", "socket.io".green)}`;
     m = `${m.replace("JSON", "JSON".green)}`;
     m = `${m.replace("fflate", "fflate".green)}`;
     m = `${m.replace("nodemon", "nodemon".green)}`;
     m = `${m.replace("--watch", "--watch".green)}`;
     m = `${m.replace("Webpack", "Webpack".green)}`;
     m = `${m.replace("webpack", "webpack".green)}`;
     m = `${m.replace("built", "built".green)}`;
     m = `${m.replace("build", "build".green)}`;
     m = `${m.replace("run", "run".green)}`;
     m = `${m.replace("kill", "kill".red)}`;
     m = `${m.replace("killall", "killall".red)}`;
     m = `${m.replace("pkill", "pkill".red)}`;
     m = `${m.replace("npm", "npm".yellow)}`;
     m = `${m.replace("node", "node".yellow)}`;
     m = `${m.replace("tsc", "tsc".yellow)}`;
     m = `${m.replace("cd", "cd".yellow)}`;
     m = `${m.replace("../", "../".blue)}`;
     m = `${m.replace("./", "./".blue)}`;
     m = `${m.replace("/", "/".blue)}`;
     m = `${m.replace(".", ".".blue)}`;
     m = `${m.replace("code", "code".blue)}`;
     m = `${m.replace("generated", "generated".blue)}`;
     m = `${m.replace("dist/", "dist/".blue)}`;
     m = `${m.replace("kitsune/", "kitsune/".blue)}`;
     m = `${m.replace("kitsune-wrapper/", "kitsune-wrapper/".bgMagenta.blue)}`;
     m = `${m.replace("kitsune-wrapper-extensions", "kitsune-wrapper-extensions".bgMagenta.blue)}`;
     m = `${m.replace("kitsune-wrapper-library", "kitsune-wrapper-library".bgMagenta.blue)}`;
     m = `${m.replace("kitsune-application-test-dummy", "kitsune-application-test-dummy".bgMagenta.blue)}`;
     m = `${m.replace("kitsune-asset-store", "kitsune-asset-store".bgMagenta.blue)}`;
     m = `${m.replace("kitsune-rest-server", "kitsune-rest-server".bgMagenta.blue)}`;
     m = `${m.replace("kitsune-ws-server", "kitsune-ws-server".bgMagenta.blue)}`;
     m = `${m.replace("mongodb", "mongodb".bgMagenta.blue)}`;
     m = `${m.replace("mongod", "mongod".bgMagenta.blue)}`;
     m = `${m.replace("report.html", "report.html".blue)}`;
     m = `${m.replace("extensions/", "extensions/".blue)}`;
     m = `${m.replace(".bundle.js", ".bundle.js".blue)}`;
     m = `${m.replace("EADDRINUSE", "EADDRINUSE".red)}`;
     m = `${m.replace("listen", "listen".yellow)}`;

     */
    //process.stdout.write(`${""+KitsuneHelper.kChar+""} : ${m}`+"\u001b[2K\u001b[0E\r");
    let fi:string = '';
    let fiArr:Array<string> = [];
    const f = ` |${ msgs }|`;
    const fillLength = process.stdout.columns;
    let count = 0;
    const tg = msgs % grades.length;

    while(count < fillLength) {
        fiArr.push(fillDecor[msgs % fillDecor.length]);
        //fiArr.push(fillDecor[msgs % fillDecor.length](grades[count % grades.length]));
        count++
    }
    /*
    fiArr.splice(0,  ((""+m).stripColors).length+f.length+7+3)
    fi = fiArr.join('')

     */
    //fi = fi.slice(0, (m.length+f.length+channel.length+2));
    const channelFill = 7-channel.length;
    let cFill = ''
    while (cFill.length<channelFill){cFill = cFill + " "}
    let KChannel = ""+KitsuneHelper.kChar+cFill+channel+""+decor0[msgs % decor0.length]+"";

    let channelCol = ""+f+"";
    let filler = fi;
    let out = ""+`${m}${cFill}${filler}${channelCol}`;
    ///KChannel=KChannel;
    process.stdout.write(`${KChannel}${out}\n\u001b[2K\u001b[0E\r`);
    msgs++;
    /*
    console.log(`${""+KitsuneHelper.kChar+""}`);
    const m = `${msg.stripColors}`;
    const f = ` |${ msgs }|`;
    const fillLength = process.stdout.columns-(m.length+(f.length+10));
    let fi = '';
    while(fi.length < fillLength) {fi = fi + '░'}
    let out = `${m}${fi}${f}`.replace('\n','░');

    if(col === ''.cyan) out = out.rainbow.bgCyan;
    if(col === ''.green) out = out.rainbow.bgGreen;
    if(col === ''.magenta) out = out.rainbow.bgMagenta;
    if(col === ''.yellow) out = out.rainbow.bgYellow;
    if(col === ''.rainbow) out = out.rainbow.bgBlack;

    if(col !== lastCol) {
        out = '\n'+out;
        lastCol = col;
    }
    process.stdout.cursorTo(0);
    process.stdout.clearLine();
    process.stdout.write('\u001b[2K\u001b[0E'+out+''.replace('[39m[0m', ''));
    process.stdout.cursor!! ? process.stdout.write(JSON.stringify(process.stdout.cursor)) : null;

     */

}
export class KServerChannel {
    output:Tail;
    outputStr:string = '';
    constructor(file: string, cmd:string, fullCmd:boolean = false, newWindow:boolean = false) {
        const prefix = fullCmd ? '' : `npm --watch run start --prefix `;
        let cmdToUse = newWindow ? `gnome-terminal -- bash -c "${prefix}${cmd} 2>&1| tee ${file}; exec bash"` : `${prefix} ${cmd} 2>&1| tee £{file}`
        if(newWindow === false && fullCmd === false){
            cmdToUse = `npm --watch run start --prefix ${cmd} 2>&1| tee ${file}`;
        } else {
            cmdToUse = `${cmd} 2>&1| tee ${file}`;
        }
        exec(cmdToUse);
        this.output = new Tail(file, {});
        this.outputStr = '';
        this.output.on("line", function(data) {
            //console.log(`file:   ${file} :`, data);
        });
        this.output.on("error", function(error) {
            console.log('ERROR: ', error.toLocaleString());
        });
    }
}

const tick = () => {
    console.log(`tick ${Date.now()}`)
    setTimeout(tick, 1000);
}