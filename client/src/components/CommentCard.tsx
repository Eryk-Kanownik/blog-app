import React from "react";
import { Link } from "react-router-dom";
import { IComment } from "../interfaces/types";
import Moment from "react-moment";

const CommentCard: React.FC<IComment> = ({
  userCommentedName,
  userCommentedId,
  userCommentedProfileImage,
  commentContent,
  commentCreatedAt,
}) => {
  return (
    <div className="commentcard">
      <div className="commentcard__header">
        <div className="commentcard__header__photo">
          <img src={userCommentedProfileImage} />
        </div>
        <div className="commentcard__header__username">
          <Link to={`/user/${userCommentedId}`}>{userCommentedName}</Link>
        </div>
      </div>
      <div className="commentcard__date">
        <Moment>{commentCreatedAt.toString()}</Moment>
      </div>
      <div className="commentcard__content">{commentContent}</div>
    </div>
  );
};

export default CommentCard;
