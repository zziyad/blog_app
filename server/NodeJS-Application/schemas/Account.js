({
  Entity: new Set(),

  name: { type: 'string', length: { min: 8, max: 64 }, unique: true },
  email: { type: 'string', length: { min: 6, max: 255 }, unique: true },
  password: { type: 'string', note: 'Password hash' },
});
