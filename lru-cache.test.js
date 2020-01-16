const LRUCache = require('./lru-cache');

describe('lru-cache', () => {
  test('cache initialises without error', () => {
    expect(() => new LRUCache(1)).not.toThrow();
  });
  test('cache initialises with error with no parameter', () => {
    expect(() => new LRUCache()).toThrow(ReferenceError);
  });
  test('cache constructor throws error with size of zero', () => {
    expect(() => new LRUCache(0)).toThrow(RangeError);
  });
  test('cache constructor throws error with size less than zero', () => {
    expect(() => new LRUCache(-1)).toThrow(RangeError);
  });
  test('cache successfully stores and retrieves value', () => {
    const cache = new LRUCache(10);
    cache.put('my first key', 'hello world!');
    expect(cache.get('my first key')).toEqual('hello world!');
  });
  test('cache returns undefined when key does not exist', () => {
    const cache = new LRUCache(10);
    cache.put('my first key', 'hello world!');
    expect(cache.get('my missing key')).toBeUndefined();
  });
  test('cache successfully stores and retrieves multiple values', () => {
    const cache = new LRUCache(20);
    cache.put('0', 'hello world');
    cache.put('squiggle', 'goodbye world?');
    cache.put('llllllllla', 'ta-ta');
    expect(cache.get('0')).toEqual('hello world');
    expect(cache.get('squiggle')).toEqual('goodbye world?');
    expect(cache.get('llllllllla')).toEqual('ta-ta');
  });
  test('cache successfully stores max number of values', () => {
    const cache = new LRUCache(100);
    for (let i = 0; i < 100; i++) {
      cache.put(i.toString(), i * i);
    }
    for (let i = 0; i < 100; i++) {
      expect(cache.get(i.toString())).toEqual(i * i);
    }
  });
  test('cache successfully discards oldest value, get vs. get', () => {
    const cache = new LRUCache(2);

    cache.put('first key', 'value one');
    cache.put('second key', 'value two');
    cache.get('second key');
    cache.get('first key');

    cache.put('third key', 'value three');

    expect(cache.get('first key')).toEqual('value two');
    expect(cache.get('second key')).toBeUndefined();
    expect(cache.get('third key')).toEqual('value three');
  });
  test('cache successfully discards oldest value, get vs. put', () => {
    const cache = new LRUCache(2);

    cache.put('first key', 'value one');
    cache.put('second key', 'value two');
    cache.get('second key');
    cache.put('first key', 'value one');

    cache.put('third key', 'value three');

    expect(cache.get('first key')).toEqual('value one');
    expect(cache.get('second key')).toBeUndefined();
    expect(cache.get('third key')).toEqual('value three');
  });
  test('cache successfully discards least used values', () => {
    const cache = new LRUCache(2);

    cache.put('first key', 'value one');
    cache.put('second key', 'value two');
    cache.get('second key');
    cache.put('first key', 'value one');

    cache.put('third key', 'value three');
    cache.put('forth key', 'value four');

    expect(cache.get('first key')).toBeUndefined();
    expect(cache.get('second key')).toBeUndefined();
    expect(cache.get('third key')).toEqual('value three');
    expect(cache.get('forth key')).toEqual('value four');
  });
  test('cache successfully empties on reset', () => {
    const cache = new LRUCache(100);
    for (let i = 0; i < 100; i++) {
      cache.put(i.toString(), i * i);
    }
    cache.reset();
    for (let i = 0; i < 100; i++) {
      expect(cache.get(i.toString())).toBeUndefined();
    }
  });
  test('cache successfully deletes value', () => {
    const cache = new LRUCache(2);
    cache.put('my key', 'my value');
    const result = cache.del('my key');
    expect(result).toEqual('my value');
    expect(cache.get('my key')).toBeUndefined();
  });
  test('cache returns undefined when deleting missing key', () => {
    const cache = new LRUCache(2);
    cache.put('key one', 'value one');
    expect(cache.del('key two')).toBeUndefined();
  });
});
