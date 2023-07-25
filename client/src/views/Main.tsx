import { useEffect } from "react";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import axios from "axios";
import { IPost } from "../interfaces/types";
import Loading from "../components/Loading";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loadPosts } from "../features/posts/postsSlice";

const Main = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.login);
  const posts = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(loadPosts());
  }, []);

  const mappedPosts =
    posts.status === "idle" ? (
      posts.posts.map((post: IPost, index: React.Key) => (
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
          images={post.images}
          isPostLiked={
            post.likes
              .map((like: any) => like.userLikedId.toString())
              .indexOf(user.userId?.toString()) >= 0
          }
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
          {posts.status === "idle" ? posts.posts.length + " posts" : ""}
        </h1>
        <div className="main__posts">{mappedPosts}</div>
      </div>
    </>
  );
};

export default Main;
