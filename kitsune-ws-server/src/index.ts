import {defaultEventHandler, KitsuneSockFactory} from "./KitsuneSockFactory";
import {AssetPackSplitter} from "./cms/AssetPackSplitter";

const promisedSServer = KitsuneSockFactory.createServer(defaultEventHandler);

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
promisedSServer.then((kServer) => {
    console.log(
        `        ======================================================== \n
        ================= MAIN KSOCK SERVER ==================== \n
        ======================================================== \n`,
        KVerboseLog.log(kServer));

    console.log('testing asset splitting');
    const assetSplitter = new AssetPackSplitter('');
});
