"use strict";
exports.__esModule = true;
exports.KVerboseLog = void 0;
var KSFactory_1 = require("./factory/KSFactory");
//import colors from "colors";
//colors.enable();
process.title = "kserver";
var KitsuneHelper_1 = require("kitsune-wrapper-library/dist/base/helper/KitsuneHelper");
var createNewQuadView = function (c, r) {
    var reColour = KitsuneHelper_1["default"].kitsuneASCII.red.inverse.bgYellow;
    //const snazzyColouring = colors.black(reColour);
    var snazzyColouring = reColour;
    var pointer = 0;
    var charSplit = snazzyColouring.split('\n');
    charSplit.forEach(function (line) {
        console.log(line.dim.inverse.italic);
        process.stdout.write('\u001b[2K\u001b[0E\r\r'.reset.stripColors);
    });
    //colors.black(reColour).slice(pointer, pointer+57)
    //console.log(colors.black(reColour));
    var textWidth = Math.floor(c / 2);
    var textHeight = Math.floor(r / 2);
    var qv = [];
    var combined = [];
    var allChars = c * r;
    var cc = 0;
    var screen = [];
    while (cc < allChars) {
        screen.push('█');
        cc++;
    }
    //console.log("hello");
    var out = screen;
    //console.log(screen.join());
    //process.stdout.write(screen.join());
    return qv;
};
var KVerboseLog = /** @class */ (function () {
    function KVerboseLog() {
    }
    var _a;
    _a = KVerboseLog;
    KVerboseLog.VERBOSE_LOG = true;
    KVerboseLog.log = function (value) {
        if (_a.VERBOSE_LOG) {
            return value;
        }
        return "";
    };
    return KVerboseLog;
}());
exports.KVerboseLog = KVerboseLog;
KVerboseLog.VERBOSE_LOG = true;
var cols = process.stdout.columns;
var rows = process.stdout.rows;
var QUAD_VIEW = createNewQuadView(cols, rows);
//console.log(colors.rainbow('\n \n \rTerminal size: ' + process.stdout.columns + 'x' + process.stdout.rows+'').bgMagenta.inverse.bold);
var promisedSServer = KSFactory_1.KSFactory.createServer(KSFactory_1.defaultEventHandler, 27017, 3090, 3000, 8081);
promisedSServer.then(function (kServer) {
    //console.log(`${KVerboseLog.log(kServer)}`);
});
