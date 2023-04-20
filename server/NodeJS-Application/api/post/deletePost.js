({
  access: 'public',
  method: async (postid) => {
    const { Database } = metarhia.metasql;
    const db = new Database(config.database);
    const imgPath = node.path.join(node.process.cwd(), `../../client/public`);
    // const imgPath = node.path.join(node.process.cwd(), `../NodeJS-Application/static`);

    try {
      const { image } = await db.row('Post', { postid });
      await db.delete('Post', { postid });
      if (image) await node.fsp.unlink(`${imgPath}${image.substring(2)}`);
      return { status: 'fulfilled', result: 'Post Deleted' };
    } catch (error) {
      console.error('Error deleting post:', error);
      return { status: 'rejected', result: error };
    } finally {
      db.close();
    }
  },
});
