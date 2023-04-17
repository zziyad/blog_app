({
  Entity: {},

  username: { type: 'string', length: { min: 4, max: 64 }, unique: true },
  email: { type: 'string', length: { min: 10, max: 64 }, unique: true },
  password: {
    type: 'string',
    length: { min: 10, max: 64 },
    note: 'Password hash',
  },
  img: 'string',
});
