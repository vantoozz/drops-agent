import {StorageInterface, StorageType} from "./StorageInterface";
import {Message} from "../Message";
import {Client} from "elasticsearch";

export class ElasticsearchStorage implements StorageInterface {

    constructor(private readonly _elasticsearch: Client, private readonly _index: string){
    }

    store(messages: Message[]): Promise<void> {
        return this._elasticsearch.bulk({body: []});
    }
}