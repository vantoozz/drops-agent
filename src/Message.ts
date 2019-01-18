export class Message {
    constructor(private readonly _tag: string, private readonly _context: object, private readonly _date: Date) {
    }

    public get tag(): string {
        return this._tag;
    }

    public get context(): object {
        return this._context;
    }

    public get date(): Date {
        return this._date;
    }
}
