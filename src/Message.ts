export class Message {
    constructor(
        public readonly tag: string,
        public readonly context: object,
        public readonly date: Date
    ) {
    }
}
