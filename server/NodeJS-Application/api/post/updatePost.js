({
  access: 'public',

  method: async ({ postId, title, descr, image, category }) => {
    const { Database } = metarhia.metasql;
    const db = new Database(config.database);
    const imgPath = node.path.join(node.process.cwd(), `../../client/public`);
    // const imgPath = node.path.join(node.process.cwd(), `../NodeJS-Application/static`);
    try {
      const post = await db.select('Post', ['*'], { postid: Number(postId) });
      const pid = post[0].postid;
      // Remove image property if it is falsy
      if (!image) delete post[0].image;

      await db.update(
        'Post',
        { title, descr, image, category },
        {
          title: post[0].title,
          descr: post[0].descr,
          image: post[0].image,
          category: post[0].category,
        },
      );

      // Delete the old image file if it exists
      if (post[0].image && post[0].image !== 'no photo') {
        try {
          await node.fsp.unlink(`${imgPath}${post[0].image.substring(2)}`);
        } catch (error) {
          throw new Error(`Error deleting file ${post[0].image}:`, error);
        }
      }

      return { status: 'fulfilled', result: pid };
    } catch (error) {
      console.error('Error updating post:', error);
      return { status: 'rejected', result: error };
    } finally {
      db.close();
    }
  },
});
