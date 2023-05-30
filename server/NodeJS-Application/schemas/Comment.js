({
    Entity: {},
  
    message: { type: 'string', unique: true },
    createdAt: { type: 'datetime', default: 'now' },
    updatedAt: { type: 'datetime', default: 'now' },
    user: { type: 'Account', delete: 'cascade' },
    post: { type: 'Post', delete: 'cascade' },
    parent_id: 'number'
  });
  