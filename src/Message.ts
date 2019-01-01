export class Message {

    private readonly _tag: string;
    private readonly _date: Date;

    constructor(tag: string, date: Date) {
        this._tag = tag;
        this._date = date;
    }

    public get tag(): string {
        return this._tag;
    }

    public get date(): Date {
        return this._date;
    }
}