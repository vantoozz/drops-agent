import {Message} from "../Message";

export interface StorageInterface {
    store(message: Message): void;
}

export const StorageType = Symbol.for("StorageInterface");
