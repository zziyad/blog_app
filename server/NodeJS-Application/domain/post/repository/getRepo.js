async (ctx, postid) => {
  const sql = `SELECT username, title, descr, img, image, date, catigory
                FROM "Post"
                JOIN "User" ON "Post".uid = "User".userid
                WHERE "Post".postid=$1`;
  const { rows } = ctx.pg.query(sql, [postid]);
  console.log({ rows });
  return 'POSTTT____ID';
};
