({
  access: 'public',
  method: async (post) => {
    const { Database } = metarhia.metasql;
    const db = new Database(config.database);

    post.date = new Date();

    try {
      const {
        rows: [{ postid }],
      } = await db.insert('Post', post).returning('postid');
      return { status: 'fulfilled', result: postid };
    } catch (error) {
      console.log({ error });
      return { status: 'rejected', result: error };
    } finally {
      db.close();
    }
  },
});
