import {Message} from "../Message";

type InputMessage = {
    tag: string,
    context: object,
    date: string,
};

export class JsonMessageHydrator {

    public static hydrate(input: string): Message {
        const data: InputMessage = JSON.parse(input);

        return new Message(this.hydrateTag(data), this.hydrateContext(data), this.hydrateDate(data))
    }

    private static hydrateDate(data: InputMessage): Date {
        if (undefined === data.date) {
            return new Date;
        }

        const date = new Date(data.date);
        if (isNaN(date.getTime())) {
            throw "Bad date format";
        }

        return date;
    }

    private static hydrateContext(data: InputMessage): object {
        if (undefined === data.context) {
            return {};
        }

        if ("object" !== typeof data.context) {
            throw "Context must be an object";
        }

        return data.context;
    }

    private static hydrateTag(data: InputMessage): string {
        if (undefined === data.tag) {
            throw "No tag given";
        }

        if ("string" !== typeof data.tag) {
            throw "Tag must be a string";
        }

        const tag = data.tag.trim();

        if ("" === tag) {
            throw "Tag must be not empty";
        }

        return tag;
    }
}