import React from "react";
import { Link } from "react-router-dom";

function Posts({ posts }) {
  const truncate = (input) =>
    input?.length > 300 ? `${input.substring(0, 104)}...` : input;


  return (
      <div className="posts">
        {posts?.map((post) => (
          <div className="post" key={post.postId}>
            <div className="img">
              <img src={post.file_path} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.postId}`}>
                <h1>
                  <div dangerouslySetInnerHTML={{ __html: post.title }} />
                </h1>
              </Link>
              <div style={{ margin: "" }}>
                <div
                  dangerouslySetInnerHTML={{ __html: truncate(post.body) }}
                />
              </div>
              <Link className="link" to={`/post/${post.postId}`}>
                <button>Read more</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
 )
}

export default Posts;
