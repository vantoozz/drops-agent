import {StorageInterface, StorageType} from "../Storage/StorageInterface";
import {Message} from "../Message";
import {inject, injectable} from "inversify"
import "reflect-metadata";

@injectable()
export class StoreMessage {
    private _storage: StorageInterface;

    constructor(@inject(StorageType) storage: StorageInterface) {
        this._storage = storage;
    }

    public handle(message: Message): void {
        this._storage.store(message);
    }
}