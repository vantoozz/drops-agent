import {StorageInterface} from "./StorageInterface";
import {Message} from "../Message";
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {LoggerInterface, LoggerType} from "../Logger/LoggerInterface";

@injectable()
export class DummyStorage implements StorageInterface {

    constructor(@inject(LoggerType) private _logger: LoggerInterface) {
    }

    store(message: Message): void {
        this._logger.info(message.tag);
        this._logger.info(message.date.toDateString());
    }
}