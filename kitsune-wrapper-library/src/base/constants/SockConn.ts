export type MsgObject = {
    readonly type: string;
};

export type AuthMsg = MsgObject & {
    auth_token: string
};

export const AUTH_TOKEN: string = "AUTH_TOKEN";
export const CONNECT : string = "connect";
export const SOCK_ID: string = "SOCK_ID";