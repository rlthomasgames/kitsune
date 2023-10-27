export default class KitsuneHelper {

    private static singletonInstance: KitsuneHelper;
    constructor() {
        if(!window[`kitsuneExtensionFactories`]) {
            this.createSingleton();
        }
    }

    private createSingleton():void {
        window[`kitsuneExtensionFactories`] = new Map();
    }

    static getKitsuneFactories() : Map<string, any> {
        if(window[`kitsuneExtensionFactories`] === undefined) {
            new KitsuneHelper();
        }
        return window[`kitsuneExtensionFactories`];
    }
}