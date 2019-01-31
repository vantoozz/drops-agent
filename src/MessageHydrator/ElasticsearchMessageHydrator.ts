import {Message} from '../Message';

type ElasticsearchMessage = {
    tag: string,
    timestamp: Date,
    context?: object
};

export class ElasticsearchMessageHydrator {

    public static extract(message: Message): ElasticsearchMessage {
        let data = {
            tag: message.tag,
            timestamp: message.date
        };

        if (0 < Object.keys(message.context).length) {
            data['context'] = message.context;
        }

        return data;
    }
}