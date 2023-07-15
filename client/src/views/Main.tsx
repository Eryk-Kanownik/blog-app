import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import axios from "axios";
import { IPost } from "../interfaces/types";
import Loading from "../components/Loading";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loadPosts } from "../features/posts/postsSlice";

const Main = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);

  useEffect(() => {
    async function getPosts() {
      let res = await axios.get("http://localhost:5000/posts");
      dispatch(loadPosts(res.data.body));
    }
    getPosts();
  }, []);

  const mappedPosts = posts ? (
    posts.map((post: IPost, index: React.Key) => (
      <PostCard
        key={index}
        _id={post._id}
        username={post.username}
        userProfileImage={post.userProfileImage}
        userId={post.userId}
        content={post.content}
        createdAt={post.createdAt}
        comments={post.comments}
        likes={post.likes}
      />
    ))
  ) : (
    <Loading />
  );

  return (
    <>
      <Navbar />
      <div className="main universal-padding">
        <h1 className="main__header">
          {posts?.length === 0
            ? "No posts avalible..."
            : posts?.length + " posts"}
        </h1>
        <div className="main__posts">{mappedPosts}</div>
      </div>
    </>
  );
};

export default Main;
