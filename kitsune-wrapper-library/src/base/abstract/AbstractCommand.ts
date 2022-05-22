import Command from "../interfaces/Command";

export class AbstractCommand implements Command {
    run() {
        console.log('this is abstract implementation of Command, please make sure to override');
    };
}
