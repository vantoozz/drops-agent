export class Message {

    constructor(private readonly _tag: string, private readonly _date: Date) {
    }

    public get tag(): string {
        return this._tag;
    }

    public get date(): Date {
        return this._date;
    }
}
