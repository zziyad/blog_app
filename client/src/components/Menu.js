import React from "react";
import { useNavigate } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { getPosts } from "../servisec/posts";

const Menu = () => {
  const navigate = useNavigate();
  const { value } = useAsync(() => getPosts(null));
  var posts = value.splice(Math.floor(Math.random() * value.length), 3);
  return (
    <div className="menu">
      <h1>Other post you may like</h1>
      {posts?.map((post) => (
        <div className="post" key={post.postId}>
          <img src={post.file_path} alt="" />
          <h2>{post.title}</h2>
          <button onClick={() => navigate(`/post/${post.postId}`)}>
            Read more
          </button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
