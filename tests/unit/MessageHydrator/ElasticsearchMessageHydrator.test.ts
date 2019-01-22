import {ElasticsearchMessageHydrator} from "../../../src/MessageHydrator/ElasticsearchMessageHydrator";
import {Message} from "../../../src/Message";

test('it extracts a message into an object', () => {
    const message = new Message("some tag", {}, new Date);
    const data = ElasticsearchMessageHydrator.extract(message);
    expect(data).toBeInstanceOf(Object);
});

test('it extracts tag into string', () => {
    const message = new Message("some tag", {}, new Date);
    const data = ElasticsearchMessageHydrator.extract(message);
    expect(data.tag).toBe("some tag");
});

test('it extracts date', () => {
    const message = new Message("some tag", {}, new Date("2019-01-15T09:23:34.000Z"));
    const data = ElasticsearchMessageHydrator.extract(message);
    expect(data.timestamp).toBeInstanceOf(Date);
    expect(data.timestamp.toISOString()).toBe('2019-01-15T09:23:34.000Z');
});

test('it avoids empty context', () => {
    const message = new Message("some tag", {}, new Date);
    const data = ElasticsearchMessageHydrator.extract(message);
    expect(data.context).toBeUndefined();
});

test('it extracts context', () => {
    const message = new Message("some tag", {"aaa": 1, "bbb": true}, new Date);
    const data = ElasticsearchMessageHydrator.extract(message);
    expect(data.context).toEqual({"aaa": 1, "bbb": true});
});