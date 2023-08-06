import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
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

  useEffect(() => {
    let pv = [];
    for (var i = 0; i < files?.length!; i++) {
      pv.push(URL.createObjectURL(files!.item(i)!));
    }
    setPreview(pv);
  }, [files]);

  const chooseFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files!;

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
    let res = await axios.post("http://localhost:5000/posts", formData, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(serverMessage(res.data));
    navigate("/");
  };

  const onClickDelete = (index: number) => {
    let dt = new DataTransfer();
    for (var i = 0; i < files!.length!; i++) {
      if (i !== index) {
        dt.items.add(files!.item(i)!);
      }
    }
    setFiles(dt.files);
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
                  <LittleImage
                    index={index}
                    key={index}
                    onClickDelete={onClickDelete}
                    imagePath={imgSrc}
                  />
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
