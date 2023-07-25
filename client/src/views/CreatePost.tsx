import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { fileUploadConfig } from "../helpers/AxiosConfigs";
import { useNavigate } from "react-router-dom";
import LittleImage from "./LittleImage";
import { useAppDispatch } from "../app/hooks";
import { serverMessage } from "../features/message/messageSlice";

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<FileList>();
  const [preview, setPreview] = useState<any>([]);

  const chooseFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files!;
    for (var i = 0; i < files?.length!; i++) {
      preview.push(URL.createObjectURL(files.item(i)!));
    }
    setFiles(files);
  };

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("content", content.toString());
    for (var i = 0; i < files?.length!; i++) {
      formData.append("files", files?.item(i)!);
    }
    let res = await axios.post(
      "http://localhost:5000/posts",
      formData,
      fileUploadConfig
    );
    dispatch(serverMessage(res.data));
    navigate("/");
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
            {preview.length > 0
              ? preview.map((imgSrc: any, index: React.Key) => (
                  <LittleImage key={index} imagePath={imgSrc} />
                ))
              : "No images uploaded..."}
          </div>
          <label className="create-post__form__file" htmlFor="file">
            Upload File
          </label>
          <input
            id="file"
            type="file"
            name="files"
            onChange={(e) => chooseFiles(e)}
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
