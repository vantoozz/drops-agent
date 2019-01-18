import {StorageInterface, StorageType} from '../Storage/StorageInterface';
import {inject, injectable} from 'inversify'
import 'reflect-metadata';
import {LoggerInterface, LoggerType} from '../Logger/LoggerInterface';
import {JsonMessageHydrator} from "../MessageHydrator/JsonMessageHydrator";
import {Message} from "../Message";

@injectable()
export class StoreMessage {

    constructor(
        @inject(StorageType) private readonly _storage: StorageInterface,
        @inject(LoggerType) private readonly _logger: LoggerInterface,
    ) {
    }

    public handle(input: string): void {
        let message: Message;

        try {
            message = JsonMessageHydrator.hydrate(input);
        } catch (e) {
            this._logger.warn(e.toString());
            return;
        }

        this._storage.store([message]).catch((e) => {
            this._logger.error(e.toString());
        });
    }
}
