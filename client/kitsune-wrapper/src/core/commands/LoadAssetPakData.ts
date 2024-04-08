import {injectable} from "inversify";
import ICommand from "kitsune-wrapper-library/dist/base/interfaces/ICommand";


@injectable()
export class LoadAssetPakData implements ICommand {
    run(): void {
        //TODO : move some requests from connect to server to here
        console.log(`||||||||||| MOVE LOAD ASSETS HERE |||||||||||`);

    }

}