import container from "./ioc/ioc_mapping";
import CoreState from "./constants/CoreState";
import ICommand from "kitsune-wrapper-library/dist/base/interfaces/ICommand";
import KitsuneHelper from "kitsune-wrapper-library/dist/base/helper/KitsuneHelper";

export class Wrapper {
    constructor() {
        new KitsuneHelper();
        const startUpCommand = container.get<ICommand>(CoreState.INIT);
        startUpCommand.run();
    }
}
