import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import CommentCard from "../components/CommentCard";

const User = () => {
  const [postsActive, setPostsActive] = useState(true);
  let data = postsActive ? (
    <>
      <PostCard />
      <PostCard />
      <PostCard />
    </>
  ) : (
    <CommentCard />
  );
  return (
    <>
      <Navbar />
      <div className="universal-padding user">
        <div className="user__header">
          <div className="user__header__image">
            <img src="https://picsum.photos/300/300" />
          </div>
          <div className="user__header__username">
            <h1>Hello</h1>
          </div>
        </div>
        <div className="user__sections">
          <div
            className={`user__sections__posts ${postsActive ? "active" : ""}`}
            onClick={() => setPostsActive(true)}
          >
            <strong>Posts 66</strong>
          </div>
          <div
            className={`user__sections__comments ${
              postsActive ? "" : "active"
            }`}
            onClick={() => setPostsActive(false)}
          >
            <strong>Comments 99</strong>
          </div>
        </div>
        <div className="user__data">{data}</div>
      </div>
    </>
  );
};

export default User;
