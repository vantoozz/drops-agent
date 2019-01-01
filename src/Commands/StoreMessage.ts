import {StorageInterface, StorageType} from "../Storage/StorageInterface";
import {Message} from "../Message";
import {inject, injectable} from "inversify"
import "reflect-metadata";

@injectable()
export class StoreMessage {

    constructor(@inject(StorageType) private _storage: StorageInterface) {
    }

    public handle(message: Message): void {
        this._storage.store(message);
    }
}