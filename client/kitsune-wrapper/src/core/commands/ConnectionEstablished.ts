import {injectable} from "inversify";
import ICommand from "kitsune-wrapper-library/dist/base/interfaces/ICommand";


@injectable()
export class ConnectionEstablished implements ICommand {
    run(): void {
        //notify
        console.log(`||||||||||| CONNECTION ESTABLISHED |||||||||||`);
        
    }

}