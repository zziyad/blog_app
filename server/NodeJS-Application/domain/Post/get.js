 async (ctx, postid) => {
  const database = ctx.state.pg;
  console.log({ lib });
  const sql = `SELECT  username, title, descr, img, image, date, category, postId 
                FROM "Post" 
                JOIN "User" 
                ON "Post".uid = "User".userid 
                WHERE "Post".postid=$1`;
  const { 
    rows: [{ ...post }] 
  } = await database.query(sql, [postid]);  
  // if (!{ ...post }) throw new lib.Errors.NotFoundError('No such post with id ', { postid });
  database.close();
  return { ...post  };
};
