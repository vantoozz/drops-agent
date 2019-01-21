import {Message} from "../Message";

export class ElasticsearchMessageHydrator {

    public static extract(message: Message): object {
        let data = {
            "tag": message.tag,
            "timestamp": message.date.toISOString()
        };

        if (0 < Object.keys(message.context).length) {
            data["context"] = message.context;
        }

        return data;
    }
}