({
  access: 'public',
  method: async (postid) => {
    context.state = { pg: await lib.db.start() };
    try {
      const post = await domain.Post.get(context, postid);
      return { status: 'fulfilled', result: post };
    } catch (error) {
      console.log(error);
      return {
        status: 'rejected',
        reason: typeof error.toJSON === 'function' ? error.toJSON() : error,
      };
    }
  },
});
