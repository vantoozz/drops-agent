import {StorageInterface} from './StorageInterface';
import {Message} from '../Message';

export class Buffered implements StorageInterface {

    private _buffer: Message[] = [];

    constructor(
        private readonly _storage: StorageInterface,
        private readonly _maxBufferSize: number,
        private readonly _flushInterval: number
    ) {
        setInterval(() => {
            this.flush();
        }, this._flushInterval);
    }

    private flush(): void {
        if (0 >= this._buffer.length) {
            return;
        }
        const messages = this._buffer;
        this._buffer = [];

        (async (messages: Message[]) => {
            await this._storage.store(messages);
        })(messages);
    }

    store(messages: Message[]): Promise<void> {

        this._buffer = this._buffer.concat(messages);

        if (this._maxBufferSize <= this._buffer.length) {
            this.flush();
        }

        return new Promise((resolve) => {
            resolve();
        });
    }

}