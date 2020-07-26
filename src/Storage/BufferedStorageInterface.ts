import {StorageInterface} from "./StorageInterface";

export interface BufferedStorageInterface extends StorageInterface {
    flush(): Promise<void>;
}

export const BufferedStorageType = Symbol.for('BufferedStorageInterface');
