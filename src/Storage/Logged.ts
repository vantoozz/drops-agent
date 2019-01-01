import {StorageInterface} from "./StorageInterface";
import {Message} from "../Message";
import {LoggerInterface} from "../Logger/LoggerInterface";

export class Logged implements StorageInterface {

    constructor(private _storage: StorageInterface, private _logger: LoggerInterface) {
    }

    store(message: Message): void {
        this._logger.info('[STORING MESSAGE]');
        this._storage.store(message);
    }
}