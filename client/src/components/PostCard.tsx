import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddComment from "./AddComment";
import CommentCard from "./CommentCard";
import { IPost } from "../interfaces/types";
import NoCommentCard from "./NoCommentCard";
import axios from "axios";
import { authConfig } from "../helpers/AxiosConfigs";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { likePost } from "../features/posts/postsSlice";
import { serverMessage } from "../features/message/messageSlice";
import Moment from "react-moment";

const PostCard: React.FC<IPost> = ({
  _id,
  username,
  userId,
  content,
  createdAt,
  comments,
  userProfileImage,
  likes,
  images,
  isPostLiked,
}) => {
  const posts = useAppSelector((state) => state.posts.posts);

  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector((state) => state.login);
  const [unfoldComments, setUnfoldComments] = useState<boolean>(false);
  const [unfoldOptions, setUnfoldOptions] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState(0);

  const like = async () => {
    let res = await axios.put(
      `http://localhost:5000/posts/${_id}/like`,
      null,
      authConfig
    );
    dispatch(likePost(res.data.body));
    dispatch(serverMessage(res.data));
  };

  const commentsUnfold = () => {
    if (unfoldComments) {
      setUnfoldComments(false);
    } else {
      setUnfoldComments(true);
    }
  };

  const prevImage = () => {
    if (currentImage !== 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  const nextImage = () => {
    if (currentImage !== images.length - 1) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const mappedComments =
    comments.length > 0 ? (
      comments.map((comment: any, index: React.Key) => (
        <CommentCard
          key={index}
          userCommentedId={comment.userCommentedId}
          userCommentedName={comment.userCommentedName}
          userCommentedProfileImage={comment.userCommentedProfileImage}
          commentContent={comment.commentContent}
          commentCreatedAt={comment.commentCreatedAt}
        />
      ))
    ) : (
      <NoCommentCard />
    );

  return (
    <div className="postcard">
      <div className="postcard__header">
        <div className="postcard__header__user">
          <div className="postcard__header__user__photo">
            <img src={userProfileImage!} />
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
      <div className="postcard__date">
        <Moment>{createdAt.toString()}</Moment>
      </div>
      <div className="postcard__content">{content}</div>
      <div className="postcard__media">
        {images.length > 1 ? (
          <button
            disabled={currentImage === 0 ? true : false}
            className="prev"
            onClick={() => prevImage()}
          >
            Prev
          </button>
        ) : (
          ""
        )}

        {images.length > 0 ? <img src={`${images[currentImage]}`} /> : ""}

        {images.length > 1 ? (
          <button
            disabled={currentImage === images.length - 1 ? true : false}
            className="next"
            onClick={() => nextImage()}
          >
            Next
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="postcard__optionbar">
        <div
          className={`postcard__optionbar__like ${isPostLiked ? "liked" : ""}`}
          onClick={(e) => like()}
        >
          {likes.length} Likes
        </div>
        <div
          className="postcard__optionbar__comment"
          onClick={() => commentsUnfold()}
        >
          {comments.length} Comment
        </div>
      </div>
      <div
        className={`postcard__comments ${unfoldComments ? "set__visible" : ""}`}
      >
        <AddComment postId={_id.toString()} />
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
