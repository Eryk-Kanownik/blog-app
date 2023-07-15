import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import CommentCard from "../components/CommentCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadUserData } from "../features/user/userSlice";
import { useAppSelector } from "../app/hooks";
import { IPost } from "../interfaces/types";

const User = () => {
  const user = useAppSelector((state) => state.user);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [postsActive, setPostsActive] = useState<boolean>(true);

  useEffect(() => {
    async function getUserWithData() {
      let res = await axios.get(`http://localhost:5000/users/${userId}`);
      dispatch(loadUserData(res.data.body));
    }
    getUserWithData();
  }, []);

  let data = postsActive
    ? user.userPosts.map((post: IPost, index: React.Key) => (
        <PostCard
          likes={post.likes}
          key={index}
          _id={post._id}
          username={post.username}
          userId={post.userId}
          content={post.content}
          createdAt={post.createdAt}
          comments={post.comments}
          userProfileImage={post.userProfileImage}
        />
      ))
    : "Hello";
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
      </div>
    </>
  );
};

export default User;
