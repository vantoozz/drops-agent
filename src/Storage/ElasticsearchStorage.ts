import {StorageInterface, StorageType} from "./StorageInterface";
import {Message} from "../Message";
import {Client} from "elasticsearch";
import {inject, injectable} from "inversify";

@injectable()
export class ElasticsearchStorage implements StorageInterface {

    constructor(@inject(Client) private readonly _elasticsearch: Client){
    }

    store(messages: Message[]): Promise<void> {
        return this._elasticsearch.bulk({body: []});
    }
}