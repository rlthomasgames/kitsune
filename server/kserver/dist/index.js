"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KVerboseLog = void 0;
const KSFactory_1 = require("./factory/KSFactory");
//import colors from "colors";
//colors.enable();
process.title = "kserver";
const KitsuneHelper_1 = __importDefault(require("kitsune-wrapper-library/dist/base/helper/KitsuneHelper"));
const createNewQuadView = (c, r) => {
    const reColour = KitsuneHelper_1.default.kitsuneASCII;
    //const snazzyColouring = colors.black(reColour);
    const snazzyColouring = reColour;
    let pointer = 0;
    const charSplit = snazzyColouring.split('\n');
    charSplit.forEach((line) => {
        console.log(line);
        process.stdout.write('\u001b[2K\u001b[0E\r\r');
    });
    //colors.black(reColour).slice(pointer, pointer+57)
    //console.log(colors.black(reColour));
    const textWidth = Math.floor(c / 2);
    const textHeight = Math.floor(r / 2);
    const qv = [];
    const combined = [];
    const allChars = c * r;
    let cc = 0;
    const screen = [];
    while (cc < allChars) {
        screen.push('█');
        cc++;
    }
    //console.log("hello");
    const out = screen;
    //console.log(screen.join());
    //process.stdout.write(screen.join());
    return qv;
};
class KVerboseLog {
}
exports.KVerboseLog = KVerboseLog;
_a = KVerboseLog;
KVerboseLog.VERBOSE_LOG = true;
KVerboseLog.log = (value) => {
    if (_a.VERBOSE_LOG) {
        return value;
    }
    return "";
};
KVerboseLog.VERBOSE_LOG = true;
const cols = process.stdout.columns;
const rows = process.stdout.rows;
const QUAD_VIEW = createNewQuadView(cols, rows);
//console.log(colors.rainbow('\n \n \rTerminal size: ' + process.stdout.columns + 'x' + process.stdout.rows+'').bgMagenta.inverse.bold);
const promisedSServer = KSFactory_1.KSFactory.createServer(KSFactory_1.defaultEventHandler, 27017, 3090, 3000, 8081);
promisedSServer.then((kServer) => {
    //console.log(`${KVerboseLog.log(kServer)}`);
});
