import "reflect-metadata";

import { Container } from "inversify";
import {TYPES} from "kitsune-wrapper-library/dist/base/constants/Base";
import CoreState from "../constants/CoreState";
import {LoadModule} from "../service/LoadModule";
import {InitWrapper} from "../commands/InitWrapper";
import {FetchConfig} from "../service/FetchConfig";
import {InitWrapperComplete} from "../commands/InitWrapperComplete";
import ICommand from "kitsune-wrapper-library/dist/base/interfaces/ICommand";
import IAsyncRequest from "kitsune-wrapper-library/dist/base/interfaces/IAsyncRequest";
import {StartApplication} from "../commands/StartApplication";

let container = new Container({ skipBaseClassChecks: true });

container.bind<ICommand>(CoreState.INIT).to(InitWrapper);
container.bind<IAsyncRequest>(TYPES.FetchConfig).to(FetchConfig).inSingletonScope();
container.bind<LoadModule>(TYPES.LoadModule).to(LoadModule);
container.bind<ICommand>(CoreState.INIT_COMPLETE).to(InitWrapperComplete);
container.bind<ICommand>(CoreState.START_APPLICATION).to(StartApplication);

export default container;