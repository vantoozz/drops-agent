import {StorageInterface} from './StorageInterface';
import {Message} from '../Message';

export class Buffered implements StorageInterface {

    private _buffer: Message[] = [];

    constructor(
        private readonly _storage: StorageInterface,
        private readonly _maxBufferSize: number,
        private readonly _flushInterval: number
    ) {
        setInterval(async () => {
            await this.flush();
        }, this._flushInterval);
    }

    private async flush(): Promise<void> {
        if (0 >= this._buffer.length) {
            return;
        }
        const messages = this._buffer;
        this._buffer = [];

        await this._storage.store(messages);
    }

    store(messages: Message[]): Promise<void> {

        this._buffer = this._buffer.concat(messages);

        if (this._maxBufferSize <= this._buffer.length) {
            this.flush().catch((e) => {
                return Promise.reject(e);
            });
        }

        return Promise.resolve();
    }

}
