({
    Entity: {},

    user: { type: 'Account', delete: 'cascade' },
    comment: { type: 'Comment', delete: 'cascade' },
  });
  