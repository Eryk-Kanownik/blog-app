import React from "react";
import { Link } from "react-router-dom";

const CommentCard = () => {
  return (
    <div className="commentcard">
      <div className="commentcard__header">
        <div className="commentcard__header__photo">
          <img src="https://picsum.photos/200/200" />
        </div>
        <div className="commentcard__header__username">
          <Link to="#">Username</Link>
        </div>
      </div>
      <div className="commentcard__content">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum ea,
        labore deserunt veritatis quidem tempore fugit, nostrum sequi, repellat
        similique itaque. Suscipit ratione, ducimus totam quia minus omnis.
        Temporibus, quaerat?
      </div>
    </div>
  );
};

export default CommentCard;
