import {StorageInterface} from './StorageInterface';
import {Message} from '../Message';
import {LoggerInterface} from '../Logger/LoggerInterface';

export class Logged implements StorageInterface {

    constructor(private readonly _storage: StorageInterface, private readonly _logger: LoggerInterface) {
    }

    async store(messages: Message[]): Promise<void> {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            this._logger.info(`[STORING ${(messages.length)} MESSAGES]`);
            this._storage.store(messages).then(() => {
                this._logger.info(`[STORED IN ${(Date.now() - start)} ms]`);
                resolve();
            }).catch((e) => {
                this._logger.error(e);
                reject();
            });
        });
    }
}