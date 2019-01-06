import {StorageInterface} from "./StorageInterface";
import {Message} from "../Message";
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {LoggerInterface, LoggerType} from "../Logger/LoggerInterface";

@injectable()
export class DummyStorage implements StorageInterface {

    constructor(@inject(LoggerType) private readonly _logger: LoggerInterface) {
    }

    async store(message: Message): Promise<void> {
        return new Promise(resolve => {
            setTimeout(() => {
                this._logger.info(message.tag);
                this._logger.info(message.date.toDateString());
                resolve();
            }, Math.random() * 5000);
        });

    }
}