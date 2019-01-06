import {ServiceProvider} from "../ServiceProvider";
import {LoggerType} from "./LoggerInterface";
import {ConsoleLogger} from "./ConsoleLogger";
import {interfaces} from "inversify";
import {Labeled} from "./Labeled";
import Context = interfaces.Context;

export class LoggerServiceProvider extends ServiceProvider {

    public register(): void {
        this._container.bind(LoggerType).toDynamicValue((context: Context) => {
            let logger = context.container.resolve(ConsoleLogger);
            logger = new Labeled(logger);

            return logger;
        });
    }
}