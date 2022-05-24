export default interface IAsyncRequest {
    request(valuedObject?:unknown): Promise<unknown> | undefined;
}
