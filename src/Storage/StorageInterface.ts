import {Message} from "../Message";

export interface StorageInterface {
    store(message: Message): Promise<void>;
}

export const StorageType = Symbol.for('StorageInterface');
