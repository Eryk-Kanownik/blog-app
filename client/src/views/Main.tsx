import React from "react";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";

const Main = () => {
  return (
    <>
      <Navbar />
      <div className="main universal-padding">
        <h1 className="main__header">Posts</h1>
        <div className="main__posts">
          <PostCard />
          <PostCard />
        </div>
      </div>
    </>
  );
};

export default Main;
