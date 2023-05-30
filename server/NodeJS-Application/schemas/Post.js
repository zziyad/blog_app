({
  Entity: {},

  title: { type: 'string', unique: true },
  body: 'text',
  createdAt: { type: 'datetime', default: 'now' },
  updatedAt: { type: 'datetime', default: 'now' },
  author: { type: 'Account', delete: 'cascade' },
});
