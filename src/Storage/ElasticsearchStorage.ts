import {StorageInterface} from './StorageInterface';
import {Message} from '../Message';
import {Client} from 'elasticsearch';
import {ElasticsearchMessageHydrator} from '../MessageHydrator/ElasticsearchMessageHydrator';
import moment = require('moment');

export class ElasticsearchStorage implements StorageInterface {

    constructor(private readonly _elasticsearch: Client, private readonly _index: string) {
    }

    store(messages: Message[]): Promise<void> {
        let index: string;
        let body: object[] = [];
        for (const message of messages) {
            index = `${this._index}-${moment(message.date).utc().format('YYYY.MM.DD')}`;
            body.push({index: {'_index': index, '_type': this._index}});
            body.push(ElasticsearchMessageHydrator.extract(message));
        }
        return this._elasticsearch.bulk({body: body});
    }
}