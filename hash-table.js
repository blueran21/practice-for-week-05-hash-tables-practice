const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    // Your code here
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(numBuckets).fill(null);

  }

  hash(key) {
    // Your code here
    return parseInt(sha256(key).slice(0, 8), 16);
  }

  hashMod(key) {
    // Your code here
    return this.hash(key) % this.capacity;
  }

  insertNoCollisions(key, value) {
    // Your code here
    let index = this.hashMod(key);
    let newPair = new KeyValuePair(key, value);
    if (this.data[index] !== null) {
      throw Error("hash collision or same key/value pair already exists!");
    } else {
      this.data[index] = newPair;
      this.count += 1;
    }
  }

  insertWithHashCollisions(key, value) {
    // Your code here
    let index = this.hashMod(key);
    let newPair = new KeyValuePair(key, value);
    if (this.data[index] === null) {
      this.data[index] = newPair;
    } else {
      let head = this.data[index];
      newPair.next = head;
      this.data[index] = newPair;
    }
    this.count += 1;
  }

  insert(key, value) {
    // Your code here
    let index = this.hashMod(key);
    let newPair = new KeyValuePair(key, value);
    if (this.data[index] === null) {
      this.data[index] = newPair;
      this.count += 1;
    } else {
      let head = this.data[index];
      while (head) {
        if (head.key === key) {
          head.value = value;
          return;
        }
        head = head.next;
      }
      let curHead = this.data[index];
      newPair.next = curHead;
      this.data[index] = newPair;
      this.count += 1;
    }
  }

}


module.exports = HashTable;
