import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Menu from "../components/Menu";
import MyButton from "../components/UI/button/MyButton";
import scaffolding from "../system/client";
import { AuthContext } from "../context/authContext";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
const { api } = scaffolding;

const Single = () => {
  const navigate = useNavigate();

  const [post, setPost] = useState({});
  const [error, setError] = useState({ status: "", reason: null });
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const postid = useParams().id;

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getPost = async () => {
      try {
        await scaffolding.load("post");
        const res = await api.post.getPost(postid);
        if (res.result) setPost(res.result);
        else setError(res);
      } catch (error) {
        setError({ status: "rejected", reason: error.message });
      }
    };
    getPost();
  }, [postid]);

  const Delete = async (id) => {
    try {
      await scaffolding.load("post");
      await api.post.deletePost(id);
      alert("Your Post was Deleted");
      navigate("/");
    } catch (error) {
      setError({ status: "rejected", reason: error.message });
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

  const handleComment = async (e) => {
    if (!currentUser) {
      alert("Please log in to comment");
      return;
    }
    console.log("heeeeee");
    // setComments([comment]);
    // console.log(comment);
    try {
      await scaffolding.load("comment");
      const res = await api.comment.addComment(
        comment,
        currentUser.user_id,
        post.post_id
      );
      console.log({ res });
      // if (res.result) {
      setComments([res.result]);
      setComment("");
      //   alert("Your comment was added");
      // } else {
      // setError(res);
      // }
    } catch (error) {
      setError({ status: "rejected", reason: error.message });
    }
  };

  const updatedAat = new Date(post.updatedAt).toString().substr(0, 21);
  const createdAat = new Date(post.createdAt).toString().substr(0, 21);

  return error.status === "rejected" ? (
    <h1 style={{ textAlign: "center" }}>
      <span style={{ color: "red" }}>{error.reason.code}</span> -{" "}
      {error.reason.message}
    </h1>
  ) : (
    <div className="single">
      <div className="content">
        <div>
          <img src={post.file_path} alt="" />
          <div className="user">
            <img src="/user-icon.png" alt="" />
            <div className="info">
              <span>{post.username}</span>
              <p>Posted: {createdAat}</p>
              <p>Updated: {updatedAat}</p>
            </div>
            {!!currentUser && currentUser.username === post.username ? (
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
        <div className="comments-section">
          <h2>Comments</h2>
          <div className="comment-form">
            <textarea
              placeholder="Enter your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <MyButton onClick={handleComment}>Comment</MyButton>
          </div>

          <ul className="comment-list">
            {comments?.map((comment) => (
              <div className="comment-body">
                <div className="user-inf">
                  <img className="comment-img" src="/user-icon.png" alt="" />
                  <span>{post.username}</span>
                </div>
                <li key={post.commentId}>
                  <p>{new Date(comment.created_at).toString().substr(0, 21)}</p>
                  {comment.body}
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className="menu">
        <Menu />
      </div>
    </div>
  );
};

export default Single;
