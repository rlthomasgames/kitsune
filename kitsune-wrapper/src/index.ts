import {sayHello, sayGoodbye} from 'kitsune-wrapper-library';
import * as _ from 'lodash';
import container from "./core/ioc/ioc_mapping";
import CoreState from "./core/constants/CoreState";
import Command from "kitsune-wrapper-library/dist/base/interfaces/Command";

function init() {
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'inversify'], ' ');
    document.body.appendChild(element);

    sayHello();
    sayGoodbye();

    const startUpCommand = container.get<Command>(CoreState.INIT);
    startUpCommand.run();

    return element;
}

init();
