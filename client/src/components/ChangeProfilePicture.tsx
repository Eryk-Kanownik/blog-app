import React, { useState } from "react";

const ChangeProfilePicture = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<String | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
    setPreview(URL.createObjectURL(e.target.files![0]));
  };

  return (
    <form className="change-profile-picture">
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
      <button className="btn"> Save</button>
    </form>
  );
};

export default ChangeProfilePicture;
