import AsyncRequest from "../interfaces/IAsyncRequest";


export class AbstractAsyncRequest implements AsyncRequest {
    request(moduleName?: string) {
        return undefined;
    };
}
