async (ctx, postid) => {
  const database = ctx.state.pg;
  const sql = `SELECT  username, title, descr, img, image, date, category, postId 
                FROM "Post" 
                JOIN "User" 
                ON "Post".uid = "User".userid 
                WHERE "Post".postid=$1`;
  const { rows } = await database.query(sql, [postid]);
  if (!rows[0]) throw new lib.Errors.nFE.NotFoundError(`No such post with id: ${postid}`, { postid });
  database.close();
  return rows[0];
};
