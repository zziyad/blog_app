({
  access: 'public',
  method: async (postid) => {
    context.state = { pg: await lib.db.start() };
    console.log({ domain, lib });
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
