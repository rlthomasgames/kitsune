import "reflect-metadata";

import { Container } from "inversify";
import {TYPES} from "kitsune-wrapper-library/dist/base/constants/Base";
import CoreState from "../constants/CoreState";
import {LoadModule} from "../service/LoadModule";
import {InitWrapper} from "../commands/InitWrapper";
import {InitWrapperComplete} from "../commands/InitWrapperComplete";
import ICommand from "kitsune-wrapper-library/dist/base/interfaces/ICommand";
import IAsyncRequest from "kitsune-wrapper-library/dist/base/interfaces/IAsyncRequest";
import {StartApplication} from "../commands/StartApplication";
<<<<<<< HEAD:client/kitsune-wrapper/src/core/ioc/ioc_mapping.ts
import {FetchConfig} from "kitsune-wrapper-library/dist/base/interfaces/extensions/FetchConfig";
=======
import {KSockService} from "../service/KSockService";
>>>>>>> refs/remotes/origin/main:kitsune-wrapper/src/core/ioc/ioc_mapping.ts

let container = new Container({ skipBaseClassChecks: true });

container.bind<ICommand>(CoreState.INIT).to(InitWrapper);
container.bind<IAsyncRequest>(TYPES.FetchConfig).to(FetchConfig).inSingletonScope();
container.bind<LoadModule>(TYPES.LoadModule).to(LoadModule).inSingletonScope();
container.bind<ICommand>(CoreState.INIT_COMPLETE).to(InitWrapperComplete);
container.bind<ICommand>(CoreState.START_APPLICATION).to(StartApplication);
container.bind<KSockService>(TYPES.Socket).to(KSockService);

export default container;