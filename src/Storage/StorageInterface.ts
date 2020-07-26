import {Message} from '../Message';

export interface StorageInterface {
    store(messages: Message[]): Promise<void>;
}
