import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import AddComment from "./AddComment";
import CommentCard from "./CommentCard";

const PostCard = () => {
  const [unfoldComments, setUnfoldComments] = useState(false);
  const [unfoldOptions, setUnfoldOptions] = useState(false);

  return (
    <div className="postcard">
      <div className="postcard__header">
        <div className="postcard__header__user">
          <div className="postcard__header__user__photo">
            <img src="https://picsum.photos/200/200" />
          </div>
          <div className="postcard__header__user__username">
            <Link to="/user/1">Username</Link>
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
      <div className="postcard__date">{new Date().toLocaleString()}</div>
      <div className="postcard__content">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde ipsa
        voluptate, architecto sed itaque porro expedita voluptatem commodi
        nesciunt pariatur accusantium assumenda a labore maxime qui similique
        possimus id magnam.
      </div>
      <div className="postcard__media">
        <img src="https://picsum.photos/500/300" />
      </div>
      <div className="postcard__optionbar">
        <div className="postcard__optionbar__like">72 Like</div>
        <div
          className="postcard__optionbar__comment"
          onClick={() => setUnfoldComments(true)}
        >
          63 Comment
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
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
