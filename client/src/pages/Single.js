import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import scaffolding from "../system/client";
import { AuthContext } from "../context/authContext";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { usePost } from "../context/postContex";
import { CommentList } from "../components/CommentList";
import { CommentForm } from "../components/CommentForm";
const { api } = scaffolding;

const Single = () => {
  const navigate = useNavigate();
  const { post } = usePost();
  const { currentUser } = useContext(AuthContext);

  const Delete = async (id) => {
    try {
      await scaffolding.load("post");
      await api.post.deletePost(id);
      alert("Your Post was Deleted");
      navigate("/");
    } catch (error) {
      return { status: "rejected", reason: error.message };
    }
  };

  const handelDelete = async (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to delete this post.",
      buttons: [
        {
          label: "Yes",
          onClick: () => Delete(id),
        },
        {
          label: "No",
          //onClick: () => alert('Click No')
        },
      ],
    });
  };

  // const updatedAat = new Date(post.updatedAt).toString().substr(0, 21);
  const createdAat = new Date(post.createdAt).toString().substr(0, 21);
  return (
    <div className="single">
      <div className="content">
        <div>
          <img src={post.file_path} alt="" />
          <div className="user">
            <img src="/user-icon.png" alt="" />
            <div className="info">
              <span>{post.author_name}</span>
              <p>Posted: {createdAat}</p>
              {/* <p>Updated: {updatedAat}</p> */}
            </div>
            {!!currentUser && currentUser.name === post.author_name ? (
              <div className="edit" key={post.postId}>
                <Link to={`/write?edit=${post.postId}`} state={post}>
                  <img src="/edit.png" alt="" />
                </Link>
                <button
                  style={{ border: "none", backgroundColor: "white" }}
                  onClick={() => handelDelete(post.postId)}
                >
                  <img src="/delete.png" alt="" />
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
          <h1 key={post.post_id}>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>

        <h3>Comments</h3>

        <section>
          <CommentForm
          // loading={loading}
          // error={error}
          // onSubmit={onCommentCreate}
          />
          {post.comments != null && post.comments.length > 0 ? (
            <div className="mt-4">
              <CommentList comments={post.comments} />
            </div>
          ) : (
            <h3 style={{ textAlign: "center" }}> No Comment </h3>
          )}
        </section>
      </div>
      <div className="menu">
        <Menu />
      </div>
    </div>
  );
};

export default Single;
