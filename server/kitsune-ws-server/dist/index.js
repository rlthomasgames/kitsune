"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KVerboseLog = void 0;
const KitsuneSockFactory_1 = require("./KitsuneSockFactory");
const promisedSServer = KitsuneSockFactory_1.KitsuneSockFactory.createServer(KitsuneSockFactory_1.defaultEventHandler);
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
promisedSServer.then((kServer) => {
    console.log(`        ======================================================== \n
        ================= MAIN KSOCK SERVER ==================== \n
        ======================================================== \n`, KVerboseLog.log(kServer));
    //console.log('testing asset splitting');
    //const assetSplitter = new AssetPackSplitter('asset_pack.tar');
});
const kMenuVisible = (visible) => {
};
