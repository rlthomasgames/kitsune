export default interface AsyncRequest {
    request(moduleName?: string): Promise<unknown> | undefined;
}
