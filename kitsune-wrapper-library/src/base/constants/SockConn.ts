export type MsgObject = {
    readonly type: string;
};

export type AuthMsg = MsgObject & {
    auth_token: string
};

export interface ISOCK {
    readonly AUTH_TOKEN: string;
    readonly CONNECT: string;
    readonly SOCK_ID : string;
    readonly GZIP_TEST : string;
    readonly AP_REQ : string;
    readonly KICK : string;
    readonly CONNECTION: string;
    readonly AP_RES: string;
}

export const SOCK:ISOCK = {
    AUTH_TOKEN: "AUTH_TOKEN",
    CONNECT: "connect",
    KICK: "disconnect",
    SOCK_ID: "SOCK_ID",
    GZIP_TEST: "GZIP",
    AP_REQ: "assetPackREQ",
    CONNECTION: 'connection',
    AP_RES: 'assetPackRES'
}