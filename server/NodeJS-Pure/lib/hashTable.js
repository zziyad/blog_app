'use strict';

const { generateSalt, generateHash } = require('./hashFunc.js');
const tree = require('./tree.js');

const TREE_KEY = 0;
const TREE_VALUE = 1;

class HashTable {
  constructor(size) {
    this.size = size;
    this.table = new Array(size);
    this.hashKeyMap = new Map();
    this.root = tree();
  }

  // Get the index in the hash table array
  getIndex(hash) {
    return parseInt(hash, 16) % this.size;
  }

  // Insert a key-value pair into the hash table
  insert(key, value) {
    if (typeof key !== 'string' || key.trim().length === 0) {
      throw new Error('Invalid key. Key must be a non-empty string.');
    }

    const salt = generateSalt();
    const hash = generateHash(key, salt);
    const index = this.getIndex(hash);
    let slot = this.table[index];
    if (!slot) {
      slot = this.root;
      this.table[index] = slot;
    }

    // Check for key collision
    // const existingNode = slot.find(key);
    const existingNode = tree.search(this.root, key);
    if (existingNode && existingNode[TREE_KEY] === key) {
      throw new Error('Key already exists.');
    }

    tree.insert(this.root, key, value);
    this.hashKeyMap.set(key, { salt, hash });
  }

  // Get the value associated with a key
  get(key) {
    if (typeof key !== 'string' || key.trim().length === 0) {
      throw new Error('Invalid key. Key must be a non-empty string.');
    }

    const hashData = this.hashKeyMap.get(key);
    if (hashData) {
      const { salt, hash } = hashData;
      const computedHash = generateHash(key, salt);
      if (computedHash === hash) {
        const index = this.getIndex(hash);
        const slot = this.table[index];
        if (slot) {
          const value = tree.search(this.root, key);
          if (value[TREE_VALUE] !== undefined) {
            return value[TREE_VALUE];
          }
        }
        throw new Error('Key does not exist.');
      } else {
        throw new Error('Key verification failed.');
      }
    } else {
      throw new Error('Key does not exist.');
    }
  }

  // Update the value associated with a key
  update(key, newValue) {
    if (typeof key !== 'string' || key.trim().length === 0) {
      throw new Error('Invalid key. Key must be a non-empty string.');
    }

    const hashData = this.hashKeyMap.get(key);
    if (hashData) {
      const { salt, hash } = hashData;
      const computedHash = generateHash(key, salt);
      if (computedHash === hash) {
        const index = this.getIndex(hash);
        const slot = this.table[index];
        if (slot) {
          tree.set(this.root, key, newValue);
          return;
        }
        throw new Error('Key does not exist.');
      } else {
        throw new Error('Key verification failed.');
      }
    } else {
      throw new Error('Key does not exist.');
    }
  }

  // Remove a key-value pair from the hash table
  remove(key) {
    if (typeof key !== 'string' || key.trim().length === 0) {
      throw new Error('Invalid key. Key must be a non-empty string.');
    }

    const hashData = this.hashKeyMap.get(key);
    if (hashData) {
      const { salt, hash } = hashData;
      const computedHash = generateHash(key, salt);
      if (computedHash === hash) {
        const index = this.getIndex(hash);
        const slot = this.table[index];
        if (slot) {
          tree.del(this.root, key);
          this.hashKeyMap.delete(key);
          return;
        }
        throw new Error('Key does not exist.');
      } else {
        throw new Error('Key verification failed.');
      }
    } else {
      throw new Error('Key does not exist.');
    }
  }

  has(key) {
    if (typeof key !== 'string' || key.trim().length === 0) {
      throw new Error('Invalid key. Key must be a non-empty string.');
    }

    const hashData = this.hashKeyMap.get(key);
    if (hashData) {
      const { salt, hash } = hashData;
      const computedHash = generateHash(key, salt);
      if (computedHash === hash) {
        const index = this.getIndex(hash);
        const slot = this.table[index];
        if (slot) {
          const existingNode = tree.search(this.root, key);
          if (existingNode[TREE_KEY] !== undefined) {
            return true;
          }
        }
        return false;
      } else {
        throw new Error('Key verification failed.');
      }
    } else {
      return false;
    }
  }

  appendOrMerge(key, value) {
    if (!this.has(key)) {
      this.insert(key, value);
    } else {
      const existingValues = this.get(key);
      if (
        typeof existingValues === 'object' &&
        !Array.isArray(existingValues)
      ) {
        // Merge existing values with the new value
        const mergedValue = [existingValues, value];
        this.update(key, mergedValue);
      } else if (Array.isArray(existingValues)) {
        // Append the new value to the existing array
        existingValues.push(value);
        this.update(key, existingValues);
      } else {
        // Create an array with the existing value and the new value
        const mergedValue = [existingValues, value];
        this.update(key, mergedValue);
      }
    }
  }
}

const hashTable = new HashTable(50);
hashTable.insert('root', 'root');

module.exports = hashTable;
