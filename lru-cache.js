class LRUCacheNode {
  constructor(key, value) {
    if (typeof key !== 'undefined' && key !== null) {
      this.key = key;
    }
    if (typeof value !== 'undefined' && value !== null) {
      this.value = value;
    }
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(params = {}) {
    const { size } = params;
    if (typeof size === 'undefined') {
      throw ReferenceError('size is not defined!');
    } else if (typeof size !== 'number') {
      throw TypeError('size must be of type number!');
    } else if (size < 1) {
      throw RangeError('size must be greater than zero!');
    }

    this.size = 0;
    this.limit = size;
    this.map = {};
    this.head = null;
    this.tail = null;

    this.setHead = function (node) {
      node.next = this.head;
      node.prev = null;
      if (this.head !== null) {
        this.head.prev = node;
      }
      this.head = node;
      if (this.tail === null) {
        this.tail = node;
      }
      this.size += 1;
      this.map[node.key] = node;
    };
  }

  put(key, value) {
    const node = new LRUCacheNode(key, value);
    if (this.map[key]) {
      this.map[key].value = node.value;
      this.del(node.key);
    } else if (this.size >= this.limit) {
      delete this.map[this.tail.key];
      this.size -= 1;
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    this.setHead(node);
  }

  get(key) {
    if (this.map[key]) {
      const { value } = this.map[key];
      const node = new LRUCacheNode(key, value);
      this.del(key);
      this.setHead(node);
      return value;
    }
    return undefined;
  }

  del(key) {
    const node = this.map[key];
    if (!node) {
      return undefined;
    }
    if (node.prev !== null) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }
    if (node.next !== null) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
    delete this.map[key];
    this.size -= 1;
    return node.value;
  }

  reset() {
    this.size = 0;
    this.map = {};
    this.head = null;
    this.tail = null;
  }
}

module.exports = LRUCache;
