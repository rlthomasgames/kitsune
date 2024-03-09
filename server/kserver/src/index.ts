import {defaultEventHandler, KSFactory} from "./factory/KSFactory"
import colors from "colors";
colors.enable();
import process from "process";
const { exec } = require('child_process');

const createNewQuadView = (c:number,r:number) =>{
    console.log("\n" +
        "\n                                                 ███████████████████████████████████                                 \n" +
        "                                         ████████████████████████████████████████████████                            \n" +
        "                                    ██████████████▓▓▒░░      ░░░░          ░░░  ░░▒█████████▓                        \n" +
        " █████████████████████████████████████████▒▓▒▒░░░              ░▒▒░░░░░░░░▒░░     ░░░▒▒▒████████                     \n" +
        " ██████████████████████████████████████▒░                        ░▒▒▒▒▒▒▒▒░         ░░░░░▒▒░████████████████████████ \n" +
        " ██▒░░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░           ░▓█████████████▓▒▒▒░░░     ░░░▒▒▒▒▒▒▒░░░░     ░░░░░░░░░░ ░▒█████████████████████ \n" +
        " ████         ░░▒▒▓▓▓▓███▓▒░     ░▒▓██████▓▓██████████████▓▒▒▒▒▒▒░░░░      ░▒▒▒▒▓▓████████▓░▒██▓▓▓▒░▒▓▓█▓▓▓▓▓▓▒   ██ \n" +
        "  ████                  ░░░░░░░  ▒▓▒  ░    ░▒░    ░  ░▒▓█▓▓░  ░░▒▒▒░  ░░▒░░▒▒░░ ░▒▓▓▒▒▒▓▓██████████▒░░▒▒▒░       ▓██ \n" +
        "   ████              ░▒▓█▓▓▒▒▒░░░▒░░▓▓█▓▒░░ ░░░░▒▓▓▒░░ ▒█████▓▓▓▒░▒▓███████▓▓▓▓▓░░▓█▓▓▓▓▒░░▒░▒▒▒░░▒▒░▓█▓▒       ████ \n" +
        "    ████           ░▒▓▓▓▒░░   ░▒▒▒░░░  ░▒██████▓▒░  ░▒▓████▓▒░░ ▓████▓▒▒▒▒▒▒▒▓███▓▓██▓▒▒▒▓▓▓▒░░░▒▒▓▒░░▒▓▓▓░     ███  \n" +
        "     ███▓        ░▒▓▒▒░░      ░▒▒▒▒░ ░░░░   ░▒▒▓▓▒▒▒▒███▓░░  ░░░██▒▒▒▒▒░░   ░▓████▒░▒▓▓▒░░░░░  ░▒▓▒▒░   ▒▓█▒░  ███   \n" +
        "      ██████  ░░▒▓▒▒░░         ░▒▓▓███▓▒▒░  ░░▒▒▓██▒░░░░      ░▒██████████████████▒░ ▒█▓▒▒▒▒▓▓██▓▓▒▒░░░░░░▓█▓█████   \n" +
        "      ██████▒▒▓▓▓▒░░░      ░░░░░▒▓▓█████████▓▓▒▒░░░░░░░         ▒▓████████▓██▓░░░░░   ░░░▒▒▓▓▓▓▓▒▒▒░░░░░░░░▒█████    \n" +
        "        ████▓▒▒░░        ░░░░░░░░░░░░░░░░░░░░░░░  ░░░░░     ░░▒▓█████████████▓▓▒▒░░      ░░░░░           ░  ▒░███    \n" +
        "      █████░▒░░          ░                                ░▒▓█████████████▓██████▓▒░                  ░  ░   ▒░███   \n" +
        "    █████▒▓▒░░░░░░░░░   ░░░░                           ░▓███████▓▒▒░░       ░▓███▓▒░                     ░░▒▒▒▓░████ \n" +
        "  █████░▓▒▒▒▒▒▒▒▒▒▒▒▒▒░   ░▒▒▒░                ░░  ░▒▓███████▒ ░▒░  ░▒▒░░      ▒▓▓▒▒                  ░░░░░░░▒▒▓░███ \n" +
        "  ███▒▒░          ░░░░░░░░   ░▒▒░              ░░░▓██████▓ ▒▓▓▒▒▓▓▒▒▓▓▓▓▓▓▒░   ░▓▓▓▒░                          ░░███ \n" +
        "  ███████████████▓▓▒▒░░   ░░░░ ░▒▒░           ░░░░▓██▓▒░  ▒▓▓▓▒▒▒▒▓▓▓▒▒▒▒▒▒░    ░▓▓▒▒            ░░░░░▒▒▓██████████▓ \n" +
        "   ███████████████████████▓█▒    ░▒▒░          ░░░▒█▓▒░   ▒▓░▒▒▒░░▒▒░░░░░▒▓░    ▒██▓▒         ░▒▓░█████████████████  \n" +
        "            █████████████████████▓▒▒▒▒░░░       ░▒▓█████▓▒░█▓░░░░░░░░░  ░▓▓░   ▒███▒░      ░▒▓░█████████████         \n" +
        "                         █████████████▒▓▒▒▒▒░     ░░▒█████▓░██░ ░░░░░░░░░█▓   ▒██▓▒░    ▒▓▓▒███████                  \n" +
        "                                █████████████▒▓▒░░   ░░▒▓███ ███▒░      ░▓█▓░ ▓██▓░ ░▒▓▒███████▓                     \n" +
        "                                     ████████████▓█▓▒▒░  ░▒██▓ ▓█████████▓▒▒▒▓██▒ ▒▓▒████████                        \n" +
        "                                            ███████████▓█▓▒░░▓█▓░          ▒██▓░▓▒███████                            \n" +
        "                                                ██████████████████████████████████████                               \n" +
        "                                                      █████████████████████████████        KSERVER ALPHA VERSION     \n" +
        "                                                                                                                     \n")
    const textWidth = Math.floor(c / 2 );
    const textHeight = Math.floor(r / 2 );
    const qv = [];
    const combined = []
    const gradient = ['█', '▓', '▒','░', '▒', '▓', '█', '▉', '█', '▇', '▆', '▅', '▄', '▃', '▂', '▁','▁','▁','▁','▁','▁','▁', '▂', '▃', '▄', '▅', '▆', '█'];
    for(let i = 0; i < 2; i++){
        qv.push([])
        for(let k =0; k < 2; k++) {
            qv[i].push([]);
            const numChars = textWidth*textHeight;
            const newText = [];
            let bw=0;
            while(newText.length < numChars){
                if(bw % textWidth == 0)
                {
                    newText.push(gradient[bw % gradient.length].rainbow.bold);
                    combined.push(gradient[bw % gradient.length].rainbow.bold);

                } else {
                    newText.push(gradient[bw % gradient.length].america.bold);
                    combined.push(gradient[bw % gradient.length].america.bold);
                }
                bw++

            }
            while(newText.length > 0) {
                bw++;
                const portion = newText.splice(0, textWidth)
                const invert = bw % 4;
                if(invert == 0)
                {
                    qv[i][k].push(portion.join(''))
                } else {
                    qv[i][k].push(portion.join('').inverse)
                }
            }
        }
    }
    const out = [qv[0][0].join(''),qv[0][1].join(''),qv[1][0].join(''),qv[1][1].join('')].join('')
    console.log(''+`${out}`);
    for(let r = 0; r < (textHeight+textWidth)*10; r++){
        //process.stdout.write(`\r\r`);
    }
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