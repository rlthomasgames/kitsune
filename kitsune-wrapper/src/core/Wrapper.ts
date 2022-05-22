import container from "./ioc/ioc_mapping";
import Command from "kitsune-wrapper-library/dist/base/interfaces/Command";
import CoreState from "./constants/CoreState";

export class Wrapper {
    constructor() {
        const startUpCommand = container.get<Command>(CoreState.INIT);
        startUpCommand.run();
    }
}
