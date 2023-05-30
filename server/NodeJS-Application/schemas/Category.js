({
    Entity: {},
  
    name: { type: 'string', unique: false },
    post: { type: 'Post', delete: 'cascade' },
  });
  