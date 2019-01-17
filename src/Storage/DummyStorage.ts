import {StorageInterface} from './StorageInterface';
import {Message} from '../Message';
import {inject, injectable} from 'inversify';
import 'reflect-metadata';
import {LoggerInterface, LoggerType} from '../Logger/LoggerInterface';

@injectable()
export class DummyStorage implements StorageInterface {

    constructor(@inject(LoggerType) private readonly _logger: LoggerInterface) {
    }

    async store(messages: Message[]): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (.5 <= Math.random()) {
                    return reject('some error');
                }
                for (const message of messages) {
                    this._logger.info(`message.tag: ${message.tag}`);
                    this._logger.info(`message.date: ${message.date.toDateString()}`);
                }
                resolve();
            }, Math.random() * 5000);
        });

    }
}
