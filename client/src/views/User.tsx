import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import CommentCard from "../components/CommentCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadUserData } from "../features/user/userSlice";
import { useAppSelector } from "../app/hooks";
import { IComment, IPost } from "../interfaces/types";
import ChangeProfilePicture from "../components/ChangeProfilePicture";

const User = () => {
  const user = useAppSelector((state) => state.user);
  const [selectedOption, setSelectedState] = useState<"change-profile-picture">(
    "change-profile-picture"
  );
  const [options, setOptions] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const dispatch = useDispatch();

  const { userId } = useParams();

  const [postsActive, setPostsActive] = useState<boolean>(true);

  useEffect(() => {
    async function getUserWithData() {
      let res = await axios.get(`http://localhost:5000/users/${userId}`);
      dispatch(loadUserData(res.data.body));
    }
    getUserWithData();
  }, []);

  let posts = user.userPosts.map((post: IPost, index: React.Key) => (
    <PostCard
      key={index}
      likes={post.likes}
      _id={post._id}
      username={post.username}
      userId={post.userId}
      content={post.content}
      createdAt={post.createdAt}
      comments={post.comments}
      userProfileImage={post.userProfileImage}
      images={post.images}
      isPostLiked={
        post.likes
          .map((like: any) => like.userLikedId.toString())
          .indexOf(user.userId?.toString()) >= 0
      }
    />
  ));

  let comments = user.userComments.map(
    (comment: IComment, index: React.Key) => (
      <CommentCard
        key={index}
        userCommentedId={comment.userCommentedId}
        userCommentedName={comment.userCommentedName}
        userCommentedProfileImage={comment.userCommentedProfileImage}
        commentContent={comment.commentContent}
        commentCreatedAt={comment.commentCreatedAt}
      />
    )
  );

  let data = postsActive ? posts : comments;

  function renderComponentInDialogBox() {
    if (selectedOption === "change-profile-picture") {
      return <ChangeProfilePicture />;
    }
  }

  return (
    <>
      <Navbar />
      <div className="universal-padding user">
        <div className="user__header">
          <div className="user__header__image">
            <img src={user.userProfileImage} />
          </div>
          <div className="user__header__username">
            <h1>{user.username}</h1>
          </div>
        </div>
        <div className="user__sections">
          <div
            className={`user__sections__posts ${postsActive ? "active" : ""}`}
            onClick={() => setPostsActive(true)}
          >
            <strong>Posts {user.userPosts.length}</strong>
          </div>
          <div
            className={`user__sections__comments ${
              postsActive ? "" : "active"
            }`}
            onClick={() => setPostsActive(false)}
          >
            <strong>Comments {user.userComments.length}</strong>
          </div>
        </div>
        <div className="user__data">{data}</div>
        <div className="user__rightmenu">
          <div
            className={`user__rightmenu__options ${
              options ? "show-options" : ""
            } `}
          >
            <button
              className="btn"
              onClick={() => {
                dialogRef.current?.showModal();
              }}
            >
              Change profile picture
            </button>
            <button className="btn">Hi</button>
            <button className="btn">Bye</button>
          </div>
          <button
            className="btn user__rightmenu__main"
            onClick={() => setOptions(!options)}
          >
            Options
          </button>
        </div>
        <dialog ref={dialogRef} className="dialog">
          <div className="dialog__header">
            <h1>Account Setting</h1>
            <h1
              className="dialog__header__close"
              onClick={() => dialogRef.current!.close()}
            >
              &times;
            </h1>
          </div>
          {renderComponentInDialogBox()}
        </dialog>
      </div>
    </>
  );
};

export default User;
