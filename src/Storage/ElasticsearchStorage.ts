import {StorageInterface} from "./StorageInterface";
import {Message} from "../Message";
import {Client} from "elasticsearch";
import {ElasticsearchMessageHydrator} from "../MessageHydrator/ElasticsearchMessageHydrator";

export class ElasticsearchStorage implements StorageInterface {

    constructor(private readonly _elasticsearch: Client, private readonly _index: string) {
    }

    store(messages: Message[]): Promise<void> {
        let body: object[] = [];
        for (const message of messages) {
            body.push({index: {"_index": this._index, "_type": this._index}});
            body.push(ElasticsearchMessageHydrator.extract(message));
        }
        return this._elasticsearch.bulk({body: body});
    }
}