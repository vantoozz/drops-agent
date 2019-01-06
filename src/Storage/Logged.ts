import {StorageInterface} from "./StorageInterface";
import {Message} from "../Message";
import {LoggerInterface} from "../Logger/LoggerInterface";

export class Logged implements StorageInterface {

    constructor(private readonly _storage: StorageInterface, private readonly _logger: LoggerInterface) {
    }

    async store(message: Message): Promise<void> {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            this._logger.info('[STORING MESSAGE]');
            this._storage.store(message).then(() => {
                this._logger.info(`[STORED IN ${(Date.now() - start)} ms]`);
                resolve();
            }, reject);
        });

    }
}