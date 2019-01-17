import {StorageInterface} from './StorageInterface';
import {Message} from '../Message';
import {LoggerInterface} from '../Logger/LoggerInterface';

export class Logged implements StorageInterface {

    constructor(
        private readonly _storage: StorageInterface,
        private readonly _logger: LoggerInterface
    ) {
    }

    async store(messages: Message[]): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const start = Date.now();
            this._logger.info(`[STORING ${(messages.length)} MESSAGES]`);

            try {
                await this._storage.store(messages);
            } catch (e) {
                this._logger.error(`{LOGGED} ${e.toString()}`);
                return reject(e);
            }

            this._logger.info(`[STORED IN ${(Date.now() - start)} ms]`);

            resolve();
        });
    }
}
