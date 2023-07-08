import React from "react";

const AddComment = () => {
  return (
    <div className="add__comment">
      <div className="add__comment__image">
        <img src="https://picsum.photos/200/200" />
      </div>
      <input type="text" className="input" />
      <button className="btn">Add comment</button>
    </div>
  );
};

export default AddComment;
