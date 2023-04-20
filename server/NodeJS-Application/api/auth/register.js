({
  access: 'public',
  method: async ({ username, email, password }) => {
    const { Database } = metarhia.metasql;
    const db = new Database(config.database);

    if (!username || !password || !email)
      return { status: 'rejected', reason: 'All fields are required' };

    if (username.length < 4 || password.length < 8)
      return {
        status: 'rejected',
        reason:
          'Username should be at least 4 characters and password should be at least 8 characters long',
      };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { status: 'rejected', reason: 'Invalid email address' };
    }

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password))
      return {
        status: 'rejected',
        reason:
          'Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character',
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
