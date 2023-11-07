import {defaultEventHandler, KitsuneSockFactory} from "./KitsuneSockFactory";

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
});
