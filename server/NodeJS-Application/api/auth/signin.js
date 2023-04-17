({
  access: 'public',
  
  method: async ({ username, password }) => {
    const { Database } = metarhia.metasql;
    const db = new Database(config.database);
    const user = await db.row('User', { username });
    if (!user)
      return { status: 'rejected', reason: 'Incorrect login or password' };
    const { password: hash } = user;
    const valid = await common.validatePassword(password, hash);
    if (!valid) throw new Error({ status: 'rejected', reason: 'Incorrect login or password' });
    const { characters, secret, length } = config.sessions;
    const token = metarhia.metautil.generateToken(secret, characters, length);
    const data = { accountId: user.accountId };
    context.client.initializeSession(token, data);
    const { ip } = context.client;
    db.close();
    delete user.password;
    return { status: 'login', result: user, token };
  },
});
