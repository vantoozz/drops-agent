import {JsonMessageHydrator} from "../../../src/MessageHydrator/JsonMessageHydrator";
import {Message} from "../../../src/Message";


test('it parses json to a message', () => {
    const message = JsonMessageHydrator.hydrate('{"tag": "some tag"}');
    expect(message).toBeInstanceOf(Message);
});

test('it rejects not a json input', () => {
    expect(() => {
        JsonMessageHydrator.hydrate('not a json string');
    }).toThrow(SyntaxError);
});

test('it rejects messages with no tag', () => {
    expect(() => {
        JsonMessageHydrator.hydrate('{}');
    }).toThrow('No tag given');
});

test('it rejects messages with a not-a-string tag', () => {
    expect(() => {
        JsonMessageHydrator.hydrate('{"tag": 123}');
    }).toThrow('Tag must be a string');
});

test('it parses correct tag', () => {
    const message = JsonMessageHydrator.hydrate('{"tag": "some tag"}');
    expect(message.tag).toBe('some tag');
});

test('it trims parsed tag', () => {
    const message = JsonMessageHydrator.hydrate('{"tag": "  some tag "}');
    expect(message.tag).toBe('some tag');
});

test('it rejects empty tag', () => {
    expect(() => {
        JsonMessageHydrator.hydrate('{"tag": ""}');
    }).toThrow('Tag must be not empty');
});


test('it rejects tag of spaces', () => {
    expect(() => {
        JsonMessageHydrator.hydrate('{"tag": "  "}');
    }).toThrow('Tag must be not empty');
});

test('it rejects badly formatted date', () => {
    expect(() => {
        JsonMessageHydrator.hydrate('{"tag": "some tag", "date": "some string"}');
    }).toThrow('Bad date format');
});

test('it creates default date', () => {
    const message = JsonMessageHydrator.hydrate('{"tag": "some tag"}');
    expect(message.date).toBeInstanceOf(Date);
});

test('it parses date', () => {
    const message = JsonMessageHydrator.hydrate('{"tag": "some tag", "date":"2019-01-15T09:23:34.000Z"}');
    expect(message.date).toBeInstanceOf(Date);
    expect(message.date.toISOString()).toBe('2019-01-15T09:23:34.000Z');
});


test('it rejects badly formatted context', () => {
    expect(() => {
        JsonMessageHydrator.hydrate('{"tag": "some tag", "context": "some string"}');
    }).toThrow('Context must be an object');
});


test('it creates default context', () => {
    const message = JsonMessageHydrator.hydrate('{"tag": "some tag"}');
    expect(message.context).toEqual({});
});

test('it parses context', () => {
    const message = JsonMessageHydrator.hydrate('{"tag": "some tag", "context": {"a": 1, "b": true}}');
    expect(message.context).toEqual({a: 1, b: true});
});