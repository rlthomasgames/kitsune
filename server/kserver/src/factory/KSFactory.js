"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.KServerChannel = exports.ColourizeMsg = exports.shuffle = exports.defaultEventHandler = exports.KServer = exports.KSFactory = void 0;
var tail_1 = require("tail");
var KitsuneHelper_1 = require("kitsune-wrapper-library/dist/base/helper/KitsuneHelper");
var colors = require("colors");
var exec = require('child_process').exec;
var process = require('process');
var KSFactory = /** @class */ (function () {
    function KSFactory() {
    }
    // TODO : kill processes blocking server starting
    // hint shell command for killing processes by port ---
    // ps aux | grep 3000 && netstat -lntp | grep node > filename.txt && awk '{ print $2 $7 } ' filename.txt > pid.txt
    KSFactory.createServer = function (eventHandler, MONGO_DB, REST_SERVER, WS_PORT, ASSET_STORE) {
        if (MONGO_DB === void 0) { MONGO_DB = 27017; }
        if (REST_SERVER === void 0) { REST_SERVER = 3090; }
        if (WS_PORT === void 0) { WS_PORT = 3000; }
        if (ASSET_STORE === void 0) { ASSET_STORE = 8081; }
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            return __generator(this, function (_a) {
                promise = new Promise(function (resolve, reject) {
                    if (true === true) {
                        resolve(new KServer());
                    }
                });
                return [2 /*return*/, promise];
            });
        });
    };
    return KSFactory;
}());
exports.KSFactory = KSFactory;
var KServer = /** @class */ (function () {
    function KServer() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = this;
        this.blockingProcesses = [];
        setTimeout(function () {
            var sock = new KServerChannel('sock.txt', '../kitsune-ws-server', false, false);
            sock.output.on('line', function (kSockData) { return _this.channelEventHandler("".concat(kSockData), 'WS'); });
            var rest = new KServerChannel('rest.txt', '../kitsune-rest-server', false, false);
            rest.output.on('line', function (kSockData) { return _this.channelEventHandler("".concat(kSockData), 'REST'); });
            var wrapper = new KServerChannel('wrapper.txt', '../../client/kitsune-wrapper', false, false);
            wrapper.output.on('line', function (kSockData) { return _this.channelEventHandler("".concat(kSockData.split('"')[0]), 'WRAPPER'); });
            var asset = new KServerChannel('asset.txt', '../kitsune-asset-store', false, false);
            asset.output.on('line', function (kSockData) { return _this.channelEventHandler("".concat(kSockData), 'ASSETS'); });
            var mongo = new KServerChannel('asset.txt', 'sudo mongod --dbpath ~/mongodb/ --bind_ip 127.0.0.1 --port 27017', true, false);
            mongo.output.on('line', function (kSockData) { return _this.channelEventHandler("".concat(kSockData), 'MONGO'); });
        }, 5000);
    }
    KServer.prototype.channelEventHandler = function (data, channel) {
        // const IN_USE = kSockData.toUpperCase().includes('listen EADDRINUSE'.toUpperCase())
        var INUSE = data.includes('EADDRINUSE');
        //process.stdout.write(`${data.stripColors} \n`);
        (0, exports.ColourizeMsg)("".concat(data), channel);
    };
    KServer.prototype.killProcessOnPort = function (port) {
        var promiseResolve;
        var promiseOfCheck = new Promise(function (resolve, reject) {
            var pidOutput = new tail_1.Tail('pid.txt', {});
            var gotProcess = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                console.log('pid caught :: ', args);
                var killer = "sudo kill ".concat(args[0]);
                exec(killer);
                resolve(true);
            };
            pidOutput.on('line', gotProcess);
            setTimeout(function () {
                console.log('timeout on kill');
                resolve(true);
            }, 4000);
            var cmd = "netstat -anp 2> /dev/null | grep :".concat(port, " | egrep -o \"[0-9]+/node\" | cut -d'/' -f1 > pid.txt;");
            exec(cmd);
        });
        return promiseOfCheck;
    };
    return KServer;
}());
exports.KServer = KServer;
var defaultEventHandler = function (event, next) {
    //ColourizeMsg(event[0], '')
    console.log("server received ".concat(event));
    switch (event[0]) {
        case "":
            break;
        default:
            console.log("event hadler got something", event);
            break;
    }
};
exports.defaultEventHandler = defaultEventHandler;
var shuffle = function (array) {
    var _a;
    var currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        _a = [
            array[randomIndex], array[currentIndex]
        ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
    return array;
};
exports.shuffle = shuffle;
var msgs = 0;
var lastCol = 'none';
var ColourizeMsg = function (msg, channel) {
    var decor0 = ["\u2588".inverse, "\u2589".inverse, "\u258A".inverse, "\u258B".inverse, "\u258C".inverse, "\u258D".inverse, "\u258E".inverse, "\u258F".inverse, "\u258E".inverse, "\u258D".inverse, "\u258C".inverse, "\u258B".inverse, "\u258A".inverse, "\u2589".inverse, "\u2588".inverse];
    //const decor1 = [`▀`.bgYellow.red.inverse,`▀`.bgYellow.red]
    var decor2 = [colors.bgRed.red, colors.bgRed.yellow, colors.bgYellow.red, colors.bgYellow.yellow, colors.bgYellow.red, colors.bgRed.yellow, colors.bgRed.red];
    //let decor2 = [colors.bgRed.red,colors.bgRed.yellow,colors.bgYellow.red,colors.bgYellow.yellow,colors.bgYellow.red,colors.bgRed.yellow,colors.bgRed.red, colors.bgMagenta.cyan,colors.bgBlue.magenta,colors.bgGreen.green,colors.bgGreen.cyan,colors.bgCyan.cyan,colors.bgCyan.blue,colors.bgCyan.yellow];
    //const decor2 = [colors.bgMagenta.bold];
    var gradient4 = ['█', '▓', '▒', '░', ' ', '░', '▒', '▓'];
    var gradient3 = ['█', '▉', '█', '▇', '▆', '▅', '▄', '▃', '▂', '▁'];
    //const grades = ['█'.inverse,'▉'.inverse,'█'.inverse,'▇'.inverse,'▆'.inverse,'▅'.inverse,'▄'.inverse,'▃'.inverse,'▂'.inverse,'▁'.inverse];
    var gradient2 = ['▚', '█', '▓', '▒', '░', ' ', '░', '▒', '▓', '█', '▉', '█', '▇', '▆', '▅', '▄', '▃', '▂', '▁', '▂', '▃', '▄', '▅', '▆', '█'];
    var gradient = ['█', '▛', '▜', '▙', '▟', '▚', '▞', '▘', '▖', '▗', '▝', ' ', ' '];
    //const allgrades = [gradient, gradient2, gradient3, gradient4];
    //const fire = [`░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░','▒▒▒▒▒▒▒▒▒','▓▓▓▓▓▓▓▓▓▓','████████████████████████████████████████████████','▉','█','▇','▆','▅','▄','▃','▂','▁`].join('').split('');
    //const allgrades = [fire];
    var grades = gradient4;
    //decor2 = shuffle(decor2);
    //let grades = shuffle(allgrades[Math.floor(Math.random()*allgrades.length << msgs % allgrades.length)]);
    //let grades = shuffle([gradient.join('').replace(',',''), gradient.slice(1, gradient.length-2).reverse().join('').replace(',','')].join('').replace(',','').split('').join(gradient4.join('')).split('').join(gradient3.join('')).split(''));
    //const grades = ['▚'];
    var fillDecor = decor2;
    var m = "".concat(msg);
    m = "".concat(m.replace("TypeError:", "TypeError:".bgRed.black.bold));
    m = "".concat(m.replace("Error:", "Error:".bgRed.black.bold));
    m = "".concat(m.replace("Error", "Error".bgRed.black.bold));
    m = "".concat(m.replace("ERROR", "ERROR".bgRed.black.bold));
    m = "".concat(m.replace("undefined", "undefined".bgRed.black.bold));
    m = "".concat(m.replace("null", "null".bgRed.black.bold));
    m = "".concat(m.replace("cannot", "cannot".bgRed.black.bold));
    m = "".concat(m.replace("webpack-dev-server", "webpack-dev-server".green));
    m = "".concat(m.replace("express", "express".green));
    m = "".concat(m.replace("socket.io", "socket.io".green));
    m = "".concat(m.replace("JSON", "JSON".green));
    m = "".concat(m.replace("fflate", "fflate".green));
    m = "".concat(m.replace("nodemon", "nodemon".green));
    m = "".concat(m.replace("--watch", "--watch".green));
    m = "".concat(m.replace("Webpack", "Webpack".green));
    m = "".concat(m.replace("webpack", "webpack".green));
    m = "".concat(m.replace("built", "built".green));
    m = "".concat(m.replace("build", "build".green));
    m = "".concat(m.replace("run", "run".green));
    m = "".concat(m.replace("kill", "kill".red));
    m = "".concat(m.replace("killall", "killall".red));
    m = "".concat(m.replace("pkill", "pkill".red));
    m = "".concat(m.replace("npm", "npm".yellow));
    m = "".concat(m.replace("node", "node".yellow));
    m = "".concat(m.replace("tsc", "tsc".yellow));
    m = "".concat(m.replace("cd", "cd".yellow));
    m = "".concat(m.replace("../", "../".blue));
    m = "".concat(m.replace("./", "./".blue));
    m = "".concat(m.replace("/", "/".blue));
    m = "".concat(m.replace(".", ".".blue));
    m = "".concat(m.replace("code", "code".blue));
    m = "".concat(m.replace("generated", "generated".blue));
    m = "".concat(m.replace("dist/", "dist/".blue));
    m = "".concat(m.replace("kitsune/", "kitsune/".blue));
    m = "".concat(m.replace("kitsune-wrapper/", "kitsune-wrapper/".bgMagenta.blue));
    m = "".concat(m.replace("kitsune-wrapper-extensions", "kitsune-wrapper-extensions".bgMagenta.blue));
    m = "".concat(m.replace("kitsune-wrapper-library", "kitsune-wrapper-library".bgMagenta.blue));
    m = "".concat(m.replace("kitsune-application-test-dummy", "kitsune-application-test-dummy".bgMagenta.blue));
    m = "".concat(m.replace("kitsune-asset-store", "kitsune-asset-store".bgMagenta.blue));
    m = "".concat(m.replace("kitsune-rest-server", "kitsune-rest-server".bgMagenta.blue));
    m = "".concat(m.replace("kitsune-ws-server", "kitsune-ws-server".bgMagenta.blue));
    m = "".concat(m.replace("mongodb", "mongodb".bgMagenta.blue));
    m = "".concat(m.replace("mongod", "mongod".bgMagenta.blue));
    m = "".concat(m.replace("report.html", "report.html".blue));
    m = "".concat(m.replace("extensions/", "extensions/".blue));
    m = "".concat(m.replace(".bundle.js", ".bundle.js".blue));
    m = "".concat(m.replace("EADDRINUSE", "EADDRINUSE".red));
    m = "".concat(m.replace("listen", "listen".yellow));
    //process.stdout.write(`${""+KitsuneHelper.kChar+""} : ${m}`+"\u001b[2K\u001b[0E\r");
    var fi = '';
    var fiArr = [];
    var f = " |".concat(msgs, "|");
    var fillLength = process.stdout.columns;
    var count = 0;
    var tg = msgs % grades.length;
    while (count < fillLength) {
        fiArr.push(fillDecor[msgs % fillDecor.length](grades[count % grades.length]));
        count++;
    }
    /*
    fiArr.splice(0,  ((""+m).stripColors).length+f.length+7+3)
    fi = fiArr.join('')

     */
    //fi = fi.slice(0, (m.length+f.length+channel.length+2));
    var channelFill = 7 - channel.length;
    var cFill = '';
    while (cFill.length < channelFill) {
        cFill = cFill + " ";
    }
    var KChannel = "" + KitsuneHelper_1["default"].kChar + cFill + channel + "" + decor0[msgs % decor0.length] + "".white.bgWhite + "";
    var channelCol = "" + f + "".black.bgWhite + "";
    var filler = fi;
    if (channel === 'WS') {
        KChannel = KChannel.bgCyan.cyan;
        channelCol = channelCol.bgCyan.cyan;
        filler = filler.bgCyan.cyan;
    }
    else if (channel === 'WRAPPER') {
        KChannel = KChannel.bgGreen.green;
        channelCol = channelCol.bgGreen.green;
        filler = filler.bgGreen.green;
    }
    else if (channel === 'REST') {
        KChannel = KChannel.bgMagenta.magenta;
        channelCol = channelCol.bgMagenta.magenta;
        filler = filler.bgMagenta.magenta;
    }
    else if (channel === 'ASSET') {
        KChannel = KChannel.bgYellow.yellow;
        channelCol = channelCol.bgYellow.yellow;
        filler = filler.bgYellow.yellow;
    }
    else if (channel === 'MONGO') {
        KChannel = KChannel.bgWhite.black;
        channelCol = channelCol.bgWhite.black;
        filler = filler.bgWhite.black;
    }
    else
        KChannel = KChannel.bgBlack;
    channelCol = channelCol.bgWhite.bgBlack;
    var out = "" + "".concat(m).concat(cFill).concat(channelCol);
    ///KChannel=KChannel;
    process.stdout.write("".concat(KChannel).concat(out, "\n\u001B[2K\u001B[0E\r"));
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
};
exports.ColourizeMsg = ColourizeMsg;
var KServerChannel = /** @class */ (function () {
    function KServerChannel(file, cmd, fullCmd, newWindow) {
        if (fullCmd === void 0) { fullCmd = false; }
        if (newWindow === void 0) { newWindow = false; }
        this.outputStr = '';
        var prefix = fullCmd ? '' : "npm --watch run start --prefix ";
        var cmdToUse = newWindow ? "gnome-terminal -- bash -c \"".concat(prefix).concat(cmd, " 2>&1| tee ").concat(file, "; exec bash\"") : "".concat(prefix, " ").concat(cmd, " 2>&1| tee \u00A3{file}");
        if (newWindow === false && fullCmd === false) {
            cmdToUse = "npm --watch run start --prefix ".concat(cmd, " 2>&1| tee ").concat(file);
        }
        else {
            cmdToUse = "".concat(cmd, " 2>&1| tee ").concat(file);
        }
        exec(cmdToUse);
        this.output = new tail_1.Tail(file, {});
        this.outputStr = '';
        this.output.on("line", function (data) {
            //console.log(`file:   ${file} :`, data);
        });
        this.output.on("error", function (error) {
            console.log('ERROR: ', error.toLocaleString());
        });
    }
    return KServerChannel;
}());
exports.KServerChannel = KServerChannel;
var tick = function () {
    console.log("tick ".concat(Date.now()));
    setTimeout(tick, 1000);
};
