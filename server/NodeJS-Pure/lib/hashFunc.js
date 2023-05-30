'use strict';

const crypto = require('node:crypto');
const hashCache = new Map();

// Generate a random salt
const generateSalt = () => crypto.randomBytes(16).toString('hex');

// Hash a key with a salt
const generateHash = (key, salt) => {
  const cacheKey = key + salt;
  if (hashCache.has(cacheKey)) {
    return hashCache.get(cacheKey);
  }

  // Optimized hash function implementation
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) + hash + key.charCodeAt(i);
  }
  hash = crypto
    .createHmac('sha256', salt)
    .update(hash.toString())
    .digest('hex');

  hashCache.set(cacheKey, hash);
  return hash;
};

module.exports = {
  generateSalt,
  generateHash,
};
