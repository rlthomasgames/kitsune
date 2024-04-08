import IInjectParser from "../interfaces/extensions/IInjectParser";

export class AbstractParser implements IInjectParser {

    name: string;

    parse<T>(data: ArrayBuffer | string, path: string): T {
        console.log("WARNING: AbstractParser - parse called");
        return undefined as T;
    }

    startModule(): void {
    }
}
