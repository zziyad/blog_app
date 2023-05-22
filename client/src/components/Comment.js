import { useState } from "react";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from "react-icons/fa";
import { IconBtn } from "./IconBtn";
export function Comment({
  //   comment_id,
  children,
  comment_created_at,
  comment_author_name,
  like_count,
  //   comment_author_email,
  //   like_user_id,
  message,
}) {
  const [areChildrenHidden, setAreChildrenHidden] = useState(true);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const createdAat = new Date(comment_created_at).toString().substr(0, 21);

  return (
    <>
      <div className="comment">
        <div className="cheader">
          <span className="name">{comment_author_name}</span>
          <span className="date">{createdAat}</span>
        </div>
        {isEditing ? (
          <CommentForm
            autoFocus
            initialValue={message}
            // onSubmit={onCommentUpdate}
            // loading={updateCommentFn.loading}
            // error={updateCommentFn.error}
          />
        ) : (
          <div className="message">{message}</div>
        )}
        <div className="footer">
          <IconBtn Icon={FaHeart} aria-label="like">
            {like_count}
          </IconBtn>
          <IconBtn Icon={FaReply} aria-label="Reply" />
          <IconBtn Icon={FaEdit} aria-label="Edit" />
          <IconBtn Icon={FaTrash} aria-label="Delete" color="danger" />
        </div>
        {children?.length !== 0 && (
          <>
            <div
              className={`nested-comments-stack ${
                areChildrenHidden ? "hide" : ""
              }`}
            >
              <button
                className="collapse-line"
                aria-label="Hide Replies"
                onClick={() => setAreChildrenHidden(true)}
              >
                {" "}
                <span>h</span>
                <br />
                <span>i</span>
                <br />
                <span>d</span>
                <br />
                <span>e</span>
                <br />{" "}
              </button>
              <div className="nested-comments">
                <CommentList comments={children} />
              </div>
            </div>
            <button
              className={`btn2 mt-1 ${!areChildrenHidden ? "hide" : ""}`}
              onClick={() => setAreChildrenHidden(false)}
            >
              Show Replies
            </button>
          </>
        )}
      </div>
    </>
  );
}
