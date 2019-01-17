import {StorageInterface, StorageType} from '../Storage/StorageInterface';
import {Message} from '../Message';
import {inject, injectable} from 'inversify'
import 'reflect-metadata';
import {LoggerInterface, LoggerType} from '../Logger/LoggerInterface';

@injectable()
export class StoreMessage {

    constructor(
        @inject(StorageType) private readonly _storage: StorageInterface,
        @inject(LoggerType) private readonly _logger: LoggerInterface
    ) {
    }

    public handle(messages: Message[]): void {
        this._storage.store(messages).catch((e) => {
            this._logger.error(e.toString());
        });
    }
}
