import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import axios from "axios";
import { IPost } from "../interfaces/types";
import Loading from "../components/Loading";

const Main = () => {
  const [posts, setPosts] = useState<IPost[]>();

  useEffect(() => {
    async function getPosts() {
      let res = await axios.get("http://localhost:5000/posts");
      setPosts(res.data.body);
    }
    getPosts();
  }, []);

  const mappedPosts = posts ? (
    posts.map((post: IPost, index: React.Key) => (
      <PostCard
        key={index}
        _id={post._id}
        username={post.username}
        userId={post.userId}
        content={post.content}
        createdAt={post.createdAt}
        comments={post.comments}
      />
    ))
  ) : (
    <Loading />
  );

  return (
    <>
      <Navbar />
      <div className="main universal-padding">
        <h1 className="main__header">Posts</h1>
        <div className="main__posts">{mappedPosts}</div>
      </div>
    </>
  );
};

export default Main;
