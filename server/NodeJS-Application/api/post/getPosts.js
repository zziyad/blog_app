({
  access: 'public',
  method: async (category) => {

    const { Database } = metarhia.metasql;
    const db = new Database(config.database);
    try {
      const res = !category ? await db.select('Post', ['*'])
        : await db.select('Post', ['*'], { category }); 
        
      const posts = res.map(post => {
        return {
          ...post,
          date: new Date(post.date)
        };
      });

      posts.sort((a, b) => b.date - a.date );

        
      return { status: 'fulfilled', result: posts };
    } catch (error) {
      console.log({ error });
      return { status: 'rejected', result: error };
    } finally {
      db.close();
    }
  },
});
