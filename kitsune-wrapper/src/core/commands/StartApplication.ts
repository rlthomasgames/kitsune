import {inject, injectable, optional, postConstruct} from "inversify";
import ICommand from "kitsune-wrapper-library/dist/base/interfaces/ICommand";
import BaseApplication from "kitsune-wrapper-library/dist/base/application/BaseApplication";

@injectable()
export class StartApplication implements ICommand {
    @optional()
    @inject('application')
    _application?: BaseApplication;

    @postConstruct()
    postConstruct() {
        this.run();
    }

    run(): void {
        console.log(`now classes can communicate with ${this._application}`);
        if (this._application) {
            this._application?.startModule();
        } else {
            console.warn(`StartApplication command ran but no application instance found : ${this._application}`);
        }
    }
}