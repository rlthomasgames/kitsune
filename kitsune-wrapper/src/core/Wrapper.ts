import container from "./ioc/ioc_mapping";
import CoreState from "./constants/CoreState";
import ICommand from "kitsune-wrapper-library/dist/base/interfaces/ICommand";

export class Wrapper {
    constructor() {
        const startUpCommand = container.get<ICommand>(CoreState.INIT);
        startUpCommand.run();
    }
}
