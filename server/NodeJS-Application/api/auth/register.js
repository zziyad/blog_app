({
  access: 'public',
  method: async ({ username, email, password }) => {
    const { Database } = metarhia.metasql;
    const db = new Database(config.database);
    const { errors, valid } = await domain.Validate.registerScheme({username, email, password });

    if (!valid) return {
        status: 'rejected',
        reason: errors[0].split(':')[1],
      };
    
    try {
      const user = await db.row('User', { username });
      if (user)
        return { status: 'rejected', reason: 'User Name already exists' };
      const hash = await common.hash(password);
      const res = await db.insert('User', { username, email, password: hash });
      if (res) return { status: 'fulfilled' };
    } catch (error) {
      console.log({ error: error.stack });
      return {
        status: 'rejected',
        reason: 'Server Error',
      };
    } finally {
      db.close();
    }
  },
});
