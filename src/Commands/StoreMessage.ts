import {StorageInterface, StorageType} from '../Storage/StorageInterface';
import {inject, injectable} from 'inversify'
import 'reflect-metadata';
import {LoggerInterface, LoggerType} from '../Logger/LoggerInterface';
import {JsonMessageHydrator} from '../MessageHydrator/JsonMessageHydrator';
import {Message} from '../Message';

@injectable()
export class StoreMessage {

    constructor(
        @inject(StorageType) private readonly storage: StorageInterface,
        @inject(LoggerType) private readonly logger: LoggerInterface,
    ) {
    }

    public handle(input: string): void {
        let message: Message;

        try {
            message = JsonMessageHydrator.hydrate(input);
        } catch (e) {
            this.logger.warn(e.toString());
            return;
        }

        this.storage.store([message]).catch((e) => {
            this.logger.error(e.toString());
        });
    }
}
