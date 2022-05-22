import AsyncRequest from "../interfaces/AsyncRequest";


export class AbstractAsyncRequest implements AsyncRequest {
    request(moduleName?: string) {
        return undefined;
    };
}
