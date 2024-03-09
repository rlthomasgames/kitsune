import {defaultEventHandler, KSFactory} from "./factory/KSFactory"
import colors from "colors";
colors.enable();
import process from "process";
import KitsuneHelper from "kitsune-wrapper-library/dist/base/helper/KitsuneHelper";
const { exec } = require('child_process');

const createNewQuadView = (c:number,r:number) =>{
    console.log(KitsuneHelper.kitsuneASCII);
    const textWidth = Math.floor(c / 2 );
    const textHeight = Math.floor(r / 2 );
    const qv = [];
    const combined = []
    const allChars = c*r;
    let cc = 0;
    const screen = [];
    while (cc < allChars){
        screen.push('█');
    }

    const out = screen;
    process.stdout.write(screen.join());
    return qv;
}
export class KVerboseLog {
    public static VERBOSE_LOG = false;
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