import React, { createRef, useState } from "react";
import { Link } from "react-router-dom";
import AddComment from "./AddComment";
import CommentCard from "./CommentCard";
import { IPost } from "../interfaces/types";
import NoCommentCard from "./NoCommentCard";

const PostCard: React.FC<IPost> = ({
  username,
  userId,
  content,
  createdAt,
  comments,
}) => {
  const [unfoldComments, setUnfoldComments] = useState<boolean>(false);
  const [unfoldOptions, setUnfoldOptions] = useState<boolean>(false);

  const commentsUnfold = () => {
    setUnfoldComments(true);
  };

  const mappedComments =
    comments.length > 0 ? (
      comments.map((comment) => <CommentCard />)
    ) : (
      <NoCommentCard />
    );

  return (
    <div className="postcard">
      <div className="postcard__header">
        <div className="postcard__header__user">
          <div className="postcard__header__user__photo">
            <img src="https://picsum.photos/200/200" />
          </div>
          <div className="postcard__header__user__username">
            <Link to={`/user/${userId}`}>{username}</Link>
          </div>
        </div>
        <div
          className="postcard__header__options"
          onClick={() => setUnfoldOptions((prev) => !prev)}
        >
          <strong className="postcard__header__options__strong">&#8942;</strong>
          <div
            className={`postcard__header__options__menu ${
              unfoldOptions ? "set__visible" : ""
            }`}
          >
            <ul>
              <li>Zgłoś</li>
              <li>Usuń</li>
              <li>Edytuj</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="postcard__date">{createdAt}</div>
      <div className="postcard__content">{content}</div>
      <div className="postcard__media">
        <img src="https://picsum.photos/500/300" />
      </div>
      <div className="postcard__optionbar">
        <div className="postcard__optionbar__like">72 Like</div>
        <div
          className="postcard__optionbar__comment"
          onClick={() => commentsUnfold()}
        >
          {comments.length} Comment
        </div>
        <div className="postcard__optionbar__share">Share</div>
      </div>
      <div
        className={`postcard__comments ${unfoldComments ? "set__visible" : ""}`}
      >
        <AddComment />
        <div
          className={`postcard__comments__comments ${
            unfoldComments ? "set__visible" : ""
          }`}
        >
          {mappedComments}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
