import {StorageInterface, StorageType} from "../Storage/StorageInterface";
import {Message} from "../Message";
import {inject, injectable} from "inversify"
import "reflect-metadata";

@injectable()
export class StoreMessage {

    constructor(@inject(StorageType) private readonly _storage: StorageInterface) {
    }

    public handle(message: Message): void {
        (async (message: Message) => {
            await this._storage.store(message);
        })(message);
    }
}