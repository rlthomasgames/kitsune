import {defaultEventHandler, KSFactory} from "./factory/KSFactory"
import colors from "colors";
colors.enable();
import process from "process";
process.title = "kserver";
import KitsuneHelper from "kitsune-wrapper-library/dist/base/helper/KitsuneHelper";
const { exec } = require('child_process');

const createNewQuadView = (c:number,r:number) =>{
    const reColour = KitsuneHelper.kitsuneASCII.red.inverse.bgYellow
    const snazzyColouring = colors.black(reColour);
    let pointer = 0;
    const charSplit = snazzyColouring.split('\n')
    charSplit.forEach((line)=>{
        console.log(line.dim.inverse.italic);
        process.stdout.write('\u001b[2K\u001b[0E\r\r'.reset.stripColors);
    })
    //colors.black(reColour).slice(pointer, pointer+57)
    //console.log(colors.black(reColour));
    const textWidth = Math.floor(c / 2 );
    const textHeight = Math.floor(r / 2 );
    const qv = [];
    const combined = []
    const allChars = c*r;
    let cc = 0;
    const screen = [];
    while (cc < allChars){
        screen.push('█');
        cc++
    }
    //console.log("hello");
    const out = screen;
    //console.log(screen.join());
    //process.stdout.write(screen.join());

    return qv;
}
export class KVerboseLog {
    public static VERBOSE_LOG = true;
    public static log = (value: any) => {
        if (this.VERBOSE_LOG) {
            return value;
        }
        return "";
    }
}

KVerboseLog.VERBOSE_LOG = true;
const cols = process.stdout.columns
const rows = process.stdout.rows
const QUAD_VIEW : Array<Array<string>> = createNewQuadView(cols,rows);

//console.log(colors.rainbow('\n \n \rTerminal size: ' + process.stdout.columns + 'x' + process.stdout.rows+'').bgMagenta.inverse.bold);




const promisedSServer = KSFactory.createServer(defaultEventHandler, 27017, 3090, 3000, 8081);
promisedSServer.then((kServer) => {
    //console.log(`${KVerboseLog.log(kServer)}`);
});