import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { ICreatePost } from "../interfaces/types";
import axios from "axios";
import { authConfig, fileUploadConfig } from "../helpers/AxiosConfigs";

const CreatePost = () => {
  const [post, setPost] = useState<ICreatePost>({
    content: "bvbcv",
    files: [],
  });

  const chooseFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files![0];
    setPost({ ...post, files });
  };

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost({ ...post, content: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let fd = new FormData();
    let res = await axios.post(
      "http://localhost:5000/posts",
      { content: post.content },
      authConfig
    );
  };

  return (
    <>
      <Navbar />
      <div className="create-post universal-padding">
        <h1 className="create-post__header">Create Post</h1>
        <form
          className="create-post__form"
          onSubmit={(e) => onSubmit(e)}
          encType="multipart/form-data"
        >
          <textarea
            className="create-post__form__textarea input"
            rows={5}
            onChange={(e) => changeContent(e)}
            placeholder="Your content goes here..."
          ></textarea>
          <div className="create-post__form__images">
            No images uploaded yet...
          </div>
          <label className="create-post__form__file" htmlFor="file">
            Upload File
          </label>
          <input
            id="file"
            type="file"
            onChange={(e) => chooseFiles(e)}
            className="create-post__file"
          />
          <button type="submit" className="btn">
            Create post
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
