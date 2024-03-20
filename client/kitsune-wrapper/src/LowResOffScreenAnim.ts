//import {bytesToBase64} from "./core/encoding/Base64";

console.log('hello');

let fire:LowResOffScreenAnim

self.onmessage =(ev)=>{
    if (!fire) {
        fire = new LowResOffScreenAnim();
    }
    /*
    if(fire!.offScreenCanvas === undefined && ev.data !== undefined) {
        //this._ctx = (ev.data! as HTMLCanvasElement)!.getContext('2d')!;
        fire!.offScreenCanvas = (ev.data! as HTMLCanvasElement).transferControlToOffscreen();
        if(fire!) {
            this._ctx = fire!.offScreenCanvas!.getContext('2d')!;
        }
    }

     */
    //const fireData = fire?.startWork()!; //currently unusable :(
    console.log('returning data', 'fireData is currently unusable');
    //self.postMessage(firePacket)
    //console.log(`worker got  : ${ev} || \n\e\r \n =`, ev);

};
/*
addEventListener("message", e => {
    console.log(` \"message\" got event : ${e} || \n\e\r \n =`, e, `with params -> ${e.data}`);
    const x:Array<string> = Object.keys(e);
    const values = Object.values(e)
    //const mapped = values.map((val, ind, arr)=>{
    //    val
    //})
    console.log('worker message received...', x, values, )
    //const returnObject = { x :[v:string]:values};
});
*/
export type FirePacket = {
    FIRE:ImageBitmap,
}

export class LowResOffScreenAnim {
    offScreenBoundary = new DOMRectReadOnly(0,0,320,240);
    offScreenCanvas: OffscreenCanvas;
    private _ctx:RenderingContext | OffscreenRenderingContext | CanvasRenderingContext2D;
    private _reds:Array<number>;
    private _greens:Array<number>;
    private _blues:Array<number>;
    private _r = 0;
    private _g = 0;
    private _b = 0;
    private cells:number = this.offScreenBoundary.width;
    private rows:number = this.offScreenBoundary.height;
    private ratioX = 0;
    private ratioY = 0;
    public fireFrames :Array<FirePacket>;

    constructor() {
    }

    someInitSetupBeforeICanWork() {
        //this.offScreenCanvas = new OffscreenCanvas(this.offScreenBoundary.width, this.offScreenBoundary.height);
        while(!this._ctx)
        {
            this._ctx = this.offScreenCanvas.getContext('2d')!;
        }
        this._r = 0;
        this._g = 0;
        this._b = 0;
        this.cells = this.offScreenBoundary.width;
        this.rows = this.offScreenBoundary.height;
        this.ratioX = 0;
        this.ratioY = 0;
        this.fireFrames = [];
        this.fireFrames ? console.log(`+++++++++++++++++ READY TO BUILD: current frames : ${this.fireFrames.length} +++++++++++++++++`) : console.log("WORKER WARNING");
    }

    toDataURL(url:string, callback:Function) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    startWork = () =>{
        this.someInitSetupBeforeICanWork();
        console.log('drawing fire')
        const canUse = Object(this._ctx).hasOwnProperty('clearRect');
        if(canUse){
            (this._ctx as CanvasRenderingContext2D).clearRect(0, 0,this.cells, this.rows);
            for (var y = 0; y <= this.cells / 2 + 6; y++) {
                for (var x = 0; x <= this.cells - 1; x++) {
                    if (y > this.cells / 2 + 3) {
                        this._r = Math.random() * 999;
                        this._g = Math.random() * this._r;
                        this._b = Math.random() * this._g;

                        this._reds[y * this.cells + x] = this._r;
                        this._greens[y * this.cells + x] = this._g;
                        this._blues[y * this.cells + x] = this._b;
                    } else {
                        this._r =
                            (
                                this._reds[(y + 1) * this.cells + x] +
                                this._reds[(y + 2) * this.cells + x] +
                                this._reds[(y + 1) * this.cells + x + 1] +
                                this._reds[(y + 1) * this.cells + x - 1]) /
                            (5.1 + Math.random() * 0.3 + y / (this.cells * 6));
                        this._reds[y * this.cells + x] = this._r;

                        this._g =
                            (this._greens[(y + 1) * this.cells + x] +
                                this._greens[(y + 2) * this.cells + x] +
                                this._greens[(y + 1) * this.cells + x + 1] +
                                this._greens[(y + 1) * this.cells + x - 1]) /
                            (3.9 + Math.random() * 0.6);
                        this._greens[y * this.cells + x] = this._g;

                        this._b =
                            (this._blues[(y + 1) * this.cells + x] +
                                this._blues[(y + 2) * this.cells + x] +
                                this._blues[(y + 1) * this.cells + x + 1] +
                                this._blues[(y + 1) * this.cells + x - 1]) /
                            (3.9 + Math.random() * 0.3);
                        this._blues[y * this.cells + x] = this._b;
                    }
                }
            }


            this._reds[Math.floor(Math.random() * this._reds.length * .5) + this._reds.length * .5] = 255;
            this._reds[Math.floor(Math.random() * this._reds.length * .6) + this._reds.length * .4] = 255;
            this._reds[Math.floor(Math.random() * this._reds.length * .7) + this._reds.length * .3] = 255;
            this._reds[Math.floor(Math.random() * this._reds.length * .8) + this._reds.length * .2] = 255;
            this._reds[Math.floor(Math.random() * this._reds.length * .9) + this._reds.length * .1] = 255;


            //draw:
            for (var y = 0; y <= this.cells / 2 - 1; y++) {
                for (var x = 0; x <= this.cells - 1; x++) {
                    const unknownCheck = this._ctx as unknown as WebGL2RenderingContext;
                    if(unknownCheck.hasOwnProperty('fillStyle') && unknownCheck.hasOwnProperty('fillRect'))
                        (this._ctx as unknown as any)['fillStyle'] =
                            "rgb(" +
                            this._reds[y * this.cells + x] +
                            "," +
                            this._greens[y * this.cells + x] +
                            "," +
                            this._blues[y * this.cells + x] +
                            ")";
                    (this._ctx as unknown as any).fillRect( this.ratioX * x, this.ratioY * 2 * y, this.ratioX + 1, this.ratioY * 2 + 1);
                }
            }

        }
        //(this._ctx as OffscreenCanvasRenderingContext2D).commit();

        const imageData = this.offScreenCanvas.transferToImageBitmap();
        //const urlData = `data:image/png;base64,${bytesToBase64(imageData.data as unknown as Uint8Array)}`
        const firePacket : FirePacket = {FIRE:imageData};
        //postMessage(firePacket)
        this.fireFrames.push(firePacket);
        return firePacket
    }
}
 
