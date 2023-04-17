({
  access: 'public',
  method: async ({ username, email, password }) => {
    const db = new metasql(config.database);
    try {
      const user = await db.row('User', { username });
      if (user)
        return { status: 'rejected', reason: 'User Name already exist' };
      const hash = await common.hash(password);
      const res = await db.insert('User', { username, email, password: hash });
      if (res) return { status: 'fulfilled' };
    } catch (error) {
      console.log({ error: error.stack });
      return {
        status: 'rejected',
        reason: 'Server Error',
      };
    }
    db.close();
  },
});
