const LRUCache = require('./lru-cache');

const lruCache = new LRUCache({ size: 10 });

if (!lruCache) {
  console.error('Cache failed to initialise!');
  return false;
}

console.log('Cache successfully initialised!', { lruCache });

module.exports = lruCache;
