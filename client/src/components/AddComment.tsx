import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import axios from "axios";
import { addComment } from "../features/posts/postsSlice";
import { serverMessage } from "../features/message/messageSlice";
import { changePostInUserPosts } from "../features/user/userSlice";

const AddComment: React.FC<{ postId: string }> = ({ postId }) => {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState<String>("");
  const loggedUser = useAppSelector((state) => state.login);
  const btnRef = useRef<any>();
  const inputRef = useRef<any>();

  useEffect(() => {
    if (comment.length === 0) {
      btnRef.current!.disabled = true;
    } else {
      btnRef.current!.disabled = false;
    }
  }, [comment.length]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const submitComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let res = await axios.post(
      `http://localhost:5000/posts/${postId}/comment`,
      { content: comment },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    dispatch(addComment(res.data.body));
    if (loggedUser.userId === res.data.body.userId) {
      dispatch(changePostInUserPosts(res.data.body));
    }
    dispatch(serverMessage(res.data));
    setComment("");
    inputRef.current.value = "";
  };

  return (
    <div className="add__comment">
      <div className="add__comment__image">
        <img src={loggedUser.userProfileImage} />
      </div>
      <input
        type="text"
        className="input"
        defaultValue={comment.toString()}
        onChange={(e) => onChange(e)}
        ref={inputRef}
      />
      <button className="btn" onClick={(e) => submitComment(e)} ref={btnRef}>
        Add comment
      </button>
    </div>
  );
};

export default AddComment;
