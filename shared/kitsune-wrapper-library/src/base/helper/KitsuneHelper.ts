//import {find} from 'node-emoji';

interface Awaiter {
    asyncAwait: <T>(prom:Promise<T>) => T;
}

export default class KitsuneHelper implements Awaiter {

    private static singletonInstance: KitsuneHelper;

    constructor() {
        if (typeof window !== "undefined" && !window[`kitsuneExtensionFactories`]) {
            this.createSingleton();
        }
    }

    private createSingleton():void {
        window[`kitsuneExtensionFactories`] = new Map();
    }

    static getInstance(): KitsuneHelper {
        return KitsuneHelper.singletonInstance ?? new KitsuneHelper();
    }

    static getKitsuneFactories() : Map<string, any> {
        if(window[`kitsuneExtensionFactories`] === undefined) {
            new KitsuneHelper();
        }
        return window[`kitsuneExtensionFactories`];
    }

    public static asyncAwait(p:Promise<any>) {
        return KitsuneHelper.getInstance().asyncAwait(p)
    }

    asyncAwait(p:Promise<any>) {
        return <Awaited<any>>p.then((val)=>val);
    }

    private static readonly DEFAULT_PORTS = {
        MONGO_DB:27017,
        REST_SERVER:3090,
        WS_PORT:3000,
        ASSET_STORE:8081
    }

    debugObject(obj:any, props:Array<string>):void{
        console.log(obj, props);
        const kE = JSON.parse(`{
                   "Obj":"${KitsuneHelper.kfeedbackIcons[4]}"
                   }`)
        const kError = (obj !== undefined) ? {...kE, ...{OBJ: JSON.stringify(obj)}} : {noError:true};
        const key = toSymbol(KitsuneHelper.kfeedbackIcons[3]).toString();
        const kM = {[`${(key+obj as string)}` as string]:`${KitsuneHelper.kfeedbackIcons[3]}`}
        const values = []
        props.forEach((props)=>{
            values.push(obj[props]);
            values.push(obj[props]);
        })
        let message = props ? {...obj, ...{...props, ...values}} : {PROPS:`${KitsuneHelper.kfeedbackIcons[3]}`};
        obj ? message = {...message, ...kError} : message;
        console.table(message, Object.keys(message));
    }

    static readonly PORTS = KitsuneHelper.DEFAULT_PORTS;
    static readonly kChar = '🦊';
    static readonly kitsuneASCII ="\n                                                         \n                       ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░              \n                   ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░            \n▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░          \n░▒    ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒▒▒▒▒ ▒▒▒▒▒▒▒░░▒▒▒▒▒▒▒▒▓\n ▒         ░▒▒▒▒▒░  ░░░  ▒▒▒▒▒▒▒░▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒    ▓\n ░▒         ▒▒▒▒      ▒  ░░     ▒▒▒▒▒▒▒    ░░▒░  ▒░    ▒░\n ░▒░      ░▒▒▒▒▒ ▒▒░    ░▒░ ▒▒▒▒▒░     ░▒▒░   ░░ ▒▒░   ▒ \n  ░▒     ▒▒▒▒▒▒▒░░▒▒▒▒▒▒▒ ▒▒▒▒▒░        ▒▒▒▒▒▒▒░▒▒▒▒░ ▒░ \n  ░░░   ▒▒▒▒▒▒▒▒▒▒       ▒▒▒▓██▒░░░   ░░▒      ▒▒▒▒▒▒░▒░ \n   ░▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓███████▓▓▒▒▓████▓▒▒▒▒▒▓▒▒▒▒░  \n    ░▒░▒▒▒▒▒▓▓██████████▓▓▓█████▓▒▒▒░░▒▓███████████▓▒▒░░ \n   ░▒▒▒▒▒▒▒▒▓████████████████▓▒░       ░▒█████████▓▒▒░▒░ \n  ▒▒▒▒▒▒▒▒▒▒▓██████████████▓░           ░▓████████▓▓▓▒░▒ \n ▒░▒██████▓▓▒▒█████████▓█▒░              ▒███████▓▓███▓░▒\n ▒░▒▓▓▓██████▓▒████████▒▒    ░ �� ░ ░     ░███████▓█▓▒▒▒▒░\n  ░░░░░░▒▒▒▒▓██░▓██████▒    ░▓▒▒ ▓▒▒░    ▒█████▒▒▒▒░░    \n            ▒▓▒░ ▒██████▒░   ░▓▒ ▓▒▒░   ░████▓▒▒         \n                ░▒▒░▓███▓▓░  ░▓▓▓ ▓▒░   ▓██▓▒▒░          \n                   ░▒▒░▒▓▓▓▒░ ░▒▓▓▓▓▒  ▒██▒▒░            \n                       ░▒░░▒▓▒        ░▓▒▒░              \n                          ░▒▒██████▓███▒▒                \n                                ░██░                     \n"
    static readonly kitsuneASCIILARGE = "                                                 ███████████████████████████████████                                 \n                                         ████████████████████████████████████████████████                            \n                                    ██████████████▓▓▒░░      ░░░░          ░░░  ░░▒█████████▓                        \n █████████████████████████████████████████▒▓▒▒░░░              ░▒▒░░░░░░░░▒░░     ░░░▒▒▒████████                     \n ██████████████████████████████████████▒░                        ░▒▒▒▒▒▒▒▒░         ░░░░░▒▒░████████████████████████ \n ██▒░░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░           ░▓█████████████▓▒▒▒░░░     ░░░▒▒▒▒▒▒▒░░░░     ░░░░░░░░░░ ░▒█████████████████████ \n ████         ░░▒▒▓▓▓▓███▓▒░     ░▒▓██████▓▓██████████████▓▒▒▒▒▒▒░░░░      ░▒▒▒▒▓▓████████▓░▒██▓▓▓▒░▒▓▓█▓▓▓▓▓▓▒   ██ \n  ████                  ░░░░░░░  ▒▓▒  ░    ░▒░    ░  ░▒▓█▓▓░  ░░▒▒▒░  ░░▒░░▒▒░░ ░▒▓▓▒▒▒▓▓██████████▒░░▒▒▒░       ▓██ \n   ████              ░▒▓█▓▓▒▒▒░░░▒░░▓▓█▓▒░░ ░░░░▒▓▓▒░░ ▒█████▓▓▓▒░▒▓███████▓▓▓▓▓░░▓█▓▓▓▓▒░░▒░▒▒▒░░▒▒░▓█▓▒       ████ \n    ████           ░▒▓▓▓▒░░   ░▒▒▒░░░  ░▒██████▓▒░  ░▒▓████▓▒░░ ▓████▓▒▒▒▒▒▒▒▓███▓▓██▓▒▒▒▓▓▓▒░░░▒▒▓▒░░▒▓▓▓░     ███  \n     ███▓        ░▒▓▒▒░░      ░▒▒▒▒░ ░░░░   ░▒▒▓▓▒▒▒▒███▓░░  ░░░██▒▒▒▒▒░░   ░▓████▒░▒▓▓▒░░░░░  ░▒▓▒▒░   ▒▓█▒░  ███   \n      ██████  ░░▒▓▒▒░░         ░▒▓▓███▓▒▒░  ░░▒▒▓██▒░░░░      ░▒██████████████████▒░ ▒█▓▒▒▒▒▓▓██▓▓▒▒░░░░░░▓█▓█████   \n      ██████▒▒▓▓▓▒░░░      ░░░░░▒▓▓█████████▓▓▒▒░░░░░░░         ▒▓████████▓██▓░░░░░   ░░░▒▒▓▓▓▓▓▒▒▒░░░░░░░░▒█████    \n        ████▓▒▒░░        ░░░░░░░░░░░░░░░░░░░░░░░  ░░░░░     ░░▒▓█████████████▓▓▒▒░░      ░░░░░           ░  ▒░███    \n      █████░▒░░          ░                                ░▒▓█████████████▓██████▓▒░                  ░  ░   ▒░███   \n    █████▒▓▒░░░░░░░░░   ░░░░                           ░▓███████▓▒▒░░       ░▓███▓▒░                     ░░▒▒▒▓░████ \n  █████░▓▒▒▒▒▒▒▒▒▒▒▒▒▒░   ░▒▒▒░                ░░  ░▒▓███████▒ ░▒░  ░▒▒░░      ▒▓▓▒▒                  ░░░░░░░▒▒▓░███ \n  ███▒▒░          ░░░░░░░░   ░▒▒░              ░░░▓██████▓ ▒▓▓▒▒▓▓▒▒▓▓▓▓▓▓▒░   ░▓▓▓▒░                          ░░███ \n  ███████████████▓▓▒▒░░   ░░░░ ░▒▒░           ░░░░▓██▓▒░  ▒▓▓▓▒▒▒▒▓▓▓▒▒▒▒▒▒░    ░▓▓▒▒            ░░░░░▒▒▓██████████▓ \n   ███████████████████████▓█▒    ░▒▒░          ░░░▒█▓▒░   ▒▓░▒▒▒░░▒▒░░░░░▒▓░    ▒██▓▒         ░▒▓░█████████████████  \n            █████████████████████▓▒▒▒▒░░░       ░▒▓█████▓▒░█▓░░░░░░░░░  ░▓▓░   ▒███▒░      ░▒▓░█████████████         \n                         █████████████▒▓▒▒▒▒░     ░░▒█████▓░██░ ░░░░░░░░░█▓   ▒██▓▒░    ▒▓▓▒███████                  \n                                █████████████▒▓▒░░   ░░▒▓███ ███▒░      ░▓█▓░ ▓██▓░ ░▒▓▒███████▓                     \n                                     ████████████▓█▓▒▒░  ░▒██▓ ▓█████████▓▒▒▒▓██▒ ▒▓▒████████                        \n                                            ███████████▓█▓▒░░▓█▓░          ▒██▓░▓▒███████                            \n                                                ██████████████████████████████████████                               \n                                                      █████████████████████████████                                  \n                                                                                                                     \n"
    static readonly kfeedbackIcons = "👍,😥️,🫥,️🔍,️🗃,️🔑,️🕵,‍♂,️,⛓️‍💥️,🔗️,🗑️,⚒️,📂️,📦️,🗑️,📁️,💾️,🚧️,🌐️,⏳️,📀️,📀️,💿️,🎁️,🎟️,🎫️".split(',');
    //static readonly emoji = (name:string)=>{return find(name).emoji}
}

export enum EMOJI {
    THUMBS_UP,
    SAD
}

const icons = KitsuneHelper.kfeedbackIcons;
const toSymbol = (emoji:string)=>{ return Symbol.for(emoji)}
declare global {
    interface String {
        THUMBS_UP:string;
        SAD:string;
    }
}
export class ICONS extends String implements String {
    static get THUMBS_UP() {
        return this[EMOJI.THUMBS_UP].THUMBS_UP;
    }
    private [EMOJI.THUMBS_UP]:"👍";

    static get SAD() {
        return this[EMOJI.SAD].SAD;
    }
    private [EMOJI.SAD]:"😥️";
}

declare global {
    interface String {
        ICONS:ICONS
    }
}