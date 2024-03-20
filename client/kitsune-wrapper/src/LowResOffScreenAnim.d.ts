export type FirePacket = {
    FIRE: string;
};
export declare class LowResOffScreenAnim {
    offScreenBoundary: DOMRectReadOnly;
    offScreenCanvas: OffscreenCanvas;
    private _ctx;
    private _reds;
    private _greens;
    private _blues;
    private _r;
    private _g;
    private _b;
    private cells;
    private rows;
    private ratioX;
    private ratioY;
    private fireFrames;
    someInitSetupBeforeICanWork(): void;
    startWork: () => string;
}
