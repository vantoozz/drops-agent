import {Message} from "../Message";
import * as moment from 'moment';

type ElasticsearchMessage = {
    tag: string,
    timestamp: string,
    context?: object
};

export class ElasticsearchMessageHydrator {

    public static extract(message: Message): ElasticsearchMessage {
        let data = {
            "tag": message.tag,
            "timestamp": moment(message.date).utc().format('YYYYMMDDTHHmmss\\Z') // basic_date_time_no_millis
        };

        if (0 < Object.keys(message.context).length) {
            data["context"] = message.context;
        }

        return data;
    }
}