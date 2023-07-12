import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { ICreatePost } from "../interfaces/types";
import { forEachChild } from "typescript";
import axios from "axios";
import { fileUploadConfig } from "../helpers/AxiosConfigs";

const CreatePost = () => {
  const [post, setPost] = useState<ICreatePost>({
    content: "bvbcv",
    files: [],
  });

  const chooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost({ ...post, files: e.target.files });
  };

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost({ ...post, content: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let fd = new FormData();
    fd.append("content", post.content.toString());
    fd.append("files", post.files);
    let res = await axios.post(
      "http://localhost:5000/posts",
      fd,
      fileUploadConfig
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
          ></textarea>
          <div className="create-post__form__images">No images</div>
          <label className="create-post__form__file" htmlFor="file">
            Upload File
          </label>
          <input
            id="file"
            type="file"
            onChange={(e) => chooseFile(e)}
            className="create-post__file"
            multiple
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
