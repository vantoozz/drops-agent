import {StorageInterface} from './StorageInterface';
import {Message} from '../Message';
import {BufferedStorageInterface} from "./BufferedStorageInterface";

export class Buffered implements BufferedStorageInterface {

    private _buffer: Message[] = [];

    constructor(
        private readonly _storage: StorageInterface,
        private readonly _maxSize: number
    ) {
    }

    async store(messages: Message[]): Promise<void> {

        this._buffer = this._buffer.concat(messages);

        if (this._maxSize <= this._buffer.length) {
            await this.flush();
        }
    }

    public async flush(): Promise<void> {
        if (0 >= this._buffer.length) {
            return;
        }
        const messages = this._buffer;
        this._buffer = [];

        return this._storage.store(messages);
    }
}
