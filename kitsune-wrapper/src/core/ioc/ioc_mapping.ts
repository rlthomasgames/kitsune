import "reflect-metadata";

import { Container } from "inversify";
import Command from "kitsune-wrapper-library/dist/base/interfaces/Command";
import AsyncRequest from "kitsune-wrapper-library/dist/base/interfaces/AsyncRequest";
import {TYPES} from "kitsune-wrapper-library/dist/base/constants/Base";
import CoreState from "../constants/CoreState";
import {LoadModule} from "../service/LoadModule";
import {InitWrapper} from "../commands/InitWrapper";
import {FetchConfig} from "../service/FetchConfig";
import {InitWrapperComplete} from "../commands/InitWrapperComplete";


let container = new Container({ skipBaseClassChecks: true });

container.bind<Command>(CoreState.INIT).to(InitWrapper);
container.bind<AsyncRequest>(TYPES.FetchConfig).to(FetchConfig).inSingletonScope();
container.bind<LoadModule>(TYPES.LoadModule).to(LoadModule);
container.bind<Command>(CoreState.INIT_COMPLETE).to(InitWrapperComplete);

export default container;
