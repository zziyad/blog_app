({
  access: 'public',
  method: async (postid) => {

    const { Database } = metarhia.metasql;
    const db = new Database(config.database);
    
    const sql =
      'SELECT  username, title, descr, img, image, date, category, postId FROM "Post" JOIN "User" ON "Post".uid = "User".userid WHERE "Post".postid=$1';

    try {
      const { rows: [{ ...post }] } = await db.query(sql, [postid]);
      return { status: 'fulfilled', result: { ...post } };
    } catch (error) {
      console.log(error);
      return { status: 'rejected', result: error };
    } finally {
      db.close();
    }
  },
});
