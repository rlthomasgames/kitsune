export default interface IInjectParser {
    name: string;
    startModule: () => void;
    parse: <T>(data:ArrayBuffer|string, path:string) => T;
}