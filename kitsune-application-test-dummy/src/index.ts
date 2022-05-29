import {BitmapText} from "pixi.js";
import {IsolatedRuntime} from "isolated-runtime";

export class KTD {
    runtimeInstance = new IsolatedRuntime({});

    constructor() {
        this.runtimeInstance.run({
            args: [], file: "", funcName: "", root: ""

        })
    }
}

console.log('hello?', BitmapText);
