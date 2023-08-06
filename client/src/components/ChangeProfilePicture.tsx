import axios from "axios";
import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { changeProfilePicture } from "../features/login/loginSlice";

interface IChangeProfilePicture {
  parentRef: null | HTMLDialogElement;
}

const ChangeProfilePicture: React.FC<IChangeProfilePicture> = ({
  parentRef,
}) => {
  const dispatch = useAppDispatch();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<String | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
    setPreview(URL.createObjectURL(e.target.files![0]));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file !== null) {
      let fd = new FormData();
      fd.append("file", file!);
      let res = await axios.post(
        "http://localhost:5000/users/profile-picture",
        fd,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.location.reload();
    }
  };

  return (
    <form className="change-profile-picture" onSubmit={(e) => onSubmit(e)}>
      <div className="change-profile-picture__preview">
        <img src={preview?.toString()} />
      </div>
      <label className="create-post__form__file" htmlFor="file">
        Upload New Profile Picture
      </label>
      <input
        id="file"
        type="file"
        name="file"
        className="create-post__file"
        onChange={(e) => onChange(e)}
      />
      <button className="btn" onClick={() => parentRef?.close()}>
        Save
      </button>
    </form>
  );
};

export default ChangeProfilePicture;
