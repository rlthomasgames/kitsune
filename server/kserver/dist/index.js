"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KVerboseLog = void 0;
const KSFactory_1 = require("./factory/KSFactory");
const colors_1 = __importDefault(require("colors"));
colors_1.default.enable();
const process_1 = __importDefault(require("process"));
const { exec } = require('child_process');
const createNewQuadView = (c, r) => {
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
        "                                                                                                                     \n");
    const textWidth = Math.floor(c / 2);
    const textHeight = Math.floor(r / 2);
    const qv = [];
    const combined = [];
    const gradient = ['█', '▓', '▒', '░', '▒', '▓', '█', '▉', '█', '▇', '▆', '▅', '▄', '▃', '▂', '▁', '▁', '▁', '▁', '▁', '▁', '▁', '▂', '▃', '▄', '▅', '▆', '█'];
    for (let i = 0; i < 2; i++) {
        qv.push([]);
        for (let k = 0; k < 2; k++) {
            qv[i].push([]);
            const numChars = textWidth * textHeight;
            const newText = [];
            let bw = 0;
            while (newText.length < numChars) {
                if (bw % textWidth == 0) {
                    newText.push(gradient[bw % gradient.length].rainbow.bold);
                    combined.push(gradient[bw % gradient.length].rainbow.bold);
                }
                else {
                    newText.push(gradient[bw % gradient.length].america.bold);
                    combined.push(gradient[bw % gradient.length].america.bold);
                }
                bw++;
            }
            while (newText.length > 0) {
                bw++;
                const portion = newText.splice(0, textWidth);
                const invert = bw % 4;
                if (invert == 0) {
                    qv[i][k].push(portion.join(''));
                }
                else {
                    qv[i][k].push(portion.join('').inverse);
                }
            }
        }
    }
    const out = [qv[0][0].join(''), qv[0][1].join(''), qv[1][0].join(''), qv[1][1].join('')].join('');
    console.log('' + `${out}`);
    for (let r = 0; r < (textHeight + textWidth) * 10; r++) {
        //process.stdout.write(`\r\r`);
    }
    return qv;
};
class KVerboseLog {
}
exports.KVerboseLog = KVerboseLog;
_a = KVerboseLog;
KVerboseLog.VERBOSE_LOG = false;
KVerboseLog.log = (value) => {
    if (_a.VERBOSE_LOG) {
        return value;
    }
    return "";
};
KVerboseLog.VERBOSE_LOG = true;
const cols = process_1.default.stdout.columns;
const rows = process_1.default.stdout.rows;
const QUAD_VIEW = createNewQuadView(cols, rows);
//console.log(colors.rainbow('\n \n \rTerminal size: ' + process.stdout.columns + 'x' + process.stdout.rows+'').bgMagenta.inverse.bold);
const promisedSServer = KSFactory_1.KSFactory.createServer(KSFactory_1.defaultEventHandler, 27017, 3090, 3000, 8081);
promisedSServer.then((kServer) => {
    //console.log(`${KVerboseLog.log(kServer)}`);
});
